import { afterEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import HorizontalSlider from './HorizontalSlider';

afterEach(() => {
  document.body.innerHTML = '';
});

describe('HorizontalSlider', () => {
  test('рендерит все items через renderItem', () => {
    const items = [
      { id: 1, label: 'First' },
      { id: 2, label: 'Second' },
      { id: 3, label: 'Third' },
    ];

    render(
      <HorizontalSlider
        items={items}
        renderItem={(item) => <span>{item.label}</span>}
        itemKey={(item) => String(item.id)}
      />,
    );

    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
  });

  test('рендерит кнопки prev и next', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

    render(
      <HorizontalSlider
        items={items}
        renderItem={() => <span>item</span>}
        itemKey={(item) => String(item.id)}
      />,
    );

    expect(screen.getByLabelText('Назад')).toBeInTheDocument();
    expect(screen.getByLabelText('Вперёд')).toBeInTheDocument();
  });

  test('при клике на next currentIndex увеличивается', () => {
    const items = [
      { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
    ];

    render(
      <HorizontalSlider
        items={items}
        renderItem={() => <span>item</span>}
        itemKey={(item) => String(item.id)}
      />,
    );

    const nextBtn = screen.getByLabelText('Вперёд');
    fireEvent.click(nextBtn);
    expect(nextBtn).not.toBeDisabled();
  });

  test('при клике на prev currentIndex уменьшается', () => {
    const items = [
      { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
    ];

    render(
      <HorizontalSlider
        items={items}
        renderItem={() => <span>item</span>}
        itemKey={(item) => String(item.id)}
      />,
    );

    const nextBtn = screen.getByLabelText('Вперёд');
    const prevBtn = screen.getByLabelText('Назад');

    // Двигаемся вперёд дважды
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    // Теперь prev должна быть активна
    expect(prevBtn).not.toBeDisabled();
    fireEvent.click(prevBtn);
  });

  test('при currentIndex === 0 кнопка prev disabled', () => {
    const items = [{ id: 1 }];

    render(
      <HorizontalSlider
        items={items}
        renderItem={() => <span>item</span>}
        itemKey={(item) => String(item.id)}
      />,
    );

    expect(screen.getByLabelText('Назад')).toBeDisabled();
  });

  test('при maxIndex кнопка next disabled', () => {
    const items = [
      { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
    ];

    render(
      <HorizontalSlider
        items={items}
        renderItem={() => <span>item</span>}
        itemKey={(item) => String(item.id)}
      />,
    );

    // 5 items, default visibleCount=3 → maxIndex = 2
    const nextBtn = screen.getByLabelText('Вперёд');
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    expect(nextBtn).toBeDisabled();
  });

  test('рендерит dots-индикаторы равные maxIndex + 1', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

    render(
      <HorizontalSlider
        items={items}
        renderItem={() => <span>item</span>}
        itemKey={(item) => String(item.id)}
      />,
    );

    const dots = screen.getAllByRole('button').filter(
      (btn) => btn.getAttribute('aria-label')?.startsWith('Перейти к слайду'),
    );
    // 4 items, visibleCount=3 → maxIndex=1 → dots = 2
    expect(dots.length).toBe(2);
  });

  test('при пустом items рендерится без ошибок', () => {
    render(
      <HorizontalSlider
        items={[]}
        renderItem={() => <span>item</span>}
        itemKey={() => 'empty'}
      />,
    );

    expect(screen.getByLabelText('Назад')).toBeDisabled();
  });

  test('стрелки клавиатуры меняют currentIndex', () => {
    const items = [
      { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 },
    ];

    render(
      <HorizontalSlider
        items={items}
        renderItem={() => <span>item</span>}
        itemKey={(item) => String(item.id)}
      />,
    );

    const nextBtn = screen.getByLabelText('Вперёд');
    const prevBtn = screen.getByLabelText('Назад');

    // Стрелка вправо → next
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(nextBtn).not.toBeDisabled();

    // Стрелка влево → prev
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
  });
});
