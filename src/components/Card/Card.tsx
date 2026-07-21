import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import './Card.css';

/* Типы карточек */
export type CardType = 'books' | 'games' | 'lore';

export interface CardData {
  type: CardType;
  title: string;
  description: string;
  to: string;
  icon: 'book' | 'sword' | 'rune';
  gradientClass: string;
}

const cardData: CardData[] = [
  {
    type: 'books',
    title: 'Книги',
    description: 'Цикл «Сэт» — эпические повествования о магии, судьбе и человеческой воле.',
    to: '/books',
    icon: 'book',
    gradientClass: 'card__bg card__bg--books',
  },
  {
    type: 'games',
    title: 'Игры',
    description: 'Лариар — мир, где рыцари и магия сплетаются в борьбе за выживание.',
    to: '/games',
    icon: 'sword',
    gradientClass: 'card__bg card__bg--games',
  },
  {
    type: 'lore',
    title: 'Лор',
    description: 'Энциклопедия вселенной Wolfor Koadon: расы, эпохи, мифы и руны.',
    to: '/lore',
    icon: 'rune',
    gradientClass: 'card__bg card__bg--lore',
  },
];

/* Иконки */
function IconBook() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8" />
      <path d="M8 11h6" />
    </svg>
  );
}

function IconSword() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 3l6-6-6 6" />
      <path d="M14.5 3L6 11.5l2.5 2.5L17 5.5" />
      <path d="M8.5 14l-3 3 2 2 3-3" />
      <path d="M5.5 17l2-2" />
      <path d="M10 12.5l-1.5 1.5" />
    </svg>
  );
}

function IconRune() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20" />
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

const iconMap: Record<CardData['icon'], React.ReactNode> = {
  book: <IconBook />,
  sword: <IconSword />,
  rune: <IconRune />,
};

/* Entrance variant для scroll-triggered анимации */
export const cardEntranceVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: "easeInOut",
    } as const,
  }),
};

/* Hover variant для Framer Motion */
export const cardHoverVariants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeInOut" } as const,
  },
  tap: { scale: 0.98 },
};

interface CardProps {
  data: CardData;
  index?: number;
  onScreen?: boolean;
}

function Card({ data, index = 0, onScreen = false }: CardProps) {
  const variants = { ...cardEntranceVariants, ...cardHoverVariants };
  return (
    <motion.div
      className="card"
      initial="hidden"
      animate={onScreen ? 'visible' : 'hidden'}
      variants={variants}
      custom={index}
      whileHover="hover"
      whileTap="tap"
      style={{ '--card-index': index } as React.CSSProperties}
    >
      {/* Фоновый градиент */}
      <div className={`card__bg ${data.gradientClass}`} />

      {/* Готическая рамка с уголками */}
      <div className="card__frame" aria-hidden="true">
        <span className="card__corner card__corner--tl" />
        <span className="card__corner card__corner--tr" />
        <span className="card__corner card__corner--bl" />
        <span className="card__corner card__corner--br" />
      </div>

      {/* Ссылка-контент */}
      <Link to={data.to} className="card__link">
        {/* Иконка */}
        <div className="card__icon">
          {iconMap[data.icon]}
        </div>

        {/* Описание */}
        <p className="card__desc">
          {data.description}
        </p>

        {/* Плашка внизу */}
        <div className="card__plaque">
          <span className="card__plaque-label">{data.title}</span>
          <span className="card__plaque-arrow" aria-hidden="true">→</span>
        </div>
      </Link>
    </motion.div>
  );
}

/* Карточки для Landing — рендерим все 3 */
export function SectionCards({ onScreen }: { onScreen?: boolean }) {
  return (
    <div className="cards-grid">
      {cardData.map((data, i) => (
        <Card key={data.type} data={data} index={i} onScreen={onScreen} />
      ))}
    </div>
  );
}

export default Card;
