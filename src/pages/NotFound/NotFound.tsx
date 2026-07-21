import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';

import './NotFound.css';

function NotFound() {
  // Анимация "парящих" элементов
  const floatingVariants: Variants = {
    float: {
      y: [0, -15, 0],
      rotate: [0, 3, -3, 0],
      transition: {
        duration: 4,
        ease: "easeInOut" as const,
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      className="not-found"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <motion.div
          className="not-found__content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Placeholder-арт (тёмный угол) */}
          <motion.div
            className="not-found__art"
            variants={floatingVariants}
            animate="float"
          >
            <div className="not-found__art-placeholder" />
          </motion.div>

          <motion.h1
            className="not-found__title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Тёмный угол Акиара
          </motion.h1>

          <motion.p
            className="not-found__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Вы забрели в тёмный угол Акиара. Вернуться?
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/" className="not-found__cta">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                На главную
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Парящие частицы */}
        <div className="not-found__particles">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`not-found__particle not-found__particle--${i + 1}`}
              variants={floatingVariants}
              animate="float"
              style={{
                transitionDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default NotFound;
