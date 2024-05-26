import { test } from '@jest/globals';
import { Ship } from '../src/shipFactory';

test('Test hit to reduce health', () => {
    const ship5Health = new Ship(5);
    ship5Health.hit();
    expect(ship5Health.health).toBe(4);
});

test('Ship: Health Reduced to 0 causing it to sink', () => {
    const ship5Health = new Ship(5);
    // while (!ship5Health.isSunk) {
    //     ship5Health.hit();
    // }
    ship5Health.hit();
    ship5Health.hit();
    ship5Health.hit();
    ship5Health.hit();
    ship5Health.hit();

    expect(ship5Health.isSunk).toBe(true);
});
