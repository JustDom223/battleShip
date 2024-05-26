import { test } from '@jest/globals';
import { GameBoard } from '../src/gameBoard';

test('Test gameboard grid', () => {
    const gameBoard = new GameBoard();
    gameBoard.createGridNodes(10, 10);
    expect(gameBoard.gridNodes).toBe(4);
});
