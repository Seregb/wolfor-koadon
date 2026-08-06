import { describe, expect, test, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoreCard, loreCardEntranceVariants, loreCardHoverVariants, LoreGrid } from './LoreCard';
import { categories } from '../../data/loreData';

afterEach(() => {
  document.body.innerHTML = '';
});

function renderWithRouter(node: React.ReactNode) {
  return render(<MemoryRouter>{node}</MemoryRouter>);
}

const mockCategory = categories[0];

describe('LoreCard', () => {
  test('рендерит иконку-символ категории', () => {
    renderWithRouter(<LoreCard data={mockCategory} />);
    const icon = document.querySelector('.lore-card__icon');
    expect(icon?.textContent).toBe(mockCategory.icon);
  });

  test('рендерит заголовок категории', () => {
    renderWithRouter(<LoreCard data={mockCategory} />);
    const title = document.querySelector('.lore-card__title');
    expect(title).toBeInTheDocument();
    expect(title?.textContent).toContain(mockCategory.title);
  });

  test('рендерит подзаголовок', () => {
    renderWithRouter(<LoreCard data={mockCategory} />);
    const subtitle = document.querySelector('.lore-card__subtitle');
    expect(subtitle?.textContent).toBe(mockCategory.subtitle);
  });

  test('рендерит описание категории', () => {
    renderWithRouter(<LoreCard data={mockCategory} />);
    const desc = document.querySelector('.lore-card__desc');
    expect(desc?.textContent).toContain(mockCategory.description.slice(0, 20));
  });

  test('рендерит плашку с количеством статей', () => {
    renderWithRouter(<LoreCard data={mockCategory} />);
    const plaque = document.querySelector('.lore-card__plaque-label');
    expect(plaque?.textContent).toContain(`${mockCategory.count} статей`);
  });

  test('ссылка ведёт на правильный маршрут /lore/:id', () => {
    renderWithRouter(<LoreCard data={mockCategory} />);
    const link = document.querySelector('.lore-card__link');
    expect(link).toHaveAttribute('href', `/lore/${mockCategory.id}`);
  });
});

describe('LoreGrid', () => {
  test('рендерит все категории из массива', () => {
    renderWithRouter(<LoreGrid categoriesData={categories} />);
    const grid = document.querySelector('.lore-grid');
    expect(grid).toBeInTheDocument();
    const titles = document.querySelectorAll('.lore-card__title');
    categories.forEach((cat) => {
      const found = Array.from(titles).some((t) => t.textContent?.includes(cat.title));
      expect(found).toBe(true);
    });
  });

  test('рендерит правильный количество карточек', () => {
    renderWithRouter(<LoreGrid categoriesData={categories} />);
    const grid = document.querySelector('.lore-grid');
    const cards = grid?.querySelectorAll('.lore-card') || document.querySelectorAll('.lore-card');
    expect(cards.length).toBe(categories.length);
  });

  test('рендерит все иконки категорий', () => {
    renderWithRouter(<LoreGrid categoriesData={categories} />);
    const grid = document.querySelector('.lore-grid');
    const icons = grid?.querySelectorAll('.lore-card__icon') || document.querySelectorAll('.lore-card__icon');
    expect(icons.length).toBe(categories.length);
  });
});

describe('loreCardEntranceVariants', () => {
  test('имеет состояния hidden и visible', () => {
    expect(loreCardEntranceVariants.hidden).toBeDefined();
    expect(loreCardEntranceVariants.visible).toBeDefined();
  });

  test('hidden — opacity 0, y 30, scale 0.96', () => {
    expect(loreCardEntranceVariants.hidden.opacity).toBe(0);
    expect(loreCardEntranceVariants.hidden.y).toBe(30);
    expect(loreCardEntranceVariants.hidden.scale).toBe(0.96);
  });

  test('visible возвращает opacity 1, y 0, scale 1', () => {
    const visible = (loreCardEntranceVariants.visible as (i: number) => Record<string, unknown>)(0);
    expect(visible.opacity).toBe(1);
    expect(visible.y).toBe(0);
    expect(visible.scale).toBe(1);
  });

  test('visible учитывает index в delay', () => {
    const visible2 = (loreCardEntranceVariants.visible as (i: number) => Record<string, unknown>)(3);
    expect(visible2.transition.delay).toBe(0.24); // 3 * 0.08
  });
});

describe('loreCardHoverVariants', () => {
  test('имеет состояния hover и tap', () => {
    expect(loreCardHoverVariants.hover).toBeDefined();
    expect(loreCardHoverVariants.tap).toBeDefined();
  });

  test('hover поднимает на -4px', () => {
    expect(loreCardHoverVariants.hover.y).toBe(-4);
  });

  test('tap сбрасывает y в 0', () => {
    expect(loreCardHoverVariants.tap.y).toBe(0);
  });
});
