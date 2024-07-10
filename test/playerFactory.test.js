import { beforeEach, describe, expect, test } from '@jest/globals';
import { Player } from '../src/playerFactory';

describe('Player', () => {
    let player1;
    beforeEach(() => {
        player1 = new Player('Dominic');
    });
    describe('Player Creation', () => {
        test('Players name should be Dominic', () => {
            expect(player1.name).toBe('Dominic');
        });
        test('Players ships to be an array', () => {
            const result = player1.ships;
            expect(result instanceof Array).toBe(true);
        });
        test('Players ships to be an array', () => {
            const result = player1.ships;
            expect(result instanceof Array).toBe(true);
        });
    });
});
