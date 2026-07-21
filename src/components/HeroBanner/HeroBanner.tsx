import { motion } from 'framer-motion';

import './HeroBanner.css';

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

/* Декоративный ромб-разделитель */
function DiamondDivider() {
  return (
    <motion.div
      className="hero__divider"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.75, duration: 0.5, ease: "easeInOut" } as const}
    >
      <span className="hero__divider-diamond" />
    </motion.div>
  );
}

/* Контент по центру */
function HeroBanner() {
  return (
    <section className="hero-banner">
      {/* --- Фон --- */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-gradient" />
        <div className="hero__bg-vignette" />
      </div>

      {/* --- Контент --- */}
      <div className="hero__content">
        <motion.p
          className="hero__tagline"
          initial="hidden"
          animate="visible"
          variants={heroItemVariants}
          custom={0}
        >
          Добро пожаловать в мир
        </motion.p>

        <motion.h1
          className="hero__title"
          initial="hidden"
          animate="visible"
          variants={heroItemVariants}
          custom={1}
        >
          WOLFOR KOADON
        </motion.h1>

        <DiamondDivider />

        <motion.p
          className="hero__subtitle"
          initial="hidden"
          animate="visible"
          variants={heroItemVariants}
          custom={2}
        >
          Где тьма — это выбор
        </motion.p>

        {/* Скролл-индикатор */}
        <motion.div
          className="hero__scroll-hint"
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

export default HeroBanner;
