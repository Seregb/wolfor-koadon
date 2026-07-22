import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';

import PageLayout from '../PageLayout/PageLayout';
import { NewsList, newsItems } from '../../components/NewsCard/NewsCard';
import { newsBackground } from '../../assets/makets';

import './News.css';

/* ---------- Категории новостей ---------- */

const allCategories = ['Все', 'Книги', 'Игры', 'Лор'];

/* ---------- Страница «Новости» ---------- */

function News() {
  const [filter, setFilter] = useState('Все');

  const newsRef = useRef<HTMLDivElement>(null);
  const newsInView = useInView(newsRef, { once: true, margin: '-60px' });

  /* Фильтрация */
  const filtered = filter === 'Все'
    ? newsItems
    : newsItems.filter((n) => n.category === filter);

  return (
    <PageLayout useBackground backgroundImage={newsBackground}>
      <div className="news-page">
        {/* Заголовок */}
        <div className="news-page__header">
          <h1 className="news-page__title">НОВОСТИ</h1>
          <p className="news-page__subtitle">
            Новости о книгах, играх и вселенной Wolfor Koadon.
          </p>
        </div>

        {/* Фильтры */}
        <div className="news-page__filters">
          {allCategories.map((cat) => (
            <button
              key={cat}
              className={`news-page__filter-btn ${filter === cat ? 'news-page__filter-btn--active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Лента новостей */}
        <div ref={newsRef} className="news-page__feed">
          {filtered.length > 0 ? (
            <NewsList items={filtered} onScreen={newsInView} />
          ) : (
            <p className="news-page__empty">Нет новостей в этой категории</p>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default News;
