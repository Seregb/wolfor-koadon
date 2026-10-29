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
      ease: 'easeInOut' as const,
    },
  }),
};

/* ---------- Пропсы ---------- */

export interface GameBannerProps {
  title: string;
  tagline?: string;
  subtitle?: string;
  image?: string; // URL игрового арта
  onArtClick?: () => void; // вызывается при клике на арт
}

function GameBanner({ title, tagline, subtitle, image, onArtClick }: GameBannerProps) {
  return (
    <section className="game-hero">
      {/* --- Фон: игровой арт или градиент --- */}
      <div className="game-hero__bg" aria-hidden="true">
        {image && (
          <img
            src={image}
            alt={title}
            className="game-hero__bg-img"
            loading="lazy"
            onClick={onArtClick}
            style={{ cursor: onArtClick ? 'pointer' : 'default' }}
          />
        )}
        <div className="game-hero__bg-overlay" />

        {/* Подсказка для кликабельного баннера */}
        {onArtClick && (
          <div className="game-hero__click-hint" aria-hidden="true">
            <span className="game-hero__click-hint-text">Нажмите для описания</span>
            <span className="game-hero__click-hint-icon">↓</span>
          </div>
        )}

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
        {tagline && (
          <motion.p
            className="game-hero__tagline"
            initial="hidden"
            animate="visible"
            variants={heroItemVariants}
            custom={0}
          >
            {tagline}
          </motion.p>
        )}

        <motion.h1
          className="game-hero__title"
          initial="hidden"
          animate="visible"
          variants={heroItemVariants}
          custom={1}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="game-hero__subtitle"
            initial="hidden"
            animate="visible"
            variants={heroItemVariants}
            custom={2}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Индикатор скролла */}
        <motion.div
          className="game-hero__scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.2, duration: 0.8, ease: 'easeInOut' } as const}
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
