import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
      ease: "easeInOut",
    } as const,
  }),
};

/* ---------- Hover variant для Framer Motion ---------- */

export const bookCardHoverVariants = {
  hover: {
    y: -4,
    transition: { duration: 0.3, ease: "easeInOut" } as const,
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
  const variants = { ...bookCardEntranceVariants, ...bookCardHoverVariants };
  return (
    <motion.div
      className="book-card"
      initial="hidden"
      animate={onScreen ? 'visible' : 'hidden'}
      variants={variants}
      custom={index}
      whileHover="hover"
      whileTap="tap"
      style={{ '--book-card-index': index } as React.CSSProperties}
    >
      {/* Обложка-заглушка */}
      <div className="book-card__cover">
        <span className="book-card__cover-volume">{data.volume}</span>
        <span className="book-card__cover-year">{data.year}</span>
      </div>

      {/* Контент */}
      <div className="book-card__body">
        <h3 className="book-card__title">
          <Link to={`/books/${data.id}`} className="book-card__link">
            {data.title}
          </Link>
        </h3>

        <p className="book-card__desc">{data.description}</p>
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
