import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

import HeroBanner from '../../components/HeroBanner/HeroBanner';
import { SectionCards } from '../../components/Card/Card';
import { NewsList } from '../../components/NewsCard/NewsCard';
import { books } from '../../data/booksData';
import { background1 } from '../../assets/makets';

import './Landing.css';
import '../../App.css';

/* Сколько книг показывать в горизонтальной галерее */
const GALLERY_BOOK_COUNT = 5;

function Landing() {
  /* Refs для scroll-triggered анимации */
  const cardsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const universeRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);

  const cardsInView = useInView(cardsRef, { once: true, margin: '-80px' });
  const historyInView = useInView(historyRef, { once: true, margin: '-80px' });
  const universeInView = useInView(universeRef, { once: true, margin: '-80px' });
  const newsInView = useInView(newsRef, { once: true, margin: '-80px' });

  /* Первые N книг для галереи */
  const galleryBooks = books.slice(0, GALLERY_BOOK_COUNT);

  return (
    <>
      {/* Hero-блок */}
      <HeroBanner />

      {/* Контент ниже hero — фон background_1.jpg */}
      <div className="landing-content" style={{ backgroundImage: `url('${background1}')` }}>
        {/* --- 1. Карточки разделов --- */}
        <div ref={cardsRef} className="section">
          <SectionCards onScreen={cardsInView} />
        </div>

        {/* --- 2. История (цитата) --- */}
        <div ref={historyRef} className="section section--dark">
          <div
            className={`history-block ${historyInView ? 'history-block--visible' : ''}`}
          >
            <h2 className="history-block__title">История</h2>
            <p className="history-block__text">
              В каждом томе — новая глава. В каждой главе — новая судьба.
              Два мира. Семь книг. Одна война, которая изменит всё.
            </p>
            <p className="history-block__quote">
              «Тьма не приходит извне. Она внутри нас — и мы сами её зовём.»
            </p>
            <p className="history-block__quote-author">
              — Линэра, маг Акиара
            </p>
          </div>
        </div>

        {/* --- 3. Вселенная Сэт (галерея обложек) --- */}
        <div ref={universeRef} className="section section--tight">
          <div className="universe-block">
            <div className="universe-block__header">
              <h2 className="universe-block__title">Вселенная Сэт</h2>
              <Link to="/books" className="universe-block__link">
                Все тома →
              </Link>
            </div>

            {/* Горизонтальная галерея — placeholder обложек */}
            <div
              className={`universe-block__gallery ${universeInView ? 'universe-block__gallery--visible' : ''}`}
            >
              {galleryBooks.map((book) => (
                <Link to={`/books/${book.id}`} key={book.id} className="universe-block__cover">
                  <div className="universe-block__cover-placeholder">
                    <span className="universe-block__cover-volume">{book.volume}</span>
                    <span className="universe-block__cover-title">{book.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* --- 4. Последние вести --- */}
        <div ref={newsRef} className="section">
          <h2 className="section__title">Последние вести</h2>
          <NewsList onScreen={newsInView} />
        </div>
      </div>
    </>
  );
}

export default Landing;
