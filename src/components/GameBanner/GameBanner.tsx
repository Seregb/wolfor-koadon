import { motion } from 'framer-motion';

import './GameBanner.css';

/* Staggered variants для fade-in элементов */
const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: "easeInOut" as const,
    },
  }),
};

/* Декоративный меч-разделитель */
function SwordDivider() {
  return (
    <motion.div
      className="game-hero__divider"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ delay: 0.7, duration: 0.6, ease: "easeInOut" } as const}
    >
      <svg
        width="120"
        height="20"
        viewBox="0 0 120 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 10 L50 10" />
        <path d="M55 10 L60 5 L65 10 L60 15 Z" />
        <path d="M70 10 L110 10" />
      </svg>
    </motion.div>
  );
}

function GameBanner() {
  return (
    <section className="game-hero">
      {/* --- Фон: игровая тематика Лариара --- */}
      <div className="game-hero__bg" aria-hidden="true">
        <div className="game-hero__bg-gradient" />

        {/* Рунические круги — декоративные */}
        <div className="game-hero__rune game-hero__rune--1" />
        <div className="game-hero__rune game-hero__rune--2" />

        {/* Огненные искры */}
        <div className="game-hero__spark game-hero__spark--1" />
        <div className="game-hero__spark game-hero__spark--2" />
        <div className="game-hero__spark game-hero__spark--3" />
        <div className="game-hero__spark game-hero__spark--4" />

      </div>

      {/* --- Контент --- */}
      <div className="game-hero__content">
        <motion.p
          className="game-hero__tagline"
          initial="hidden"
          animate="visible"
          variants={heroItemVariants}
          custom={0}
        >
          МИР, ГДЕ РЫЦАРИ И МАГИЯ
        </motion.p>

        <motion.h1
          className="game-hero__title"
          initial="hidden"
          animate="visible"
          variants={heroItemVariants}
          custom={1}
        >
          ЛАРИАР
        </motion.h1>

        <SwordDivider />

        <motion.p
          className="game-hero__subtitle"
          initial="hidden"
          animate="visible"
          variants={heroItemVariants}
          custom={2}
        >
          Кланы. Войны. Руническая магия. Твоя история начинается здесь.
        </motion.p>

        {/* Индикатор скролла */}
        <motion.div
          className="game-hero__scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" } as const}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

export default GameBanner;
