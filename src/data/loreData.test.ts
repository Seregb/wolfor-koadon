import { describe, expect, test } from 'vitest';
import { categories } from './loreData';

describe('categories', () => {
  test('список содержит ровно 8 категорий лора', () => {
    expect(categories).toHaveLength(8);
  });

  test('все категории имеют непустые обязательные поля', () => {
    const requiredFields = ['id', 'title', 'subtitle', 'description', 'icon', 'count'] as const;

    for (const cat of categories) {
      for (const field of requiredFields) {
        expect(cat[field]).toBeDefined();
        expect(String(cat[field]).trim()).not.toBe('');
      }
    }
  });

  test('все categories имеют уникальные id', () => {
    const ids = categories.map((c) => c.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  test('все count > 0', () => {
    for (const cat of categories) {
      expect(cat.count).toBeGreaterThan(0);
    }
  });
});
