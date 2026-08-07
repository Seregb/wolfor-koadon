# Landing Page Redesign

**Дата:** 2026-08-07
**Статус:** утверждено

## Цель

Переработать главную страницу (`/`): убрать многосекционный лендинг, заменить на двухстадийную анимацию — центральный текст (заголовок + подзаголовок) → 3 карточки разделов.

## Что сохраняется

- **Header** — без изменений
- **Footer** — без изменений
- **Фон** — один `background1.jpg` на всю страницу (через `Landing.css`, `background-size: cover`)
- **SectionCards** — текущие карточки «Книги», «Игры», «Лор» остаются

## Что убирается

- `HeroBanner` — больше не импортируется в Landing
- `HistoryBlock` — убран из Landing
- `UniverseGallery` — убран из Landing
- `NewsList` — убран из Landing
- Inline `backgroundImage` из Landing — переносится в CSS

## Структура Landing

```
Header (fixed, неизменен)
│
├── LandingIntro (новый компонент)
│   ├── Заголовок «СЭТ: Wolfor Koadon»
│   ├── Подзаголовок (из текущего HeroBanner)
│   └── Анимация: fadeIn → пауза ~2s → fadeOut + slideUp под хедер → display: none
│
├── SectionCards
│   ├── Книга (→ /books)
│   ├── Игры (→ /games)
│   └── Лор (→ /lore)
│   └── Анимация: staggered reveal (запускается после ухода LandingIntro)
│
├── Footer (неизменен)
│
└── Фон: background1.jpg на всю страницу (Landing.css)
```

## Анимация (вариант A — Classic Swap)

### Фаза 1: Intro
- `LandingIntro` появляется по центру экрана (50–60vh от верха)
- `initial: { opacity: 0, y: 30 }` → `animate: { opacity: 1, y: 0 }`
- duration: 0.8s, easing: ease-out

### Фаза 2: Пауза
- Текст задерживается на ~2 секунды (время прочитать)

### Фаза 3: Уход
- `LandingIntro` анимирует `opacity: 1 → 0` + `y: 0 → -200` (под хедер)
- duration: 0.6s, easing: ease-in
- По завершении анимации: `display: none` (или `motion.hide()`)

### Фаза 4: Карточки
- Запускаются после ухода intro (можно через `useEffect` + `setTimeout` или `onExitComplete` на intro)
- Staggered reveal: Книги (0s), Игры (0.2s), Лор (0.4s)
- `initial: { opacity: 0, y: 40 }` → `animate: { opacity: 1, y: 0 }`
- duration: 0.6s каждый

## Файлы

### Новые:
- `src/components/LandingIntro/LandingIntro.tsx` — текст с анимацией
- `src/components/LandingIntro/LandingIntro.css` — стили

### Изменённые:
- `src/pages/Landing/Landing.tsx` — упрощённая: Intro + SectionCards
- `src/pages/Landing/Landing.css` — фон на всю страницу

### Удалённые (файлы, не stash):
- `src/components/HeroBanner/HeroBanner.tsx` (stash: `legacy: current landing...`)
- `src/components/HeroBanner/HeroBanner.css` (stash)

### Без изменений:
- `src/components/Card/Card.tsx` / `.css` (SectionCards)
- `src/components/Header/Header.tsx` / `.css`
- `src/components/Footer/Footer.tsx` / `.css`
- `src/App.tsx` — убрать маршрут HeroBanner, оставить Landing

## Legacy

Текущая версия сохранена в stash:
```bash
git stash pop  # восстановить
```
