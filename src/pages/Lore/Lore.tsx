import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';

import PageLayout from '../PageLayout/PageLayout';
import { LoreGrid } from '../../components/LoreCard/LoreCard';
import { categories } from '../../data/loreData';
import { loreBackground } from '../../assets/makets';

import './Lore.css';

/* ---------- Страница «Лор» ---------- */

function Lore() {
  const [query, setQuery] = useState('');

  const loreRef = useRef<HTMLDivElement>(null);
  const loreInView = useInView(loreRef, { once: true, margin: '-60px' });

  /* Фильтрация по поиску */
  const filtered = query.trim()
    ? categories.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase()) ||
          c.subtitle.toLowerCase().includes(query.toLowerCase()),
      )
    : categories;

  return (
    <PageLayout useBackground backgroundImage={loreBackground}>
      <div className="lore-page">
        {/* Заголовок */}
        <div className="lore-page__header">
          <h1 className="lore-page__title">ЛОР</h1>
          <p className="lore-page__subtitle">
            Вселенная Wolfor Koadon — расы, эпохи, мифы, руны и магия.
          </p>
        </div>

        {/* Поиск */}
        <div className="lore-page__search-wrap">
          <svg
            className="lore-page__search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            className="lore-page__search-input"
            placeholder="Поиск по энциклопедии..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Поиск по энциклопедии"
          />
        </div>

        {/* Сетка разделов */}
        <div ref={loreRef} className="lore-page__grid-wrap">
          {filtered.length > 0 ? (
            <LoreGrid categoriesData={filtered} onScreen={loreInView} />
          ) : (
            <p className="lore-page__empty">Ничего не найдено</p>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default Lore;
