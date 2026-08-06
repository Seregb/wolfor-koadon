import { describe, expect, test, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card, { SectionCards, cardEntranceVariants, cardHoverVariants } from './Card';

afterEach(() => {
  document.body.innerHTML = '';
});

function renderWithRouter(node: React.ReactNode) {
  return render(<MemoryRouter>{node}</MemoryRouter>);
}

/* Данные для тестов — cardData не экспортируется, дублируем */
const mockData = {
  type: 'books' as const,
  title: 'Книги',
  description: 'Цикл «Сэт» — эпические повествования о магии, судьбе и человеческой воле.',
  to: '/books',
  icon: 'book' as const,
  gradientClass: 'card__bg card__bg--books',
};

describe('Card', () => {
  test('рендерит ссылку с правильным href', () => {
    renderWithRouter(<Card data={mockData} />);
    const link = document.querySelector('.card__link') as HTMLAnchorElement | null;
    expect(link?.getAttribute('href')).toBe('/books');
  });

  test('рендерит описание карточки', () => {
    const { container } = renderWithRouter(<Card data={mockData} />);
    const desc = container.querySelector('.card__desc');
    expect(desc?.textContent).toContain('эпические повествования');
  });

  test('рендерит плашку с названием', () => {
    renderWithRouter(<Card data={mockData} />);
    const titleEl = document.querySelector('.card__plaque-label');
    expect(titleEl?.textContent).toContain('Книги');
  });
});

describe('SectionCards', () => {
  test('рендерит все 3 карточки', () => {
    renderWithRouter(<SectionCards />);
    const grid = document.querySelector('.cards-grid');
    const cards = grid?.querySelectorAll('.card') || document.querySelectorAll('.card');
    expect(cards.length).toBe(3);
  });

  test('каждая карточка — ссылка на правильный маршрут', () => {
    renderWithRouter(<SectionCards />);
    const grid = document.querySelector('.cards-grid');
    const links = grid?.querySelectorAll('.card__link') || document.querySelectorAll('.card__link');
    const hrefs = Array.from(links).map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/books');
    expect(hrefs).toContain('/games');
    expect(hrefs).toContain('/lore');
  });
});

describe('cardEntranceVariants', () => {
  test('имеет состояния hidden и visible', () => {
    expect(cardEntranceVariants.hidden).toBeDefined();
    expect(cardEntranceVariants.visible).toBeDefined();
  });

  test('visible принимает custom index', () => {
    const visible = (cardEntranceVariants.visible as (i: number) => Record<string, unknown>)(0);
    expect(visible.opacity).toBe(1);
    expect(visible.y).toBe(0);
  });
});

describe('cardHoverVariants', () => {
  test('имеет состояния hover и tap', () => {
    expect(cardHoverVariants.hover).toBeDefined();
    expect(cardHoverVariants.tap).toBeDefined();
  });

  test('hover масштабирует на 1.02', () => {
    expect(cardHoverVariants.hover.scale).toBe(1.02);
  });

  test('tap масштабирует на 0.98', () => {
    expect(cardHoverVariants.tap.scale).toBe(0.98);
  });
});
