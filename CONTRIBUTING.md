# Contributing to Memory Game

Руководство по разработке и тестированию игры.

## Установка opencode

Для работы с проектом через AI-ассистента:

### macOS/Linux
```bash
curl -fsSL https://opencode.ai/install.sh | sh
```

### Windows
```powershell
iwr -useb https://opencode.ai/install.ps1 | iex
```

### Документация opencode
- [Официальная документация](https://opencode.ai/docs)
- [GitHub репозиторий](https://github.com/anomalyco/opencode)
- [Сообщить о проблеме](https://github.com/anomalyco/opencode/issues)

## Установка проекта

### 1. Клонирование
```bash
git clone <URL>
cd AITasks
```

### 2. Структура проекта
```
AITasks/
├── src/
│   ├── index.html      # Основной HTML файл
│   └── game.js         # Логика игры
├── README.md           # Основная документация
├── CONTRIBUTING.md     # Это файл
└── AGENTS.md           # Конфигурация AI-агентов
```

## Разработка

### Локальная разработка
```bash
# Запуск через локальный сервер
python3 -m http.server 8000

# Или через Node.js
npx http-server
```

Открой `http://localhost:8000/src/` для тестирования.

### Архитектура проекта

**index.html:**
- HTML разметка с встроенными стилями
- Адаптивный дизайн с медиа-запросами
- Поддержка двух размеров поля (4×4 и 6×6)

**game.js:**
- Класс `MemoryGame` с полной логикой игры
- Управление состоянием игры
- Таймер и подсчёт ходов
- Сохранение лучших результатов в localStorage
- Обработка событий пользователя

### Ключевые функции
- `MemoryGame` — основной класс игры
- `startTimer()` / `stopTimer()` — управление таймером
- `checkBestScore()` — проверка и сохранение рекордов
- `changeBoardSize()` — переключение размера поля
- `resetGame()` — сброс игры

## Тестирование

### Ручное тестирование
1. Проверка работы таймера
2. Корректность подсчёта ходов
3. Сохранение лучших результатов при перезагрузке
4. Переключение между 4×4 и 6×6
5. Адаптивность на мобильных устройствах

### Тестирование localStorage
```javascript
// Проверка сохранения рекордов
localStorage.getItem('memoryGameBestScore_4x4')
localStorage.getItem('memoryGameBestScore_6x6')
```

### Кросс-браузерное тестирование
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Стиль кода

### JavaScript
- ES6+ синтаксис
- Классовая архитектура
- Консистентное именование переменных
- Комментарии для сложной логики

### HTML/CSS
- Семантическая разметка
- CSS Grid для игрового поля
- Flexbox для компоновки
- CSS transitions для анимаций

## Внесение изменений

1. Создай ветку для новой фичи
```bash
git checkout -b feature/new-feature
```

2. Внеси изменения и протестируй

3. Создай pull request с описанием изменений

## Отладка

### Консоль разработчика
- Проверка ошибок JavaScript
- Мониторинг сетевых запросов
- Анализ производительности

### Логирование
```javascript
console.log('Game state:', this.gameStarted);
console.log('Best score:', this.bestScore);
```

## Контакты

- Сообщить о баге: создай issue в репозитории
- Предложить улучшение: создай pull request
- Вопросы по разработке: обсуди в issues