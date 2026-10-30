import { motion } from 'framer-motion';

import './GameCard.css';

/* ---------- Пропсы ---------- */

export interface GameCardProps {
  title: string;
  subtitle: string; // подзаголовок-слоган под заголовком
  previewItems: PreviewItem[]; // маркеры в свёрнутом состоянии
  onOpen: () => void; // callback открытия модалки
  image: string; // арт карточки
  accent?: string; // CSS-переменная акцента (--color-gold, --color-lightning)
}

export interface PreviewItem {
  emoji: string;
  heading: string;
}

/* ---------- Варианты анимации ---------- */

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

/* ---------- Компонент ---------- */

function GameCard({ title, subtitle, previewItems, onOpen, image, accent = 'var(--color-gold)' }: GameCardProps) {
  return (
    <motion.div
      className="game-card"
      style={{ '--card-accent': accent } as React.CSSProperties}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{ y: -4 }}
    >
      {/* --- Арт-фон карточки --- */}
      <div className="game-card__art" aria-hidden="true">
        <img src={image} alt={title} loading="lazy" />
        <div className="game-card__art-overlay" />
      </div>

      {/* --- Контент карточки --- */}
      <div className="game-card__content">
        <h2 className="game-card__title">{title}</h2>
        <p className="game-card__subtitle">{subtitle}</p>

        {/* Маркеры-превью */}
        <div className="game-card__preview">
          {previewItems.map((item, i) => (
            <div key={i} className="game-card__preview-item">
              <span className="game-card__preview-emoji">{item.emoji}</span>
              <span className="game-card__preview-heading">{item.heading}</span>
            </div>
          ))}
        </div>

        {/* Кнопка открытия модалки */}
        <button
          className="game-card__expand-btn"
          onClick={onOpen}
        >
          <span className="game-card__expand-btn-text">Подробнее</span>
          <span className="game-card__expand-btn-icon">→</span>
        </button>
      </div>

      {/* Декоративная золотая линия */}
      <div className="game-card__line" aria-hidden="true" />
    </motion.div>
  );
}

export default GameCard;
