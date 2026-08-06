import { describe, expect, test, afterEach } from 'vitest';
import { vi } from 'vitest';

// мок image импортов
vi.mock('../../assets/makets', () => ({
  background1: '/src/assets/makets/background_1.jpg',
  background2: '/src/assets/makets/background_2.jpg',
  booksBackground: '/src/assets/makets/books_background.jpg',
  gamesBackground: '/src/assets/makets/games_background.jpg',
  newsBackground: '/src/assets/makets/news_background.jpg',
  loreBackground: '/src/assets/makets/lore_background.jpg',
  aboutBackground: '/src/assets/makets/about_background.jpg',
}));

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeroBanner, { heroItemVariants } from './HeroBanner';

afterEach(() => {
  document.body.innerHTML = '';
});

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <HeroBanner />
    </MemoryRouter>
  );
}

describe('HeroBanner', () => {
  test('рендерит tagline', () => {
    renderWithRouter();
    const tagline = document.querySelector('.hero__tagline');
    expect(tagline?.textContent).toContain('Добро пожаловать в мир');
  });

  test('рендерит заголовок WOLFOR KOADON', () => {
    renderWithRouter();
    const title = document.querySelector('.hero__title');
    expect(title?.textContent).toContain('WOLFOR KOADON');
  });

  test('рендерит subtitle', () => {
    renderWithRouter();
    const subtitle = document.querySelector('.hero__subtitle');
    expect(subtitle?.textContent).toContain('Где тьма — это выбор');
  });

  test('рендерит индикатор скролла', () => {
    renderWithRouter();
    const hint = document.querySelector('.hero__scroll-hint');
    expect(hint).toBeInTheDocument();
    const svg = hint?.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});

describe('heroItemVariants', () => {
  test('имеет состояния hidden и visible', () => {
    expect(heroItemVariants.hidden).toBeDefined();
    expect(heroItemVariants.visible).toBeDefined();
  });

  test('hidden — opacity 0, y 20', () => {
    expect(heroItemVariants.hidden.opacity).toBe(0);
    expect(heroItemVariants.hidden.y).toBe(20);
  });

  test('visible принимает custom index и возвращает correct props', () => {
    const visible = (heroItemVariants.visible as (i: number) => Record<string, unknown>)(0);
    expect(visible.opacity).toBe(1);
    expect(visible.y).toBe(0);
    expect(visible.transition.delay).toBe(0);
    expect(visible.transition.duration).toBe(0.7);
  });

  test('visible учитывает index в delay', () => {
    const visible2 = (heroItemVariants.visible as (i: number) => Record<string, unknown>)(2);
    expect(visible2.transition.delay).toBe(0.3); // 2 * 0.15
  });
});
