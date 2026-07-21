import { useParams, useNavigate } from 'react-router-dom';

import PageLayout from '../PageLayout/PageLayout';
import { books, getPrevNext } from '../../data/booksData';

import './BookDetail.css';

/* ---------- Страница «Детали книги» ---------- */

function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const book = books.find((b) => b.id === id);
  const { prev, next } = book ? getPrevNext(book.id) : { prev: null, next: null };

  /* Книга не найдена */
  if (!book) {
    navigate('/__notfound__', { replace: true });
    return null;
  }

  return (
    <PageLayout useBackground>
      <div className="book-detail">
        {/* Верхняя навигация: назад к списку */}
        <button
          className="book-detail__back"
          onClick={() => navigate('/books')}
          aria-label="Вернуться к списку книг"
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
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          <span>Все книги</span>
        </button>

        {/* Обложка + мета */}
        <div className="book-detail__hero">
          <div className="book-detail__cover">
            <span className="book-detail__cover-volume">{book.volume}</span>
            <span className="book-detail__cover-year">{book.year}</span>
            <span className="book-detail__cover-title">{book.title}</span>
          </div>

          <div className="book-detail__info">
            <h1 className="book-detail__title">{book.title}</h1>
            <div className="book-detail__meta">
              <span className="book-detail__meta-volume">{book.volume}</span>
              <span className="book-detail__meta-year">{book.year}</span>
            </div>
            <p className="book-detail__description">{book.fullDescription}</p>
          </div>
        </div>

        {/* Цитата */}
        <div className="book-detail__quote">
          <p className="book-detail__quote-text">{book.quote}</p>
          <p className="book-detail__quote-author">{book.quoteAuthor}</p>
        </div>

        {/* Навигация между книгами */}
        <div className="book-detail__nav">
          {prev && (
            <button
              className="book-detail__nav-btn book-detail__nav-btn--prev"
              onClick={() => navigate(`/books/${prev.id}`)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <div>
                <span className="book-detail__nav-label">Предыдущая книга</span>
                <span className="book-detail__nav-title">{prev.title}</span>
              </div>
            </button>
          )}

          {next && (
            <button
              className="book-detail__nav-btn book-detail__nav-btn--next"
              onClick={() => navigate(`/books/${next.id}`)}
            >
              <div>
                <span className="book-detail__nav-label">Следующая книга</span>
                <span className="book-detail__nav-title">{next.title}</span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default BookDetail;
