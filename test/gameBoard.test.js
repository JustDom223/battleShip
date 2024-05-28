import { test } from '@jest/globals';
import { GameBoard } from '../src/gameBoard';
import { Ship } from '../src/shipFactory';

const gameBoard = new GameBoard();
gameBoard.createGridNodes(10, 10);
gameBoard.placeShip('4,1', new Ship(4));

test('Test game board grid created the correct size based on the inputs', () => {
    expect(gameBoard.gridNodes.length).toBe(100);
});
test('Test game board grid position', () => {
    expect(gameBoard.gridNodes[11]).toEqual({ id: '1,1', position: [1, 1] });
});

test('Test that getNodes function returns an Array', () => {
    const result = gameBoard.getNodes();
    expect(result instanceof Array).toBe(true);
});
test('Test that getNodes function returns a Map', () => {
    const result = gameBoard.getEdges();
    expect(result instanceof Map).toBe(true);
});

test('Test that the game board has a ship assigned to a location', () => {
    gameBoard.placeShip('1,1', new Ship(2));
    const targetNode = gameBoard.gridNodes.find((node) => node.id === '1,1');
    expect(targetNode).toEqual({
        id: '1,1',
        position: [1, 1],
        ship: { size: 2, health: 2, isSunk: false },
    });
});

test('Test that the game board has a sunk ship assigned to a location verifying change in ship state', () => {
    const targetNode = gameBoard.gridNodes.find((node) => node.id === '4,1');
    targetNode.ship.hit();
    targetNode.ship.hit();
    targetNode.ship.hit();
    targetNode.ship.hit();
    expect(targetNode).toEqual({
        id: '4,1',
        position: [4, 1],
        ship: { size: 4, health: 0, isSunk: true },
    });
});
test('Test that if a ship is assigned to a location, the edges are linked to it', () => {
    const targetEdges = gameBoard.edges.get('4,1');
    expect(targetEdges).toEqual(['4,2', '4,3']);
});
