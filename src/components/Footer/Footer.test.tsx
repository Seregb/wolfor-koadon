import { describe, expect, test, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

afterEach(() => {
  document.body.innerHTML = '';
});

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
}

describe('Footer', () => {
  test('рендерит логотип-ссылку на "/"', () => {
    renderWithRouter();
    const logo = document.querySelector('.footer__logo') as HTMLAnchorElement;
    expect(logo).toBeInTheDocument();
    expect(logo?.href).toContain('/');
  });

  test('рендерит все 5 навигационных ссылок', () => {
    renderWithRouter();
    const nav = document.querySelector('.footer__nav');
    expect(nav).toBeInTheDocument();
    const links = nav?.querySelectorAll('a');
    expect(links?.length).toBe(5);
  });

  test('навигационные ссылки ведут на правильные маршруты', () => {
    renderWithRouter();
    const nav = document.querySelector('.footer__nav');
    const links = Array.from(nav?.querySelectorAll('a') || []);
    const expected = [
      { text: 'Книги', href: '/books' },
      { text: 'Игры', href: '/games' },
      { text: 'Лор', href: '/lore' },
      { text: 'Новости', href: '/news' },
      { text: 'Контакты', href: '/about' },
    ];
    expected.forEach((exp) => {
      const link = links.find((l) => l.textContent === exp.text);
      expect(link).toHaveAttribute('href', exp.href);
    });
  });

  test('рендерит 4 социальные ссылки', () => {
    renderWithRouter();
    const social = document.querySelector('.footer__social');
    expect(social).toBeInTheDocument();
    const socialLabels = ['VK', 'Telegram', 'YouTube', 'Discord'];
    const allSocialLinks = document.querySelectorAll('.footer__social-link');
    const firstSocialLink = allSocialLinks[0] as HTMLAnchorElement;
    expect(firstSocialLink).toHaveAttribute('target', '_blank');
    expect(firstSocialLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('социальные ссылки ведут на правильные URL', () => {
    renderWithRouter();
    const allSocialLinks = document.querySelectorAll('.footer__social-link');
    const hrefs = Array.from(allSocialLinks).map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('https://vk.com/');
    expect(hrefs).toContain('https://t.me/');
    expect(hrefs).toContain('https://youtube.com/');
    expect(hrefs).toContain('https://discord.com/');
  });

  test('рендерит копирайт с годом и названием', () => {
    renderWithRouter();
    const para = document.querySelector('.footer__bottom p');
    expect(para).toBeInTheDocument();
    expect(para?.textContent).toContain('Wolfor Koadon');
    expect(para?.textContent).toContain('Все права защищены');
    const year = new Date().getFullYear();
    expect(para?.textContent).toContain(String(year));
  });
});
