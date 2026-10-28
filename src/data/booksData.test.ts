import { describe, expect, test } from 'vitest';
import { filterBooks, getPrevNext } from './booksData';

describe('filterBooks', () => {
  test('без query возвращает все 4 книги', () => {
    const result = filterBooks('');

    expect(result).toHaveLength(4);
  });

  test('поиск "Сэт" возвращает 4 книги', () => {
    const result = filterBooks('Сэт');

    expect(result).toHaveLength(4);
  });

  test('поиск "Неговорин" возвращает 2 книги — Врождение и Эх прошлого', () => {
    const result = filterBooks('Неговорин');

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('set-awakening');
    expect(result[1].id).toBe('set-echo-past');
  });

  test('поиск "АлКесу" возвращает 1 книгу', () => {
    const result = filterBooks('АлКесу');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('set-alkesu');
  });

  test('поиск "Нуан" возвращает 1 книгу — Чужая судьба', () => {
    const result = filterBooks('Нуан');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('set-stranger-fate');
  });

  test('поиск "Аркрад" возвращает 2 книги — Эх прошлого и АлКесу', () => {
    const result = filterBooks('Аркрад');

    expect(result).toHaveLength(2);
  });

  test('поиск по несуществующему слову возвращает пустой массив', () => {
    const result = filterBooks('zzzне_существует');

    expect(result).toHaveLength(0);
  });
});

describe('getPrevNext', () => {
  test('первая книга не имеет prev, имеет next — "Чужая судьба"', () => {
    const { prev, next } = getPrevNext('set-awakening');

    expect(prev).toBeNull();
    expect(next).not.toBeNull();
    expect(next!.id).toBe('set-stranger-fate');
  });

  test('последняя книга имеет prev — "Эх прошлого", не имеет next', () => {
    const { prev, next } = getPrevNext('set-alkesu');

    expect(prev).not.toBeNull();
    expect(prev!.id).toBe('set-echo-past');
    expect(next).toBeNull();
  });

  test('средняя книга имеет обоих соседей', () => {
    const { prev, next } = getPrevNext('set-stranger-fate');

    expect(prev).not.toBeNull();
    expect(prev!.id).toBe('set-awakening');
    expect(next).not.toBeNull();
    expect(next!.id).toBe('set-echo-past');
  });

  test('неизвестный id возвращает null для обоих', () => {
    const { prev, next } = getPrevNext('non-existent');

    expect(prev).toBeNull();
    expect(next).toBeNull();
  });
});
