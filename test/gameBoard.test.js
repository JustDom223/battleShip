import { describe, expect, test } from '@jest/globals';
import { GameBoard } from '../src/gameBoard';
import { Ship } from '../src/shipFactory';

const connectionsNested = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
];
describe('GameBoard', () => {
    let gameBoard;
    beforeEach(() => {
        gameBoard = new GameBoard();
        gameBoard.createGridNodes(10, 10);
        gameBoard.assignEdges(connectionsNested);
    });
    describe('Grid Creation', () => {
        test('should create the correct size based on the inputs', () => {
            expect(gameBoard.gridNodes.length).toBe(100);
        });
        test('should correctly position grid nodes', () => {
            expect(gameBoard.gridNodes[11]).toEqual({
                id: '1,1',
                position: [1, 1],
            });
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
    });

    describe('Edges Assignment', () => {
        test("should assign each node's edges as the 4 nodes next to it", () => {
            const targetEdges = gameBoard.edges.get('4,1');
            expect(targetEdges).toEqual({
                up: '4,2',
                down: '4,0',
                left: '3,1',
                right: '5,1',
            });
        });
        test("should assign each node's edges as the 4 nodes next to it", () => {
            const targetEdges = gameBoard.edges.get('6,5');
            expect(targetEdges).toEqual({
                up: '6,6',
                down: '6,4',
                left: '5,5',
                right: '7,5',
            });
        });
        test("Test that each nodes edges don't go below the node array into minus", () => {
            const targetEdges = gameBoard.edges.get('0,0');
            expect(targetEdges).toEqual({
                up: '0,1',
                down: false,
                left: false,
                right: '1,0',
            });
        });
        test('Test that each nodes edges dont go above the node array past 9', () => {
            const targetEdges = gameBoard.edges.get('9,9');
            expect(targetEdges).toEqual({
                up: false,
                down: '9,8',
                left: '8,9',
                right: false,
            });
        });
        test('Test that a single edge is a string', () => {
            const targetEdges = gameBoard.edges.get('9,9');
            expect(targetEdges.down).toEqual('9,8');
        });
    });

    describe('Ship assignment to nodes', () => {
        test('Test that the game board has a ship assigned to a location', () => {
            gameBoard.placeShip('1,1', new Ship(2));
            const targetNode = gameBoard.gridNodes.find(
                (node) => node.id === '1,1',
            );
            expect(targetNode).toEqual({
                id: '1,1',
                position: [1, 1],
                ship: { size: 2, health: 2, isSunk: false },
            });
        });
        test.each([['5,5', '5,6', '5,7']])(
            'Ship with 3 health is correctly placed across nodes vertically',
            (node1, node2, node3) => {
                const frigate1 = new Ship(3);
                const horizontally = false;
                gameBoard.placeShip(
                    node1,
                    frigate1,
                    frigate1.size,
                    horizontally,
                );

                const targetNode1 = gameBoard.gridNodes.find(
                    (node) => node.id === node1,
                );
                expect(targetNode1).toEqual({
                    id: node1,
                    position: [5, 5],
                    ship: { size: 3, health: 3, isSunk: false },
                });
                const targetNode2 = gameBoard.gridNodes.find(
                    (node) => node.id === node2,
                );
                expect(targetNode2).toEqual({
                    id: node2,
                    position: [5, 6],
                    ship: { size: 3, health: 3, isSunk: false },
                });
                const targetNode3 = gameBoard.gridNodes.find(
                    (node) => node.id === node3,
                );
                expect(targetNode3).toEqual({
                    id: node3,
                    position: [5, 7],
                    ship: { size: 3, health: 3, isSunk: false },
                });
            },
        );
        test.each([['5,5', '6,5', '7,5']])(
            'Ship with 3 health is correctly placed across nodes horizontally',
            (node1, node2, node3) => {
                const frigate1 = new Ship(3);
                const horizontally = true;
                gameBoard.placeShip(
                    node1,
                    frigate1,
                    frigate1.size,
                    horizontally,
                );
                const targetNode1 = gameBoard.gridNodes.find(
                    (node) => node.id === node1,
                );
                expect(targetNode1).toEqual({
                    id: node1,
                    position: [5, 5],
                    ship: { size: 3, health: 3, isSunk: false },
                });
                const targetNode2 = gameBoard.gridNodes.find(
                    (node) => node.id === node2,
                );
                expect(targetNode2).toEqual({
                    id: node2,
                    position: [6, 5],
                    ship: { size: 3, health: 3, isSunk: false },
                });
                const targetNode3 = gameBoard.gridNodes.find(
                    (node) => node.id === node3,
                );
                expect(targetNode3).toEqual({
                    id: node3,
                    position: [7, 5],
                    ship: { size: 3, health: 3, isSunk: false },
                });
            },
        );
    });
    describe('Test an assigned ship can be sunk', () => {
        test.each([['4,1', '4,2', '4,3', '4,4']])(
            'Test that the game board has a sunk ship assigned to a location verifying change in ship state',
            (node1, node2, node3, node4) => {
                const battleShip = new Ship(4);
                const targetNode1 = gameBoard.gridNodes.find(
                    (node) => node.id === node1,
                );
                gameBoard.placeShip('4,1', battleShip, battleShip.size);
                targetNode1.ship.hit();
                expect(targetNode1).toEqual({
                    id: node1,
                    position: [4, 1],
                    ship: { size: 4, health: 3, isSunk: false },
                });
                const targetNode2 = gameBoard.gridNodes.find(
                    (node) => node.id === node2,
                );
                targetNode2.ship.hit();
                expect(targetNode2).toEqual({
                    id: node2,
                    position: [4, 2],
                    ship: { size: 4, health: 2, isSunk: false },
                });
                const targetNode3 = gameBoard.gridNodes.find(
                    (node) => node.id === node3,
                );
                targetNode3.ship.hit();
                expect(targetNode3).toEqual({
                    id: node3,
                    position: [4, 3],
                    ship: { size: 4, health: 1, isSunk: false },
                });
                const targetNode4 = gameBoard.gridNodes.find(
                    (node) => node.id === node4,
                );
                targetNode4.ship.hit();
                expect(targetNode4).toEqual({
                    id: node4,
                    position: [4, 4],
                    ship: { size: 4, health: 0, isSunk: true },
                });
            },
        );
    });
});
// Ship assignment tests
