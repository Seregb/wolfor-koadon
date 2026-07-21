import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import './Header.css';

const navLinks = [
  { to: '/books', label: 'Книги' },
  { to: '/games', label: 'Игры' },
  { to: '/lore', label: 'Лор' },
  { to: '/news', label: 'Новости' },
  { to: '/about', label: 'О проекте' },
];

const socialLinks = [
  {
    to: 'https://x.com',
    label: 'X (Twitter)',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
  {
    to: 'https://youtube.com',
    label: 'YouTube',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="4" />
        <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    to: 'https://facebook.com',
    label: 'Facebook',
    svg: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h-3a6 6 0 0 0-6 6v3h-2v4h2v7h4v-7h3l1-4h-4V9a1 1 0 0 1 1-1h2V3z" />
      </svg>
    ),
  },
];

/* Варианты анимаций для staggered reveal */
const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: "easeInOut" } as const,
  }),
};

const socialVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const socialItemVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeInOut" } as const },
};

/* Готический SVG-логотип «F» */
function GothicLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="36"
      height="40"
      viewBox="0 0 36 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Основной контур F */}
      <path
        d="M6 2h20l-2 4h-10v8h8l-2 4h-6v14H6V2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Декоративная засечка сверху */}
      <path
        d="M4 2h24l-1 3H5L4 2z"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Малая перекладина */}
      <path
        d="M6 14h10"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (burgerOpen) {
      document.body.classList.add('burger-open');
    } else {
      document.body.classList.remove('burger-open');
    }
    return () => { document.body.classList.remove('burger-open'); };
  }, [burgerOpen]);

  const toggleBurger = () => setBurgerOpen(prev => !prev);

  return (
    <motion.header
      className={`header ${scrolled ? 'header--scrolled' : ''} ${burgerOpen ? 'header--burger-open' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 15, duration: 0.5 }}
    >
      <div className="container header__container">
        {/* --- Логотип: готический F --- */}
        <Link to="/" className="header__logo" aria-label="Wolfor Koadon — на главную">
          <motion.div
            className="header__logo-icon"
            whileHover={{ scale: 1.06, rotate: -3 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <GothicLogo />
          </motion.div>
          <span className="sr-only">Wolfor Koadon</span>
        </Link>

        {/* --- Десктопная навигация --- */}
        <nav className="header__nav header__nav--desktop">
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={socialVariants}
          >
            {navLinks.map((link, i) => (
              <motion.li
                key={link.to}
                variants={navItemVariants}
                custom={i}
              >
                <Link
                  to={link.to}
                  className="header__link"
                  onClick={() => setBurgerOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        {/* --- Действия: соцсети + CTA + бургер --- */}
        <div className="header__actions">
          {/* Соцсети (десктоп) */}
          <motion.div
            className="header__socials"
            initial="hidden"
            animate="visible"
            variants={socialVariants}
          >
            {socialLinks.map((s) => (
              <motion.a
                key={s.label}
                href={s.to}
                target="_blank"
                rel="noopener noreferrer"
                className="header__social-link"
                variants={socialItemVariants}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                aria-label={s.label}
              >
                {s.svg}
              </motion.a>
            ))}
          </motion.div>

          {/* CTA */}
          <Link to="/about" className="header__cta">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Войти в мир
            </motion.span>
          </Link>

          {/* Бургер */}
          <button
            className={`header__burger ${burgerOpen ? 'header__burger--active' : ''}`}
            onClick={toggleBurger}
            aria-label={burgerOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={burgerOpen}
          >
            <span className="header__burger-line" />
            <span className="header__burger-line" />
            <span className="header__burger-line" />
          </button>
        </div>
      </div>

      {/* --- Золотой разделитель --- */}
      <motion.div
        className="header__separator"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" } as const}
      />

      {/* --- Мобильное меню --- */}
      <AnimatePresence>
        {burgerOpen && (
          <motion.nav
            className="header__nav header__nav--mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                },
              }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.to}
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    to={link.to}
                    className="header__link header__link--mobile"
                    onClick={() => setBurgerOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            {/* Соцсети в мобильном меню */}
            <motion.div
              className="header__socials header__socials--mobile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header__social-link header__social-link--mobile"
                  aria-label={s.label}
                >
                  {s.svg}
                </a>
              ))}
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
