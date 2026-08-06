import { describe, expect, test, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ClanCard, { clanEntranceVariants, clanHoverVariants, ClanGrid } from './ClanCard';
import { clans } from '../../data/gameData';

afterEach(() => {
  document.body.innerHTML = '';
});

function renderWithRouter(node: React.ReactNode) {
  return render(<MemoryRouter>{node}</MemoryRouter>);
}

const mockClan = clans[0];

describe('ClanCard', () => {
  test('рендерит эмблему клана', () => {
    renderWithRouter(<ClanCard data={mockClan} />);
    const emblem = document.querySelector('.clan-card__emblem-icon');
    expect(emblem?.textContent).toBe(mockClan.emblem);
  });

  test('рендерит название клана', () => {
    renderWithRouter(<ClanCard data={mockClan} />);
    const name = document.querySelector('.clan-card__name');
    expect(name?.textContent).toBe(mockClan.name);
  });

  test('рендерит стихию клана', () => {
    renderWithRouter(<ClanCard data={mockClan} />);
    const el = document.querySelector('.clan-card__element');
    expect(el?.textContent).toContain(mockClan.element);
  });

  test('рендерит территорию клана', () => {
    renderWithRouter(<ClanCard data={mockClan} />);
    const terr = document.querySelector('.clan-card__territory span');
    expect(terr?.textContent).toBe(mockClan.territory);
  });

  test('рендерит описание клана', () => {
    renderWithRouter(<ClanCard data={mockClan} />);
    const desc = document.querySelector('.clan-card__desc');
    expect(desc?.textContent).toContain(mockClan.description.slice(0, 20));
  });
});

describe('ClanGrid', () => {
  test('рендерит все кланы из массива', () => {
    renderWithRouter(<ClanGrid clansData={clans} />);
    const grid = document.querySelector('.clan-grid');
    expect(grid).toBeInTheDocument();
    clans.forEach((clan) => {
      const cards = document.querySelectorAll('.clan-card__name');
      const names = Array.from(cards).map((c) => c.textContent);
      expect(names).toContain(clan.name);
    });
  });

  test('рендерит правильный количество карточек', () => {
    renderWithRouter(<ClanGrid clansData={clans} />);
    const grid = document.querySelector('.clan-grid');
    const cards = grid?.querySelectorAll('.clan-card') || document.querySelectorAll('.clan-card');
    expect(cards.length).toBe(clans.length);
  });

  test('рендерит все стихии', () => {
    renderWithRouter(<ClanGrid clansData={clans} />);
    const elements = document.querySelectorAll('.clan-card__element');
    const texts = Array.from(elements).map((e) => e.textContent);
    clans.forEach((clan) => {
      expect(texts.some((t) => t?.includes(clan.element))).toBe(true);
    });
  });
});

describe('clanEntranceVariants', () => {
  test('имеет состояния hidden и visible', () => {
    expect(clanEntranceVariants.hidden).toBeDefined();
    expect(clanEntranceVariants.visible).toBeDefined();
  });

  test('hidden — opacity 0, y 30, scale 0.96', () => {
    expect(clanEntranceVariants.hidden.opacity).toBe(0);
    expect(clanEntranceVariants.hidden.y).toBe(30);
    expect(clanEntranceVariants.hidden.scale).toBe(0.96);
  });

  test('visible возвращает opacity 1, y 0, scale 1', () => {
    const visible = (clanEntranceVariants.visible as (i: number) => Record<string, unknown>)(0);
    expect(visible.opacity).toBe(1);
    expect(visible.y).toBe(0);
    expect(visible.scale).toBe(1);
  });

  test('visible учитывает index в delay', () => {
    const visible2 = (clanEntranceVariants.visible as (i: number) => Record<string, unknown>)(3);
    expect(visible2.transition.delay).toBeCloseTo(0.3, 10); // 3 * 0.1
  });
});

describe('clanHoverVariants', () => {
  test('имеет состояния hover и tap', () => {
    expect(clanHoverVariants.hover).toBeDefined();
    expect(clanHoverVariants.tap).toBeDefined();
  });

  test('hover поднимает на -4px', () => {
    expect(clanHoverVariants.hover.y).toBe(-4);
  });

  test('tap сбрасывает y в 0', () => {
    expect(clanHoverVariants.tap.y).toBe(0);
  });
});
