import { describe, expect, test } from '@jest/globals';
import { GameBoard } from '../src/GameBoard';
import { Ship } from '../src/Ship';
import { Player } from '../src/Player';

const connectionsNested = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
];
describe('Game loop', () => {
    let gameBoard, player1;
    beforeEach(() => {
        player1 = new Player('Dominic');
        gameBoard = new GameBoard();
        gameBoard.createGridNodes(10, 10);
        gameBoard.assignEdges(connectionsNested);
        player1.ships.forEach((ship) => {
            gameBoard.placeShipRandomly(ship);
        });
    });
    describe('Test functions with that attack or place randomly', () => {
        test('Check that all ships have been assigned', () => {
            expect(player1.ships[0].checkIfAssigned()).toBe(true);
            expect(player1.ships[1].checkIfAssigned()).toBe(true);
            expect(player1.ships[2].checkIfAssigned()).toBe(true);
            expect(player1.ships[3].checkIfAssigned()).toBe(true);
            expect(player1.ships[4].checkIfAssigned()).toBe(true);
        });
        test('Check that attackRandom picks a random location', () => {
            gameBoard.attackRandom();

            expect(gameBoard.renderBoard(true)).toBe(true);
        });
    });
});
