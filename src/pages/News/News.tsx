import { useRef } from 'react';
import { useInView } from 'framer-motion';

import PageLayout from '../PageLayout/PageLayout';
import { NewsList, newsItems } from '../../components/NewsCard/NewsCard';
import { newsBackground } from '../../assets/makets';

import './News.css';

/* ---------- Страница «Новости» ---------- */

function News() {
  const newsRef = useRef<HTMLDivElement>(null);
  const newsInView = useInView(newsRef, { once: true, margin: '-60px' });

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

        {/* Лента новостей */}
        <div ref={newsRef} className="news-page__feed">
          <NewsList items={newsItems} onScreen={newsInView} />
        </div>
      </div>
    </PageLayout>
  );
}

export default News;
