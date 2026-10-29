import { useRef } from 'react';
import { useInView } from 'framer-motion';

import HeroBanner from '../../components/HeroBanner/HeroBanner';
import { NewsList } from '../../components/NewsCard/NewsCard';
import { books } from '../../data/booksData';
import { background1 } from '../../assets/makets';

import './Landing.css';

function Landing() {
  const newsRef = useRef<HTMLDivElement>(null);
  const newsInView = useInView(newsRef, { once: true, margin: '-60px' });

  /* Первые N книг для новостей */
  const newsBooks = books.slice(0, 3);

  return (
    <>
      {/* Hero-блок — основной заголовок */}
      <HeroBanner />

      {/* Последние новости — фон background_1.jpg */}
      <div className="landing-content" style={{ backgroundImage: `url('${background1}')` }}>
        <div ref={newsRef} className="section">
          <h2 className="section__title">Последние вести</h2>

          <NewsList
            items={newsBooks.map((b, i) => ({
              id: 100 + i,
              title: `Новое: ${b.title}`,
              excerpt: b.description,
              fullText: b.fullDescription,
              date: '2026-07-15',
              category: 'Книги',
            }))}
            onScreen={newsInView}
          />
        </div>
      </div>
    </>
  );
}

export default Landing;
