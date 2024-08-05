import { describe, test } from '@jest/globals';
import { Ship } from '../src/Ship';
import { GameBoard } from '../src/GameBoard';
const connectionsNested = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
];
describe('Ship functions', () => {
    let carrier, gameBoard;
    beforeEach(() => {
        carrier = new Ship('Carrier', 5);
        gameBoard = new GameBoard();
        gameBoard.createGridNodes(10, 10);
        gameBoard.assignEdges(connectionsNested);
    });
    describe('Checking that the hit function is working correctly', () => {
        test('Hit to reduce health from 5 => 4', () => {
            carrier.hit();
            expect(carrier.health).toBe(4);
        });
        test('Health Reduced to 0 causing it to sink', () => {
            // while (!carrier.isSunk) {
            //     carrier.hit();
            // }
            carrier.hit();
            carrier.hit();
            carrier.hit();
            carrier.hit();
            carrier.hit();

            expect(carrier.isSunk).toBe(true);
        });
    });
    describe('Test the assignment of ship', () => {
        test('The ship has NOT been assigned so should return True', () => {
            expect(carrier.checkIfAssigned()).toBe(false);
        });
        test('The ship HAS been assigned so should return True', () => {
            gameBoard.placeShipRandomly(carrier);
            expect(carrier.checkIfAssigned()).toBe(true);
        });
    });
});
