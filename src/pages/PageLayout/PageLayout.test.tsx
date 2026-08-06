import { describe, expect, test, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// мок image импортов — vitest не трансформирует .jpg как Vite
vi.mock('../../assets/makets', () => ({
  background1: 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
  background2: 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
  booksBackground: 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
  gamesBackground: 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
  newsBackground: 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
  loreBackground: 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
  aboutBackground: 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
}));

import PageLayout from './PageLayout';

afterEach(() => {
  document.body.innerHTML = '';
});

function renderWithLayout(props: { children?: React.ReactNode; useBackground?: boolean; backgroundImage?: string }) {
  return render(
    <MemoryRouter>
      <PageLayout {...props} />
    </MemoryRouter>
  );
}

describe('PageLayout', () => {
  test('рендерит children', () => {
    renderWithLayout({ children: <p>Test content</p> });
    expect(document.querySelector('.page-layout')).toBeInTheDocument();
    expect(document.querySelector('.page-layout__inner')?.textContent).toBe('Test content');
  });

  test('рендерит без фона по умолчанию', () => {
    renderWithLayout({ children: <div>Content</div> });
    const layout = document.querySelector('.page-layout');
    expect(layout).toBeInTheDocument();
    // Без фона — нет класса --bg
    expect(layout).not.toHaveClass('page-layout--bg');
  });

  test('рендерит с флагом useBackground', () => {
    renderWithLayout({ children: <div>Content</div>, useBackground: true });
    const layout = document.querySelector('.page-layout');
    expect(layout).toHaveClass('page-layout--bg');
  });

  test('рендерит с кастомным фоном', () => {
    renderWithLayout({
      children: <div>Content</div>,
      backgroundImage: 'url(test-bg.jpg)',
    });
    const layout = document.querySelector('.page-layout');
    expect(layout).toHaveClass('page-layout--bg');
  });

  test('рендерит inner container', () => {
    renderWithLayout({ children: <div>Content</div> });
    expect(document.querySelector('.page-layout__inner')).toBeInTheDocument();
  });
});
