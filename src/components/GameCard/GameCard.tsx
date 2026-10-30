import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import './GameCard.css';

/* ---------- Пропсы ---------- */

export interface GameCardProps {
  title: string;
  subtitle: string; // подзаголовок-слоган под заголовком
  previewItems: PreviewItem[]; // маркеры в свёрнутом состоянии
  fullText: string; // полный текст с \n\n разбивкой
  image: string; // арт карточки
  accent?: string; // CSS-переменная акцента (--color-gold, --color-lightning)
}

export interface PreviewItem {
  emoji: string;
  heading: string;
}

/* ---------- Состояния анимации ---------- */

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

const contentVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

/* ---------- Компонент ---------- */

function GameCard({ title, subtitle, previewItems, fullText, image, accent = 'var(--color-gold)' }: GameCardProps) {
  const [expanded, setExpanded] = useState(false);

  /* Разбиваем полный текст на секции по двойному переносу */
  const sections = fullText.split('\n\n').filter(Boolean);

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

        {/* Маркеры-превью (свёрнутое состояние) */}
        <div className="game-card__preview">
          {previewItems.map((item, i) => (
            <div key={i} className="game-card__preview-item">
              <span className="game-card__preview-emoji">{item.emoji}</span>
              <span className="game-card__preview-heading">{item.heading}</span>
            </div>
          ))}
        </div>

        {/* Кнопка раскрытия */}
        <button
          className="game-card__expand-btn"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={`game-card-full-text-${title}`}
        >
          <span className="game-card__expand-btn-text">
            {expanded ? 'Свернуть' : 'Подробнее'}
          </span>
          <motion.span
            className="game-card__expand-btn-icon"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            ▾
          </motion.span>
        </button>
      </div>

      {/* --- Раскрывающееся полное описание (аккордеон) --- */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            className="game-card__full-text"
            id={`game-card-full-text-${title}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
          >
            <div className="game-card__full-text-inner">
              {sections.map((section, i) => {
                /* Определяем заголовок секции.
                   Эмодзи-маркер — всегда заголовок.
                   Короткие фразы (< 65 символов) — заголовок, ЕСЛИ не narrative-переход. */
                const cp = section.codePointAt(0);
const hasEmoji = cp !== undefined && cp > 0x2000;

                /* Narrative starters — короткие связки внутри текста,
                   а не заголовки новых секций (И да, И пока, Или вы, и т.п.) */
                const NARRATIVE_STARTERS = /^(И\s|Или\s|О[бн]\s|Для\s|Чем\s|Он[а ])/i;
                const startsNarrative = NARRATIVE_STARTERS.test(section);

                let isHeading: boolean;
                if (hasEmoji) {
                  isHeading = true;
                } else if (startsNarrative) {
                  /* Narrative starters — всегда body, независимо от длины */
                  isHeading = false;
                } else {
                  isHeading = section.length < 65;
                }

                const isFirst = i === 0;

                if (isFirst) {
                  /* Первая секция — вступительный текст */
                  return (
                    <p key={i} className="game-card__full-text-lead">
                      {section}
                    </p>
                  );
                }

                if (isHeading) {
                  return (
                    <h3 key={i} className="game-card__full-text-heading">
                      {section}
                    </h3>
                  );
                }

                return (
                  <p key={i} className="game-card__full-text-body">
                    {section}
                  </p>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default GameCard;
