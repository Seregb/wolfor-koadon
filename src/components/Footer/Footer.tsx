import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import './Footer.css';

const footerLinks = [
  { to: '/books', label: 'Книги' },
  { to: '/games', label: 'Игры' },
  { to: '/lore', label: 'Лор' },
  { to: '/news', label: 'Новости' },
  { to: '/about', label: 'Контакты' },
];

const socialLinks = [
  { href: 'https://vk.com/', label: 'VK', icon: 'vk' },
  { href: 'https://t.me/', label: 'Telegram', icon: 'telegram' },
  { href: 'https://youtube.com/', label: 'YouTube', icon: 'youtube' },
  { href: 'https://discord.com/', label: 'Discord', icon: 'discord' },
];

function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="container footer__container">
        {/* Верхняя часть — ссылки */}
        <div className="footer__top">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-text">WK</span>
            <span className="sr-only">Wolfor Koadon</span>
          </Link>

          <nav className="footer__nav">
            <ul>
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Соцсети */}
          <div className="footer__social">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label={social.label}
              >
                <motion.span
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.label}
                </motion.span>
              </a>
            ))}
          </div>
        </div>

        {/* Нижняя часть — копирайт */}
        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Wolfor Koadon. Все права защищены.</p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
