# Memory Game

Классическая игра на запоминание пар карточек. Находи пары одинаковых фруктовых эмодзи.

## Описание

Memory Game — игра на развитие памяти. 16 карточек (8 пар) с фруктовыми эмодзи. Подсчёт ходов, анимация переворота, адаптивный дизайн.

## Установка

### Локальный запуск

1. Клонируй репозиторий:
```bash
git clone <URL>
cd AITasks
```

2. Открой `index.html`:
```bash
open index.html      # macOS
start index.html     # Windows
xdg-open index.html  # Linux
```

### Через локальный сервер

Для лучшей производительности:
```bash
python3 -m http.server 8000  # Python 3
npx http-server              # Node.js
```

Открой `http://localhost:8000`.

## Быстрые команды

**macOS/Linux:**
```bash
git clone <URL> && cd AITasks && open index.html
python3 -m http.server 8000
```

**Windows PowerShell:**
```powershell
git clone <URL>; cd AITasks; start index.html
python -m http.server 8000
```

**Windows CMD:**
```cmd
git clone <URL> && cd AITasks && start index.html
python -m http.server 8000
```

## Геймплей

1. Кликни на карточку — перевернётся
2. Найди пару с таким же символом
3. Совпали — остаются открытыми
4. Не совпали — переворачиваются обратно
5. Цель: найти все 8 пар за минимальное число ходов

## Технические детали

- HTML5, CSS3, JavaScript (ES6+)
- Классовая архитектура
- CSS Grid для игрового поля
- Flexbox для компоновки
- CSS transitions для анимаций
- Поддержка всех современных браузеров

## Структура

```
AITasks/
├── index.html
├── game.js
└── README.md
```

## Лицензия

Свободное использование и модификация.