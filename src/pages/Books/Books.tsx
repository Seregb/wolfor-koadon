import { useRef } from 'react';
import { useInView } from 'framer-motion';

import PageLayout from '../PageLayout/PageLayout';
import { BookGrid } from '../../components/BookCard/BookCard';
import { bookCards } from '../../data/booksData';
import { booksBackground } from '../../assets/makets';

import './Books.css';

/* ---------- Страница «Книги» ---------- */

function Books() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridView = useInView(gridRef, { once: true, margin: '-80px' });

  return (
    <PageLayout useBackground backgroundImage={booksBackground}>
      <div className="books-page">
        {/* Заголовок страницы */}
        <div className="books-page__header">
          <h1 className="books-page__title">КНИГИ ЦИКЛА «СЭТ»</h1>
          <div className="books-page__divider">
            <span className="books-page__divider-diamond" />
          </div>
          <p className="books-page__subtitle">
            Эпическая сага о магии, судьбе и человеческой воле на континентах Акиар и Лариар.
          </p>
        </div>

        {/* Сетка книг */}
        <div ref={gridRef} className="books-page__grid">
          <BookGrid booksData={bookCards} onScreen={gridView} />
        </div>
      </div>
    </PageLayout>
  );
}

export default Books;
