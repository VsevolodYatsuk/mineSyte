import { useEffect, useRef, useState } from 'react';

export default function LatestImage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [mtime, setMtime] = useState(null);
  const esRef = useRef(null);

  async function fetchLatest() {
    const res = await fetch('/api/latest');
    const data = await res.json();
    if (data.exists) {
      // добавляем cache-busting ?t=, чтобы браузер не кэшировал старую картинку
      setImageUrl(`${data.url}?t=${Date.now()}`);
      setMtime(data.mtimeMs);
    } else {
      setImageUrl(null);
      setMtime(null);
    }
  }

  useEffect(() => {
    fetchLatest(); // начальная загрузка

    // Подписка на SSE
    esRef.current = new EventSource('/events');
    esRef.current.addEventListener('latest', (e) => {
      try {
        const payload = JSON.parse(e.data);
        if (payload.changed) {
          // обновляем картинку
          setImageUrl(`/api/image/latest?t=${Date.now()}`);
          setMtime(payload.latest?.mtimeMs ?? null);
        }
      } catch {}
    });

    // Фолбэк-поллинг на случай, если SSE заблокирован:
    const fallback = setInterval(fetchLatest, 5000);

    return () => {
      if (esRef.current) esRef.current.close();
      clearInterval(fallback);
    };
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Последняя картинка из папки</h1>
      {!imageUrl && <p>В папке пока нет изображений. Помести файл в <code>server/images</code>.</p>}
      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt="Latest"
            style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ddd', borderRadius: 8 }}
          />
          {mtime && (
            <p style={{ marginTop: 8, color: '#555' }}>
              Обновлено: {new Date(mtime).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
