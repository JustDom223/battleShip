import { test } from '@jest/globals';
import { Ship } from '../src/shipFactory';

test('Return 5', () => {
    expect(Ship()).toBe(5);
});
