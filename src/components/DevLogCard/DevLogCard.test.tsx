import { describe, expect, test, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DevLogCard, { devLogEntranceVariants, DevLogGrid } from './DevLogCard';
import { devLogs } from '../../data/gameData';

afterEach(() => {
  document.body.innerHTML = '';
});

function renderWithRouter(node: React.ReactNode) {
  return render(<MemoryRouter>{node}</MemoryRouter>);
}

const mockLog = devLogs[0];

describe('DevLogCard', () => {
  test('рендерит заголовок dev-лога', () => {
    renderWithRouter(<DevLogCard data={mockLog} />);
    const title = document.querySelector('.devlog-card__title');
    expect(title).toBeInTheDocument();
    expect(title?.textContent).toContain(mockLog.title);
  });

  test('рендерит дату в формате ru-RU', () => {
    renderWithRouter(<DevLogCard data={mockLog} />);
    const dateEl = document.querySelector('.devlog-card__date');
    expect(dateEl).toBeInTheDocument();
    const date = new Date(mockLog.date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    expect(dateEl?.textContent).toBe(date);
  });

  test('рендерит категорию dev-лога', () => {
    renderWithRouter(<DevLogCard data={mockLog} />);
    const catEl = document.querySelector('.devlog-card__category');
    expect(catEl?.textContent).toBe(mockLog.category);
  });

  test('рендерит excerpt', () => {
    renderWithRouter(<DevLogCard data={mockLog} />);
    const excerpt = document.querySelector('.devlog-card__excerpt');
    expect(excerpt?.textContent).toContain(mockLog.excerpt.slice(0, 20));
  });

  test('рендерит кнопку "Читать"', () => {
    renderWithRouter(<DevLogCard data={mockLog} />);
    const readMore = document.querySelector('.devlog-card__read-more');
    expect(readMore).toBeTruthy();
    expect(readMore?.textContent).toContain('Читать');
  });

  test('ссылка ведёт на правильный маршрут /games/log/:id', () => {
    renderWithRouter(<DevLogCard data={mockLog} />);
    const link = document.querySelector('.devlog-card__read-more');
    expect(link).toHaveAttribute('href', `/games/log/${mockLog.id}`);
  });
});

describe('DevLogGrid', () => {
  test('рендерит все dev-логи из массива', () => {
    renderWithRouter(<DevLogGrid logsData={devLogs} />);
    const grid = document.querySelector('.devlog-grid');
    expect(grid).toBeInTheDocument();
    const titles = document.querySelectorAll('.devlog-card__title');
    devLogs.forEach((log) => {
      const found = Array.from(titles).some((t) => t.textContent?.includes(log.title));
      expect(found).toBe(true);
    });
  });

  test('рендерит правильный количество карточек', () => {
    renderWithRouter(<DevLogGrid logsData={devLogs} />);
    const grid = document.querySelector('.devlog-grid');
    const cards = grid?.querySelectorAll('.devlog-card') || document.querySelectorAll('.devlog-card');
    expect(cards.length).toBe(devLogs.length);
  });
});

describe('devLogEntranceVariants', () => {
  test('имеет состояния hidden и visible', () => {
    expect(devLogEntranceVariants.hidden).toBeDefined();
    expect(devLogEntranceVariants.visible).toBeDefined();
  });

  test('hidden — opacity 0, x -30', () => {
    expect(devLogEntranceVariants.hidden.opacity).toBe(0);
    expect(devLogEntranceVariants.hidden.x).toBe(-30);
  });

  test('visible возвращает opacity 1, x 0', () => {
    const visible = (devLogEntranceVariants.visible as (i: number) => Record<string, unknown>)(0);
    expect(visible.opacity).toBe(1);
    expect(visible.x).toBe(0);
  });

  test('visible учитывает index в delay', () => {
    const visible2 = (devLogEntranceVariants.visible as (i: number) => Record<string, unknown>)(2);
    expect(visible2.transition.delay).toBe(0.2); // 2 * 0.1
  });
});
