import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import PageLayout from '../PageLayout/PageLayout';
import { SectionCards } from '../../components/Card/Card';
import { bookCards } from '../../data/booksData';
import { categories } from '../../data/loreData';
import { devLogs } from '../../data/gameData';
import './Search.css';

/* ---------- Тип результата поиска ---------- */

type SearchResultType = 'book' | 'lore' | 'devlog';

interface SearchResult {
  type: SearchResultType;
  id: string;
  title: string;
  subtitle: string;
  to: string;
}

/* ---------- Страница «Поиск» ---------- */

function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [focused, setFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  /* Автофокус при загрузке */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* Поиск по всем разделам */
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const found: SearchResult[] = [];

    /* Книги */
    bookCards.forEach((book) => {
      if (book.title.toLowerCase().includes(q) || book.description.toLowerCase().includes(q)) {
        found.push({
          type: 'book',
          id: book.id,
          title: book.title,
          subtitle: `${book.volume} — ${book.year}`,
          to: `/books/${book.id}`,
        });
      }
    });

    /* Лор */
    categories.forEach((cat) => {
      if (cat.title.toLowerCase().includes(q) || cat.description.toLowerCase().includes(q)) {
        found.push({
          type: 'lore',
          id: cat.id,
          title: cat.title,
          subtitle: cat.subtitle,
          to: `/lore/${cat.id}`,
        });
      }
    });

    /* Dev-логи */
    devLogs.forEach((log) => {
      if (log.title.toLowerCase().includes(q) || log.excerpt.toLowerCase().includes(q)) {
        found.push({
          type: 'devlog',
          id: log.id,
          title: log.title,
          subtitle: log.category,
          to: `/games/log/${log.id}`,
        });
      }
    });

    setResults(found);
  }, [query]);

  /* Типы для иконок результатов */
  const resultIcons: Record<SearchResultType, string> = {
    book: '📖',
    lore: 'ᛟ',
    devlog: '⚙',
  };

  const resultColors: Record<SearchResultType, string> = {
    book: 'var(--color-lightning)',
    lore: 'var(--color-gold)',
    devlog: 'var(--color-lightning-alt)',
  };

  /* Навигация по результату */
  const goToResult = (to: string) => {
    navigate(to);
    setQuery('');
    setResults([]);
  };

  return (
    <PageLayout useBackground>
      <div className="search-page">
        {/* Заголовок */}
        <div className="search-page__header">
          <h1 className="search-page__title">Поиск</h1>
          <p className="search-page__subtitle">
            Найдите книги, лор и новости вселенной Wolfor Koadon.
          </p>
        </div>

        {/* Поисковый инпут */}
        <div className={`search-page__input-wrap ${focused ? 'search-page__input-wrap--focus' : ''}`}>
          <svg
            className="search-page__search-icon"
            width="22"
            height="22"
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
            ref={inputRef}
            type="text"
            className="search-page__input"
            placeholder="Введите запрос..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-label="Поиск по сайту"
          />
          {query && (
            <button
              className="search-page__clear"
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}
              aria-label="Очистить поиск"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Результаты */}
        <AnimatePresence>
          {focused && results.length > 0 && (
            <motion.div
              className="search-page__results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeInOut" } as const}
            >
              {results.map((item) => (
                <button
                  key={item.id}
                  className="search-page__result-item"
                  onClick={() => goToResult(item.to)}
                  style={{ '--result-accent': resultColors[item.type] } as React.CSSProperties}
                >
                  <span className="search-page__result-icon">{resultIcons[item.type]}</span>
                  <div className="search-page__result-info">
                    <span className="search-page__result-title">{item.title}</span>
                    <span className="search-page__result-subtitle">{item.subtitle}</span>
                  </div>
                  <span className="search-page__result-arrow">→</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Пустой запрос */}
        <AnimatePresence>
          {focused && query.trim() && results.length === 0 && (
            <motion.p
              className="search-page__empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              Ничего не найдено
            </motion.p>
          )}
        </AnimatePresence>

        {/* Быстрые ссылки */}
        <div className="search-page__quick">
          <p className="search-page__quick-label">Быстрые ссылки</p>
          <div className="search-page__quick-links">
            <button className="search-page__quick-btn" onClick={() => setQuery('руна')}>
              Руны
            </button>
            <button className="search-page__quick-btn" onClick={() => setQuery('клан')}>
              Кланы
            </button>
            <button className="search-page__quick-btn" onClick={() => setQuery('эпоха')}>
              Эпохи
            </button>
            <button className="search-page__quick-btn" onClick={() => setQuery('Сэт')}>
              Цикл Сэт
            </button>
          </div>
        </div>

        {/* Переход к другим разделам */}
        <div className="search-page__sidebar">
          <h2 className="search-page__sidebar-title">Другие разделы</h2>
          <SectionCards />
        </div>
      </div>
    </PageLayout>
  );
}

export default SearchPage;
