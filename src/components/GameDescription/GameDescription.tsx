import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import './GameDescription.css';

/* ---------- Entrance variant ---------- */

export const gameDescEntranceVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeInOut' as const,
    },
  }),
};

/* ---------- Пропсы ---------- */

export interface GameDescriptionProps {
  title: string;
  fullText: string;
  onScreen?: boolean;
}

function GameDescription({ title, fullText, onScreen = false }: GameDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="game-description"
      initial="hidden"
      animate={onScreen ? 'visible' : 'hidden'}
      variants={gameDescEntranceVariants}
      custom={0}
    >
      <h2 className="game-description__title">{title}</h2>

      {/* Краткое содержимое — первые ~3 строки */}
      <p className="game-description__excerpt">{fullText.slice(0, 280)}…</p>

      {/* Полный текст (аккордеон) */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="game-description__full"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' } as const}
          >
            <p>{fullText}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Кнопка раскрытия */}
      <button
        className="game-description__toggle"
        onClick={() => setExpanded(prev => !prev)}
        aria-expanded={expanded}
      >
        <span>{expanded ? 'Свернуть' : 'Подробнее'}</span>
        <motion.span
          className="game-description__toggle-arrow"
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' } as const}
        >
          &#x25BC;
        </motion.span>
      </button>

      {/* Декоративная линия */}
      <div className="game-description__line" aria-hidden="true" />
    </motion.div>
  );
}

export default GameDescription;
