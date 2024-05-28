import { test } from '@jest/globals';
import { Ship } from '../src/shipFactory';

test.skip('Test hit to reduce health from 5 => 4', () => {
    const ship5Health = new Ship(5);
    ship5Health.hit();
    expect(ship5Health.health).toBe(4);
});

test.skip('Ship: Health Reduced to 0 causing it to sink', () => {
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
