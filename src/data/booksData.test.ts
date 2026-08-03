import { describe, expect, test } from 'vitest';
import { filterBooks, getPrevNext } from './booksData';

describe('filterBooks', () => {
  test('при арке "Пробуждение" возвращает 2 книги — "Пробуждение Руны" и "Тень Акиара"', () => {
    const result = filterBooks('Пробуждение', '');

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('rune-awakening');
    expect(result[1].id).toBe('akiar-shadow');
  });

  test('при арке "Война" возвращает 3 книги — "Пепел Лариара", "Огонь клана Воль\'гар", "Война Рун"', () => {
    const result = filterBooks('Война', '');

    expect(result).toHaveLength(3);
    expect(result[0].id).toBe('lariar-ashes');
    expect(result[1].id).toBe('clan-fire');
    expect(result[2].id).toBe('rune-war');
  });

  test('при арке "Наследие" возвращает 2 книги — "Последний Страж" и "Сага Сэта"', () => {
    const result = filterBooks('Наследие', '');

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('last-ward');
    expect(result[1].id).toBe('set-saga');
  });

  test('при арке "Все" возвращает все 7 книг', () => {
    const result = filterBooks('Все', '');

    expect(result).toHaveLength(7);
  });

  test('поиск по query "Эран" при арке "Все" возвращает 7 книг', () => {
    const result = filterBooks('Все', 'Эран');

    expect(result).toHaveLength(7);
  });

  test('поиск по query "огонь" при арке "Война" возвращает 1 книгу', () => {
    const result = filterBooks('Война', 'огонь');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('clan-fire');
  });

  test('поиск по несуществующему слову возвращает пустой массив', () => {
    const result = filterBooks('Война', 'zzzне_существует');

    expect(result).toHaveLength(0);
  });
});

describe('getPrevNext', () => {
  test('первая книга не имеет prev, имеет next — "Тень Акиара"', () => {
    const { prev, next } = getPrevNext('rune-awakening');

    expect(prev).toBeNull();
    expect(next).not.toBeNull();
    expect(next!.id).toBe('akiar-shadow');
  });

  test('последняя книга имеет prev — "Последний Страж", не имеет next', () => {
    const { prev, next } = getPrevNext('set-saga');

    expect(prev).not.toBeNull();
    expect(prev!.id).toBe('last-ward');
    expect(next).toBeNull();
  });

  test('средняя книга имеет оба соседних — "Тень Акиара" prev "Пробуждение Руны", next "Пепел Лариара"', () => {
    const { prev, next } = getPrevNext('akiar-shadow');

    expect(prev).not.toBeNull();
    expect(prev!.id).toBe('rune-awakening');
    expect(next).not.toBeNull();
    expect(next!.id).toBe('lariar-ashes');
  });

  test('неизвестный id возвращает null для обоих', () => {
    const { prev, next } = getPrevNext('non-existent');

    expect(prev).toBeNull();
    expect(next).toBeNull();
  });
});
