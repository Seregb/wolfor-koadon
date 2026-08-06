import { describe, expect, test, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookCard, { bookCardEntranceVariants, bookCardHoverVariants, BookGrid } from './BookCard';
import { books } from '../../data/booksData';

afterEach(() => {
  document.body.innerHTML = '';
});

function renderWithRouter(node: React.ReactNode) {
  return render(<MemoryRouter>{node}</MemoryRouter>);
}

const mockBook = books[0];

describe('BookCard', () => {
  test('рендерит обложку с томом и годом', () => {
    renderWithRouter(<BookCard data={mockBook} />);
    expect(screen.getByText(String(mockBook.volume))).toBeInTheDocument();
    expect(screen.getByText(String(mockBook.year))).toBeInTheDocument();
  });

  test('рендерит заголовок с книгой', () => {
    renderWithRouter(<BookCard data={mockBook} />);
    const link = document.querySelector('.book-card__link');
    expect(link).toBeInTheDocument();
    expect(link?.textContent).toContain(mockBook.title);
  });

  test('рендерит описание книги', () => {
    renderWithRouter(<BookCard data={mockBook} />);
    const desc = document.querySelector('.book-card__desc');
    expect(desc?.textContent).toContain(mockBook.description.slice(0, 20));
  });

  test('ссылка ведёт на правильный маршрут /books/:id', () => {
    renderWithRouter(<BookCard data={mockBook} />);
    const link = document.querySelector('.book-card__link');
    expect(link).toHaveAttribute('href', `/books/${mockBook.id}`);
  });
});

describe('BookGrid', () => {
  test('рендерит все книги из массива', () => {
    renderWithRouter(<BookGrid booksData={books} />);
    const grid = document.querySelector('.book-grid');
    expect(grid).toBeInTheDocument();
    const titles = grid?.querySelectorAll('.book-card__title');
    books.forEach((book) => {
      const found = Array.from(titles || []).some((t) => t.textContent?.includes(book.title));
      expect(found).toBe(true);
    });
  });

  test('рендерит правильный количество карточек', () => {
    renderWithRouter(<BookGrid booksData={books} />);
    const grid = document.querySelector('.book-grid');
    const cards = grid?.querySelectorAll('.book-card') || document.querySelectorAll('.book-card');
    expect(cards.length).toBe(books.length);
  });

  test('рендерит ссылки на каждую книгу', () => {
    renderWithRouter(<BookGrid booksData={books} />);
    const grid = document.querySelector('.book-grid');
    const links = Array.from(grid?.querySelectorAll('.book-card__link') || []);
    const hrefs = links.map((l) => l.getAttribute('href'));
    books.forEach((book) => {
      expect(hrefs).toContain(`/books/${book.id}`);
    });
  });
});

describe('bookCardEntranceVariants', () => {
  test('имеет состояния hidden и visible', () => {
    expect(bookCardEntranceVariants.hidden).toBeDefined();
    expect(bookCardEntranceVariants.visible).toBeDefined();
  });

  test('hidden — opacity 0, y 30, scale 0.96', () => {
    expect(bookCardEntranceVariants.hidden.opacity).toBe(0);
    expect(bookCardEntranceVariants.hidden.y).toBe(30);
    expect(bookCardEntranceVariants.hidden.scale).toBe(0.96);
  });

  test('visible возвращает opacity 1, y 0, scale 1', () => {
    const visible = (bookCardEntranceVariants.visible as (i: number) => Record<string, unknown>)(0);
    expect(visible.opacity).toBe(1);
    expect(visible.y).toBe(0);
    expect(visible.scale).toBe(1);
  });
});

describe('bookCardHoverVariants', () => {
  test('имеет состояния hover и tap', () => {
    expect(bookCardHoverVariants.hover).toBeDefined();
    expect(bookCardHoverVariants.tap).toBeDefined();
  });

  test('hover поднимает на -4px', () => {
    expect(bookCardHoverVariants.hover.y).toBe(-4);
  });

  test('tap сбрасывает y в 0', () => {
    expect(bookCardHoverVariants.tap.y).toBe(0);
  });
});
