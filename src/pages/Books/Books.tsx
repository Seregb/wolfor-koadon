import { Link } from 'react-router-dom';

import PageLayout from '../PageLayout/PageLayout';
import HorizontalSlider from '../../components/HorizontalSlider/HorizontalSlider';
import { books, arcMapping } from '../../data/booksData';

import './Books.css';

/* ---------- Страница «Книги» ---------- */

function Books() {
  /* Книги по аркам — порядок как в референсе */
  const arcs = ['Пробуждение', 'Война', 'Наследие'] as const;

  /* Compact book cover для слайдера */
  const renderBookCover = (book: typeof books[number]) => (
    <Link to={`/books/${book.id}`} className="books-page__slider-cover">
      <div className="books-page__slider-cover-inner">
        <span className="books-page__slider-cover-volume">{book.volume}</span>
        <span className="books-page__slider-cover-title">{book.title}</span>
        <span className="books-page__slider-cover-year">{book.year}</span>
      </div>
    </Link>
  );

  return (
    <PageLayout useBackground backgroundImage="/makets/books_background.jpg">
      <div className="books-page">
        {/* Заголовок */}
        <div className="books-page__header">
          <h1 className="books-page__title">КНИГИ ЦИКЛА «СЭТ»</h1>
          <div className="books-page__divider">
            <span className="books-page__divider-diamond" />
          </div>
          <p className="books-page__subtitle">
            Эпическая сага о магии, судьбе и человеческой воле на континентах Акиар и Лариар.
          </p>
        </div>

        {/* Арки с горизонтальными слайдерами */}
        {arcs.map((arc) => {
          const arcBooks = books.filter((b) => arcMapping[arc].includes(b.id));
          if (arcBooks.length === 0) return null;

          return (
            <div key={arc} className="books-page__arc">
              <h2 className="books-page__arc-title">{arc}</h2>
              <HorizontalSlider
                items={arcBooks}
                renderItem={renderBookCover}
                itemKey={(b) => b.id}
                visibleCount={3}
              />
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}

export default Books;
