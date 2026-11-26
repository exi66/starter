import { describe, expect, it } from 'vitest';
import en from '@/messages/en.json';
import ru from '@/messages/ru.json';

/** All leaf keys as dotted paths. */
const keys = (o: object, prefix = ''): string[] =>
  Object.entries(o).flatMap(([k, v]) =>
    v && typeof v === 'object' ? keys(v as object, `${prefix}${k}.`) : [`${prefix}${k}`],
  );

describe('messages', () => {
  it('every language has the same keys as ru (the source language)', () => {
    expect(keys(en).sort()).toEqual(keys(ru).sort());
  });
});
