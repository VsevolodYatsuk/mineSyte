#!/usr/bin/env bash
#========================================================================================#
#  REACT + NODE MINI-SITE (LIVE IMAGES) — ЕДИНАЯ ИНСТРУКЦИЯ С ЦВЕТОМ И ВЫДЕЛЕНИЕМ        #
#  СТРАНИЦЫ: "/" (Контакты) • "/image" (последняя картинка из server/images, автообнов) #
#========================================================================================#

printf "\n${BLD}${CYN}⏱ Подготовка${NC}\n"
printf "${DIM}Установи Node.js 18+ и Git. Открой папку проекта 'my-site'.${NC}\n"
node -v  # проверка версии Node

printf "\n${BLD}${CYN}📁 Структура (для ориентира)${NC}\n"
printf "${DIM}my-site/\n  server/  ← index.js + images/\n  src/     ← фронтенд React (Vite)\n  vite.config.js (прокси /api,/events → 3001)\n  package.json (npm run dev)\n${NC}"

#────────────────────────────────────────────────────────────────────────────────────────#

printf "\n\n${BLD}${MAG}▶ Терминал №1 — Бэкенд (Express)${NC}\n"
printf "${YEL}# Следит за папкой и отдаёт картинки${NC}\n"
echo "cd my-site/server"
echo "node index.js"
printf "${DIM}Ожидаешь увидеть:${NC}\n"
printf "${GRN}Server running on http://localhost:3001${NC}\n"
printf "${GRN}Put images into: .../my-site/server/images${NC}\n"
printf "${BLU}Картинки клади в: my-site/server/images  (форматы: .jpg .jpeg .png .gif .webp)${NC}\n"

#────────────────────────────────────────────────────────────────────────────────────────#

printf "\n${BLD}${MAG}▶ Терминал №2 — Фронтенд (React + Vite)${NC}\n"
echo "cd my-site"
echo "npm install"
echo "npm run dev"
printf "${BLU}Открой адрес из вывода (обычно): http://localhost:5173/${NC}\n"

#────────────────────────────────────────────────────────────────────────────────────────#

printf "\n${BLD}${CYN}🖼 Как пользоваться${NC}\n"
printf "${GRN}•${NC} Открой ${BLU}/ ${NC}— страница «Контакты»\n"
printf "${GRN}•${NC} Открой ${BLU}/image ${NC}— покажет последнюю картинку из ${BLU}server/images${NC}\n"
printf "${GRN}•${NC} Клади новую картинку в ${BLU}server/images${NC} — страница обновится автоматически\n"

#────────────────────────────────────────────────────────────────────────────────────────#

printf "\n${BLD}${CYN}🌐 Git и GitHub (с нуля)${NC}\n"
printf "${YEL}# Перейди в корень проекта${NC}\n"
echo "cd my-site"

printf "${YEL}# Инициализируй репозиторий (если ещё нет)${NC}\n"
echo "git init"

printf "${YEL}# Укажи имя и email для коммитов (разово)${NC}\n"
echo "git config --global user.name \"Твоё Имя\""
echo "git config --global user.email \"ТВОЙ_EMAIL@пример.домен\""
echo "git config --global -l  # проверка"

printf "${YEL}# Создай .gitignore (чтобы не тащить лишнее)${NC}\n"
echo "printf \"node_modules/\\ndist/\\n.vscode/\\n.env\\n\" > .gitignore"

printf "${YEL}# Первый коммит${NC}\n"
echo "git add ."
echo "git commit -m \"Первый коммит: React + Node (автообновление картинок)\""

printf "${YEL}# Привяжи удалённый репозиторий (ЗАМЕНИ URL) и запушь${NC}\n"
echo "git remote add origin https://github.com/ТВОЙ_ЛОГИН/ИМЯ_РЕПО.git"
echo "git branch -M main"
echo "git push -u origin main"
printf "${DIM}При первом push через HTTPS GitHub попросит логин и Personal Access Token (PAT) вместо пароля.${NC}\n"

printf "${YEL}# Дальнейшие обновления${NC}\n"
echo "git add ."
echo "git commit -m \"Обновление\""
echo "git push"

#────────────────────────────────────────────────────────────────────────────────────────#

printf "\n${BLD}${CYN}👫 Для друга: клонирование и запуск${NC}\n"
echo "git clone https://github.com/ТВОЙ_ЛОГИН/ИМЯ_РЕПО.git"
echo "cd ИМЯ_РЕПО"
echo "# Терминал №1:"
echo "cd server && node index.js"
echo "# Терминал №2:"
echo "cd .. && npm install && npm run dev"

#────────────────────────────────────────────────────────────────────────────────────────#

printf "\n${BLD}${CYN}💡 Подсказки${NC}\n"
printf "${GRN}•${NC} Если картинка не меняется — это кэш. В проекте есть cache-busting (?t=...), подожди автообновления или обнови вкладку.\n"
printf "${GRN}•${NC} Порты по умолчанию: ${BLU}backend 3001${NC}, ${BLU}frontend 5173${NC} (смотри консоль).\n"
printf "${GRN}•${NC} Доступ к файлам идёт только через бэкенд — прямого чтения диска из браузера нет, так безопаснее.\n"

printf "\n${BLD}${GRN}✔ Готово! Выполняй строки выше по порядку. Удачи!${NC}\n\n"
