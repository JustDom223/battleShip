import { beforeEach, describe, expect, test } from '@jest/globals';
import { Player } from '../src/playerFactory';

describe('Player', () => {
    let player1;

    beforeEach(() => {
        player1 = new Player('Dominic');
    });

    describe('Player Creation', () => {
        test('should have the name "Dominic"', () => {
            expect(player1.name).toBe('Dominic');
        });

        test('should have ships as an array', () => {
            expect(player1.ships).toBeInstanceOf(Array);
        });

        test('should contain 5 ships required for the game', () => {
            expect(player1.ships.length).toBe(5);
        });

        test('should have a health of 17', () => {
            expect(player1.playerHealth).toBe(17);
        });
    });

    describe('Player status changes', () => {
        let destroyerShip;

        beforeEach(() => {
            destroyerShip = player1.ships.find(
                (ship) => ship.type === 'Destroyer',
            );
        });

        test('should reduce health to 16 when a ship is hit once', () => {
            destroyerShip.hit();
            player1.remainingHealth();
            expect(player1.playerHealth).toBe(16);
        });

        test('should reduce health to 15 when a ship is hit twice', () => {
            destroyerShip.hit();
            destroyerShip.hit();
            player1.remainingHealth();
            expect(player1.playerHealth).toBe(15);
        });

        test('should have a default ship count of 5', () => {
            expect(player1.shipCount).toBe(5);
        });

        test('should reduce ship count by 1 when a ship is sunk', () => {
            destroyerShip.hit();
            destroyerShip.hit();
            player1.remainingShips();
            expect(player1.shipCount).toBe(4);
        });
    });
});
