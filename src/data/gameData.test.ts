import { describe, expect, test } from 'vitest';
import { clans, devLogs } from './gameData';

describe('clans', () => {
  test('список содержит ровно 6 кланов', () => {
    expect(clans).toHaveLength(6);
  });

  test('все кланы имеют непустые обязательные поля', () => {
    const requiredFields = ['id', 'name', 'emblem', 'element', 'territory'] as const;

    for (const clan of clans) {
      for (const field of requiredFields) {
        expect(clan[field]).toBeDefined();
        expect(String(clan[field]).trim()).not.toBe('');
      }
    }
  });

  test('все кланы имеют уникальные id', () => {
    const ids = clans.map((c) => c.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});

describe('devLogs', () => {
  test('список содержит ровно 4 dev-лога', () => {
    expect(devLogs).toHaveLength(4);
  });

  test('все dev-логи имеют непустые обязательные поля', () => {
    const requiredFields = ['id', 'title', 'date', 'category'] as const;

    for (const log of devLogs) {
      for (const field of requiredFields) {
        expect(log[field]).toBeDefined();
        expect(String(log[field]).trim()).not.toBe('');
      }
    }
  });

  test('dev-логи отсортированы по дате (новые первые)', () => {
    for (let i = 1; i < devLogs.length; i++) {
      expect(new Date(devLogs[i - 1].date) >= new Date(devLogs[i].date)).toBe(true);
    }
  });

  test('все dev-логи имеют уникальные id', () => {
    const ids = devLogs.map((l) => l.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });
});
