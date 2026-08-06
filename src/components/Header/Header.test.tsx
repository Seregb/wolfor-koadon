import { describe, expect, test, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import React from 'react';
import Header from './Header';

afterEach(() => {
  document.body.innerHTML = '';
});

vi.mock('framer-motion', () => {
  const createMotion = (tag: string) =>
    React.forwardRef((props: Record<string, unknown>, ref) =>
      React.createElement(tag, { ...props, ref }, props.children)
    );
  return {
    motion: {
      header: createMotion('header'),
      div: createMotion('div'),
      svg: createMotion('svg'),
      p: createMotion('p'),
      ul: createMotion('ul'),
      li: createMotion('li'),
      a: createMotion('a'),
      span: createMotion('span'),
      section: createMotion('section'),
      nav: createMotion('nav'),
      button: createMotion('button'),
    },
    AnimatePresence: ({ children }: { children?: React.ReactNode }) => children,
  };
});

function renderWithRouter() {
  return render(<MemoryRouter><Header /></MemoryRouter>);
}

describe('Header', () => {
  test('отображает логотип-ссылку на "/"', () => {
    renderWithRouter();
    const logo = document.querySelector('.header__logo') as HTMLAnchorElement;
    expect(logo).toBeInTheDocument();
    expect(logo?.getAttribute('href')).toBe('/');
  });

  test('отображает все 5 nav-ссылок', () => {
    renderWithRouter();
    const nav = document.querySelector('.header__nav--desktop');
    expect(nav).toBeInTheDocument();
    const links = nav?.querySelectorAll('.header__link');
    expect(links?.length).toBe(5);
  });

  test('CTA кнопка — ссылка на "/about" с текстом "Войти в мир"', () => {
    renderWithRouter();
    const cta = document.querySelector('.header__cta') as HTMLAnchorElement;
    expect(cta).toBeInTheDocument();
    expect(cta?.getAttribute('href')).toBe('/about');
    expect(cta?.textContent).toContain('Войти в мир');
  });

  test('отображает 3 социальные иконки', () => {
    renderWithRouter();
    const socials = document.querySelectorAll('.header__social-link');
    expect(socials.length).toBeGreaterThan(0);
  });

  test('мобильное меню скрыто по умолчанию', () => {
    renderWithRouter();
    const burger = document.querySelector('.header__burger') as HTMLButtonElement;
    expect(burger).toHaveAttribute('aria-expanded', 'false');
  });

  test('клик по бургеру открывает мобильное меню', () => {
    renderWithRouter();
    const burger = document.querySelector('.header__burger') as HTMLButtonElement;
    fireEvent.click(burger);
    expect(burger).toHaveAttribute('aria-expanded', 'true');
  });

  test('клик по бургеру повторно закрывает меню', () => {
    renderWithRouter();
    const burger = document.querySelector('.header__burger') as HTMLButtonElement;
    fireEvent.click(burger);
    fireEvent.click(burger);
    expect(burger).toHaveAttribute('aria-expanded', 'false');
  });

  test('ссылки в навигации имеют правильные href', () => {
    renderWithRouter();
    const nav = document.querySelector('.header__nav--desktop');
    const links = Array.from(nav?.querySelectorAll('.header__link') || []);
    const expected = [
      { text: 'Книги', href: '/books' },
      { text: 'Игры', href: '/games' },
      { text: 'Лор', href: '/lore' },
      { text: 'Новости', href: '/news' },
      { text: 'О проекте', href: '/about' },
    ];
    expected.forEach((exp) => {
      const link = links.find((l) => l.textContent === exp.text);
      expect(link).toHaveAttribute('href', exp.href);
    });
  });

  test('соцсети ссылки ведут на правильные URL', () => {
    renderWithRouter();
    const socialLinks = document.querySelectorAll('.header__social-link');
    const hrefs = Array.from(socialLinks).map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('https://x.com');
    expect(hrefs).toContain('https://youtube.com');
    expect(hrefs).toContain('https://facebook.com');
  });
});
