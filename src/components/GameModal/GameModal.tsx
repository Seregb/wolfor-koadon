import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import './GameModal.css';

/* ---------- Пропсы модалки ---------- */

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  poster: string;
  fullText: string;
}

/* ---------- Варианты анимации ---------- */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const contentVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
  exit: { opacity: 0, y: 40, scale: 0.96 },
};

/* ---------- Компонент ---------- */

function GameModal({ isOpen, onClose, title, poster, fullText }: GameModalProps) {
  /* Закрытие по Escape */
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  /* Закрытие по клику на overlay (но не на контент) */
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  /* Разбиваем текст на секции */
  const sections = fullText.split('\n\n').filter(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="game-modal" onClick={handleOverlayClick} role="dialog" aria-modal="true">
          <motion.div
            className="game-modal__backdrop"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
          />

          <motion.div
            className="game-modal__content"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={contentVariants}
          >
            {/* Кнопка закрытия */}
            <button
              className="game-modal__close"
              onClick={onClose}
              aria-label="Закрыть"
            >
              ✕
            </button>

            {/* Постер (место под видео) */}
            <div className="game-modal__poster">
              <img src={poster} alt={title} />
            </div>

            {/* Текст */}
            <div className="game-modal__body">
              {sections.map((section, i) => {
                /* Эмодзи-маркер — заголовок секции */
                const cp = section.codePointAt(0);
                const hasEmoji = cp !== undefined && cp > 0x2000;

                /* Narrative starters — связки внутри текста */
                const NARRATIVE_STARTERS = /^(И\s|Или\s|О[бн]\s|Для\s|Чем\s|Он[а ])/i;
                const startsNarrative = NARRATIVE_STARTERS.test(section);

                let isHeading: boolean;
                if (hasEmoji) {
                  isHeading = true;
                } else if (startsNarrative) {
                  isHeading = false;
                } else {
                  isHeading = section.length < 65;
                }

                const isFirst = i === 0;

                if (isFirst) {
                  return (
                    <p key={i} className="game-modal__lead">
                      {section}
                    </p>
                  );
                }

                if (isHeading) {
                  return (
                    <h3 key={i} className="game-modal__heading">
                      {section}
                    </h3>
                  );
                }

                return (
                  <p key={i} className="game-modal__text">
                    {section}
                  </p>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default GameModal;
