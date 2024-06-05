import { test } from '@jest/globals';
import { GameBoard } from '../src/gameBoard';
import { Ship } from '../src/shipFactory';

const gameBoard = new GameBoard();
gameBoard.createGridNodes(10, 10);
const connections = ['-1,0', '1,0', '0,-1', '0,1'];
const connectionsNested = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];
gameBoard.assignEdges(connectionsNested);

test('Test game board grid created the correct size based on the inputs', () => {
    expect(gameBoard.gridNodes.length).toBe(100);
});
test('Test game board grid position', () => {
    expect(gameBoard.gridNodes[11]).toEqual({ id: '1,1', position: [1, 1] });
});
test('Test node id is a string', () => {
    expect(gameBoard.gridNodes[11].id).toEqual('1,1');
});

test('Test that getNodes function returns an Array', () => {
    const result = gameBoard.getNodes();
    expect(result instanceof Array).toBe(true);
});
test('Test that getNodes function returns a Map', () => {
    const result = gameBoard.getEdges();
    expect(result instanceof Map).toBe(true);
});

test('Test that each nodes edges are assigned as the 4 nodes next to it', () => {
    const targetEdges = gameBoard.edges.get('4,1');
    expect(targetEdges).toEqual(['3,1', '5,1', '4,0', '4,2']);
});

test('Test that each nodes edges dont go below the node array into minus', () => {
    const targetEdges = gameBoard.edges.get('0,0');
    expect(targetEdges).toEqual(['1,0', '0,1']);
});
test('Test that each nodes edges dont go above the node array past 9', () => {
    const targetEdges = gameBoard.edges.get('9,9');
    expect(targetEdges).toEqual(['8,9', '9,8']);
});
test('Test that a single edge is a string', () => {
    const targetEdges = gameBoard.edges.get('9,9');
    expect(targetEdges[0]).toEqual('8,9');
});

// Ship assignment tests

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
    const tinny = new Ship(4);
    gameBoard.placeShip('4,1', tinny);
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

test('Test that the game board has a ship assigned to 2 locations when a ship with 2 health ', () => {
    const frigate1 = new Ship(3);
    gameBoard.placeShip('5,5', frigate1, frigate1.size);
    // gameBoard.placeShip('5,6', frigate1);
    const targetNode = gameBoard.gridNodes.find((node) => node.id === '5,5');
    expect(targetNode).toEqual({
        id: '5,5',
        position: [5, 5],
        ship: { size: 3, health: 3, isSunk: false },
    });
    const targetNode2 = gameBoard.gridNodes.find((node) => node.id === '5,6');
    expect(targetNode2).toEqual({
        id: '5,6',
        position: [5, 6],
        ship: { size: 3, health: 3, isSunk: false },
    });
    const targetNode3 = gameBoard.gridNodes.find((node) => node.id === '5,7');
    expect(targetNode3).toEqual({
        id: '5,7',
        position: [5, 7],
        ship: { size: 3, health: 3, isSunk: false },
    });
});
