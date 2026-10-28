import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import './BookCard.css';
import { type BookCardData } from '../../data/booksData';

/* ---------- Entrance variant для scroll-triggered анимации ---------- */

export const bookCardEntranceVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeInOut',
    } as const,
  }),
};

/* ---------- Hover variant для Framer Motion ---------- */

export const bookCardHoverVariants = {
  hover: {
    y: -4,
    transition: { duration: 0.3, ease: 'easeInOut' } as const,
  },
  tap: { y: 0 },
};

/* ---------- Пропсы для одной карточки ---------- */

interface BookCardProps {
  data: BookCardData;
  index?: number;
  onScreen?: boolean;
}

function BookCard({ data, index = 0, onScreen = false }: BookCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="book-card"
      initial="hidden"
      animate={onScreen ? 'visible' : 'hidden'}
      variants={bookCardEntranceVariants}
      custom={index}
      whileHover="hover"
      whileTap="tap"
      style={{ '--book-card-index': index } as React.CSSProperties}
    >
      {/* Реальная обложка */}
      <div className="book-card__cover">
        <img
          src={data.cover}
          alt={data.title}
          className="book-card__cover-img"
          loading="lazy"
        />
        <span className="book-card__cover-volume">{data.volume}</span>
      </div>

      {/* Контент */}
      <div className="book-card__body">
        <h3 className="book-card__title">
          <Link to={`/books/${data.id}`} className="book-card__link">
            {data.title}
          </Link>
        </h3>

        <p className="book-card__desc">{data.description}</p>

        {/* Расширенное описание (аккордеон) */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="book-card__full"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' } as const}
            >
              <p>{data.fullDescription}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Кнопка раскрытия */}
        <button
          className="book-card__toggle"
          onClick={() => setExpanded(prev => !prev)}
          aria-expanded={expanded}
        >
          <span>{expanded ? 'Свернуть' : 'Подробнее'}</span>
          <motion.span
            className="book-card__toggle-arrow"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' } as const}
          >
            &#x25BC;
          </motion.span>
        </button>
      </div>

      {/* Декоративная золотая линия */}
      <div className="book-card__line" aria-hidden="true" />
    </motion.div>
  );
}

/* ---------- Сетка книг для страницы — получает данные снаружи ---------- */

export function BookGrid({
  booksData,
  onScreen,
}: {
  booksData: BookCardData[];
  onScreen?: boolean;
}) {
  return (
    <div className="book-grid">
      {booksData.map((book, i) => (
        <BookCard key={book.id} data={book} index={i} onScreen={onScreen} />
      ))}
    </div>
  );
}

export default BookCard;
