import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import './NewsCard.css';

/* ---------- Тип ---------- */

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  fullText: string;
  date: string;
  category: string;
}

/* ---------- Данные (по умолчанию) ---------- */

const defaultNewsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Новый цикл «Сэт» — первая глава',
    excerpt: 'Доступна для чтения первая глава нового цикла, раскрывающего тайну происхождения магии.',
    fullText: 'Доступна для чтения первая глава нового цикла, раскрывающего тайну происхождения магии в мире Wolfor Koadon. Автор погружает читателя в глубокий мир, где древние руны переплетаются с судьбами героев. Глава доступна бесплатно для всех читателей.',
    date: '2026-07-10',
    category: 'Книги',
  },
  {
    id: 2,
    title: 'Dev-лог: проектирование мира Лариара',
    excerpt: 'Рассказываем, как создавалась карта, система кланов и боевая механика.',
    fullText: 'Рассказываем, как создавалась карта мира Лариар, разрабатывалась система кланов с уникальными особенностями и продумывалась боевая механика, сочетающая тактику и магию. Каждый элемент проходит через призму нарратива и лора.',
    date: '2026-07-05',
    category: 'Игры',
  },
  {
    id: 3,
    title: 'Энциклопедия: расы Акиара',
    excerpt: 'Новый раздел лора — полная классификация рас, населяющих континент.',
    fullText: 'Новый раздел лора — полная классификация рас, населяющих континент Акиар. От древних камнеткачей до лунных эльфов — каждая раса описана с историей, культурой, особенностями и связями с остальным миром.',
    date: '2026-06-28',
    category: 'Лор',
  },
];

/* ---------- Entrance variant ---------- */

export const newsEntranceVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeInOut" as const,
    },
  }),
};

/* ---------- Пропсы карточки ---------- */

interface NewsCardProps {
  item: NewsItem;
  index?: number;
  onScreen?: boolean;
}

function NewsCard({ item, index = 0, onScreen = false }: NewsCardProps) {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = new Date(item.date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <motion.div
      className="news-card"
      initial="hidden"
      animate={onScreen ? 'visible' : 'hidden'}
      variants={newsEntranceVariants}
      custom={index}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2, ease: "easeInOut" } as const}
    >
      {/* Дата и категория */}
      <div className="news-card__meta">
        <span className="news-card__date">{formattedDate}</span>
        <span className="news-card__category">{item.category}</span>
      </div>

      {/* Заголовок */}
      <h3 className="news-card__title">{item.title}</h3>

      {/* Краткое содержимое */}
      <p className="news-card__excerpt">{item.excerpt}</p>

      {/* Расширенный текст (expand on click) */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="news-card__full"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" } as const}
          >
            <p>{item.fullText}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Кнопка раскрытия */}
      <button
        className="news-card__toggle"
        onClick={() => setExpanded(prev => !prev)}
        aria-expanded={expanded}
      >
        <span>{expanded ? 'Свернуть' : 'Подробнее'}</span>
        <motion.span
          className="news-card__toggle-arrow"
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" } as const}
        >
          ↓
        </motion.span>
      </button>

      {/* Декоративная золотая линия */}
      <div className="news-card__line" aria-hidden="true" />
    </motion.div>
  );
}

/* ---------- Сетка новостей — принимает items или использует дефолт ---------- */

export function NewsList({
  items,
  onScreen,
}: {
  items?: NewsItem[];
  onScreen?: boolean;
}) {
  const source = items ?? defaultNewsItems;

  return (
    <div className="news-grid">
      {source.map((item, i) => (
        <NewsCard key={item.id} item={item} index={i} onScreen={onScreen} />
      ))}
    </div>
  );
}

export { defaultNewsItems as newsItems };
export default NewsCard;
