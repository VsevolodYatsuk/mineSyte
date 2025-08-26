// server/index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

const app = express();
app.use(cors());

const IMAGES_DIR = path.join(__dirname, 'images');

// гарантируем существование папки
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

// утилита для нахождения последнего по mtime файла
function getLatestImage() {
  const files = fs.readdirSync(IMAGES_DIR)
    .filter(f => /\.(png|jpe?g|gif|webp)$/i.test(f))
    .map(f => {
      const p = path.join(IMAGES_DIR, f);
      const stat = fs.statSync(p);
      return { name: f, mtimeMs: stat.mtimeMs };
    })
    .sort((a, b) => b.mtimeMs - a.mtimeMs);

  return files[0] || null;
}

// SSE-клиенты
const clients = new Set();
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  res.write(`event: hello\ndata: connected\n\n`);
  clients.add(res);

  req.on('close', () => {
    clients.delete(res);
  });
});

// эндпоинт с метаданными о последнем файле
app.get('/api/latest', (req, res) => {
  const latest = getLatestImage();
  if (!latest) return res.json({ exists: false });
  res.json({
    exists: true,
    filename: latest.name,
    // отдаём url, который вернёт сам файл
    url: `/api/image/latest`,
    mtimeMs: latest.mtimeMs
  });
});

// сам файл последнего изображения
app.get('/api/image/latest', (req, res) => {
  const latest = getLatestImage();
  if (!latest) return res.status(404).send('No images');
  res.sendFile(path.join(IMAGES_DIR, latest.name));
});

// статика (если нужно смотреть папку целиком)
app.use('/images', express.static(IMAGES_DIR));

// watcher: как только в images что-то меняется — шлём событие
let lastEmitted = null;
const watcher = chokidar.watch(IMAGES_DIR, { ignoreInitial: false });
watcher.on('add', notify).on('change', notify).on('unlink', notify);

function notify() {
  const latest = getLatestImage();
  const snapshot = latest ? `${latest.name}:${latest.mtimeMs}` : 'none';
  if (snapshot !== lastEmitted) {
    lastEmitted = snapshot;
    const payload = JSON.stringify({ changed: true, latest });
    for (const res of clients) {
      res.write(`event: latest\n`);
      res.write(`data: ${payload}\n\n`);
    }
  }
}

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Put images into: ${IMAGES_DIR}`);
});
