import { describe, expect, test } from '@jest/globals';
import { GameBoard } from '../src/GameBoard';
import { Ship } from '../src/Ship';

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
                targeted: false,
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
            gameBoard.placeShip('1,1', new Ship('Destroyer', 2));
            const targetNode = gameBoard.gridNodes.find(
                (node) => node.id === '1,1',
            );
            expect(targetNode).toEqual({
                id: '1,1',
                position: [1, 1],
                ship: {
                    type: 'Destroyer',
                    size: 2,
                    health: 2,
                    isSunk: false,
                    coordinates: expect.any(Set),
                },
                targeted: false,
            });
            expect(Array.from(targetNode.ship.coordinates)).toEqual([
                '1,1',
                '1,2',
            ]);
        });
        //testing that a ship will be assigned to locations vertically
        test.each([['5,5', '5,6', '5,7']])(
            'Ship with 3 health is correctly placed across nodes vertically',
            (node1, node2, node3) => {
                const frigate1 = new Ship('Cruiser', 3);
                const direction = 'up';
                gameBoard.placeShip(node1, frigate1, direction);

                const targetNode1 = gameBoard.gridNodes.find(
                    (node) => node.id === node1,
                );
                expect(targetNode1).toEqual({
                    id: node1,
                    position: [5, 5],
                    ship: {
                        type: 'Cruiser',
                        size: 3,
                        health: 3,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode1.ship.coordinates)).toEqual([
                    '5,5',
                    '5,6',
                    '5,7',
                ]);
                const targetNode2 = gameBoard.gridNodes.find(
                    (node) => node.id === node2,
                );
                expect(targetNode2).toEqual({
                    id: node2,
                    position: [5, 6],
                    ship: {
                        type: 'Cruiser',
                        size: 3,
                        health: 3,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode2.ship.coordinates)).toEqual([
                    '5,5',
                    '5,6',
                    '5,7',
                ]);
                const targetNode3 = gameBoard.gridNodes.find(
                    (node) => node.id === node3,
                );
                expect(targetNode3).toEqual({
                    id: node3,
                    position: [5, 7],
                    ship: {
                        type: 'Cruiser',
                        size: 3,
                        health: 3,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode3.ship.coordinates)).toEqual([
                    '5,5',
                    '5,6',
                    '5,7',
                ]);
            },
        );
        //testing that a ship will be assigned to locations horizontally
        test.each([['5,5', '6,5', '7,5']])(
            'Ship with 3 health is correctly placed across nodes horizontally',
            (node1, node2, node3) => {
                const frigate1 = new Ship('Cruiser', 3);
                const direction = 'right';
                gameBoard.placeShip(node1, frigate1, direction, node1);
                const targetNode1 = gameBoard.gridNodes.find(
                    (node) => node.id === node1,
                );
                expect(targetNode1).toEqual({
                    id: node1,
                    position: [5, 5],
                    ship: {
                        type: 'Cruiser',
                        size: 3,
                        health: 3,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode1.ship.coordinates)).toEqual([
                    '5,5',
                    '6,5',
                    '7,5',
                ]);
                const targetNode2 = gameBoard.gridNodes.find(
                    (node) => node.id === node2,
                );
                expect(targetNode2).toEqual({
                    id: node2,
                    position: [6, 5],
                    ship: {
                        type: 'Cruiser',
                        size: 3,
                        health: 3,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode2.ship.coordinates)).toEqual([
                    '5,5',
                    '6,5',
                    '7,5',
                ]);
                const targetNode3 = gameBoard.gridNodes.find(
                    (node) => node.id === node3,
                );
                expect(targetNode3).toEqual({
                    id: node3,
                    position: [7, 5],
                    ship: {
                        type: 'Cruiser',
                        size: 3,
                        health: 3,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode3.ship.coordinates)).toEqual([
                    '5,5',
                    '6,5',
                    '7,5',
                ]);
            },
        );
        //Vertically: testing that a ship will be assigned to the edge of a board without causing errors
        test.each([['9,9', '9,8', '9,7']])(
            'Ship with 3 health is correctly placed if it is placed on the edge and goes over',
            (node1, node2, node3) => {
                const frigate1 = new Ship('Cruiser', 3);
                const direction = 'up';
                gameBoard.placeShip(node1, frigate1, direction);

                const targetNode1 = gameBoard.gridNodes.find(
                    (node) => node.id === node1,
                );
                expect(targetNode1).toEqual({
                    id: node1,
                    position: [9, 9],
                    ship: {
                        type: 'Cruiser',
                        size: 3,
                        health: 3,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode1.ship.coordinates)).toEqual([
                    '9,9',
                    '9,8',
                    '9,7',
                ]);
                const targetNode2 = gameBoard.gridNodes.find(
                    (node) => node.id === node2,
                );
                expect(targetNode2).toEqual({
                    id: node2,
                    position: [9, 8],
                    ship: {
                        type: 'Cruiser',
                        size: 3,
                        health: 3,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode2.ship.coordinates)).toEqual([
                    '9,9',
                    '9,8',
                    '9,7',
                ]);
                const targetNode3 = gameBoard.gridNodes.find(
                    (node) => node.id === node3,
                );
                expect(targetNode3).toEqual({
                    id: node3,
                    position: [9, 7],
                    ship: {
                        type: 'Cruiser',
                        size: 3,
                        health: 3,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode3.ship.coordinates)).toEqual([
                    '9,9',
                    '9,8',
                    '9,7',
                ]);
            },
        );
        //Horizontally: testing that a ship will be assigned to the edge of a board without causing errors
        test.each([['9,9', '8,9', '7,9']])(
            'Ship with 3 health is correctly placed if it is placed on the edge and goes over',
            (node1, node2, node3) => {
                const frigate1 = new Ship('Cruiser', 3);
                const direction = 'right';
                gameBoard.placeShip(node1, frigate1, direction);

                const targetNode1 = gameBoard.gridNodes.find(
                    (node) => node.id === node1,
                );
                expect(targetNode1).toEqual({
                    id: node1,
                    position: [9, 9],
                    ship: {
                        type: 'Cruiser',
                        size: 3,
                        health: 3,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode1.ship.coordinates)).toEqual([
                    '9,9',
                    '8,9',
                    '7,9',
                ]);
                const targetNode2 = gameBoard.gridNodes.find(
                    (node) => node.id === node2,
                );
                expect(targetNode2).toEqual({
                    id: node2,
                    position: [8, 9],
                    ship: {
                        type: 'Cruiser',
                        size: 3,
                        health: 3,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode2.ship.coordinates)).toEqual([
                    '9,9',
                    '8,9',
                    '7,9',
                ]);
                const targetNode3 = gameBoard.gridNodes.find(
                    (node) => node.id === node3,
                );
                expect(targetNode3).toEqual({
                    id: node3,
                    position: [7, 9],
                    ship: {
                        type: 'Cruiser',
                        size: 3,
                        health: 3,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode3.ship.coordinates)).toEqual([
                    '9,9',
                    '8,9',
                    '7,9',
                ]);
            },
        );
        //Vertically: testing that a ship can be assigned NEAR the edge and it will double back
        test.each([['9,8', '9,9', '9,7', '9,6', '9,5', '9,4']])(
            'Ship with 6 health is correctly placed if it is placed NEAR the edge and goes over and has to double back',
            (node1, node2, node3, node4, node5, node6) => {
                const frigate1 = new Ship('Carrier', 6);
                const direction = 'up';
                gameBoard.placeShip(node1, frigate1, direction);

                const targetNode1 = gameBoard.gridNodes.find(
                    (node) => node.id === node1,
                );
                expect(targetNode1).toEqual({
                    id: node1,
                    position: [9, 8],
                    ship: {
                        type: 'Carrier',
                        size: 6,
                        health: 6,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode1.ship.coordinates)).toEqual([
                    '9,8',
                    '9,9',
                    '9,7',
                    '9,6',
                    '9,5',
                    '9,4',
                ]);
                const targetNode2 = gameBoard.gridNodes.find(
                    (node) => node.id === node2,
                );
                expect(targetNode2).toEqual({
                    id: node2,
                    position: [9, 9],
                    ship: {
                        type: 'Carrier',
                        size: 6,
                        health: 6,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode2.ship.coordinates)).toEqual([
                    '9,8',
                    '9,9',
                    '9,7',
                    '9,6',
                    '9,5',
                    '9,4',
                ]);
                const targetNode3 = gameBoard.gridNodes.find(
                    (node) => node.id === node3,
                );
                expect(targetNode3).toEqual({
                    id: node3,
                    position: [9, 7],
                    ship: {
                        type: 'Carrier',
                        size: 6,
                        health: 6,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode3.ship.coordinates)).toEqual([
                    '9,8',
                    '9,9',
                    '9,7',
                    '9,6',
                    '9,5',
                    '9,4',
                ]);
                const targetNode4 = gameBoard.gridNodes.find(
                    (node) => node.id === node4,
                );
                expect(targetNode4).toEqual({
                    id: node4,
                    position: [9, 6],
                    ship: {
                        type: 'Carrier',
                        size: 6,
                        health: 6,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode4.ship.coordinates)).toEqual([
                    '9,8',
                    '9,9',
                    '9,7',
                    '9,6',
                    '9,5',
                    '9,4',
                ]);
                const targetNode5 = gameBoard.gridNodes.find(
                    (node) => node.id === node5,
                );
                expect(targetNode5).toEqual({
                    id: node5,
                    position: [9, 5],
                    ship: {
                        type: 'Carrier',
                        size: 6,
                        health: 6,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });

                expect(Array.from(targetNode5.ship.coordinates)).toEqual([
                    '9,8',
                    '9,9',
                    '9,7',
                    '9,6',
                    '9,5',
                    '9,4',
                ]);
                const targetNode6 = gameBoard.gridNodes.find(
                    (node) => node.id === node6,
                );
                expect(targetNode6).toEqual({
                    id: node6,
                    position: [9, 4],
                    ship: {
                        type: 'Carrier',
                        size: 6,
                        health: 6,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode6.ship.coordinates)).toEqual([
                    '9,8',
                    '9,9',
                    '9,7',
                    '9,6',
                    '9,5',
                    '9,4',
                ]);
            },
        );
        //Horizontally: testing that a ship can be assigned NEAR the edge and it will double back
        test.each([['9,8', '8,8', '7,8', '6,8', '5,8', '4,8']])(
            'Ship with 6 health is correctly placed if it is placed NEAR the edge and goes over and has to double back',
            (node1, node2, node3, node4, node5, node6) => {
                const frigate1 = new Ship('Carrier', 6);
                const direction = 'right';
                gameBoard.placeShip(node1, frigate1, direction);

                const targetNode1 = gameBoard.gridNodes.find(
                    (node) => node.id === node1,
                );
                expect(targetNode1).toEqual({
                    id: node1,
                    position: [9, 8],
                    ship: {
                        type: 'Carrier',
                        size: 6,
                        health: 6,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode1.ship.coordinates)).toEqual([
                    '9,8',
                    '8,8',
                    '7,8',
                    '6,8',
                    '5,8',
                    '4,8',
                ]);
                const targetNode2 = gameBoard.gridNodes.find(
                    (node) => node.id === node2,
                );
                expect(targetNode2).toEqual({
                    id: node2,
                    position: [8, 8],
                    ship: {
                        type: 'Carrier',
                        size: 6,
                        health: 6,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode2.ship.coordinates)).toEqual([
                    '9,8',
                    '8,8',
                    '7,8',
                    '6,8',
                    '5,8',
                    '4,8',
                ]);
                const targetNode3 = gameBoard.gridNodes.find(
                    (node) => node.id === node3,
                );
                expect(targetNode3).toEqual({
                    id: node3,
                    position: [7, 8],
                    ship: {
                        type: 'Carrier',
                        size: 6,
                        health: 6,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode3.ship.coordinates)).toEqual([
                    '9,8',
                    '8,8',
                    '7,8',
                    '6,8',
                    '5,8',
                    '4,8',
                ]);
                const targetNode4 = gameBoard.gridNodes.find(
                    (node) => node.id === node4,
                );
                expect(targetNode4).toEqual({
                    id: node4,
                    position: [6, 8],
                    ship: {
                        type: 'Carrier',
                        size: 6,
                        health: 6,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode4.ship.coordinates)).toEqual([
                    '9,8',
                    '8,8',
                    '7,8',
                    '6,8',
                    '5,8',
                    '4,8',
                ]);
                const targetNode5 = gameBoard.gridNodes.find(
                    (node) => node.id === node5,
                );
                expect(targetNode5).toEqual({
                    id: node5,
                    position: [5, 8],
                    ship: {
                        type: 'Carrier',
                        size: 6,
                        health: 6,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });

                expect(Array.from(targetNode5.ship.coordinates)).toEqual([
                    '9,8',
                    '8,8',
                    '7,8',
                    '6,8',
                    '5,8',
                    '4,8',
                ]);
                const targetNode6 = gameBoard.gridNodes.find(
                    (node) => node.id === node6,
                );
                expect(targetNode6).toEqual({
                    id: node6,
                    position: [4, 8],
                    ship: {
                        type: 'Carrier',
                        size: 6,
                        health: 6,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode6.ship.coordinates)).toEqual([
                    '9,8',
                    '8,8',
                    '7,8',
                    '6,8',
                    '5,8',
                    '4,8',
                ]);
            },
        );

        //Checking coordinates are free for ship assignment
        test('Check coordinate does not have a ship assigned', () => {
            expect(gameBoard.checkCoordinate('5,5')).toEqual(false);
        });
        test('Check coordinate does have a ship assigned', () => {
            const frig1 = new Ship('Destroyer', 2);
            gameBoard.placeShip('5,5', frig1);
            expect(gameBoard.checkCoordinate('5,5')).toEqual(true);
        });
        test('Check coordinate does have a ship assigned', () => {
            const frig1 = new Ship('Destroyer', 2);
            gameBoard.placeShip('5,5', frig1);
            expect(gameBoard.checkCoordinate('5,5')).toEqual(true);
            expect(gameBoard.checkCoordinate('5,6')).toEqual(true);
            expect(gameBoard.checkCoordinate('5,4')).toEqual(false);
            expect(gameBoard.checkCoordinate('4,5')).toEqual(false);
            expect(gameBoard.checkCoordinate('6,5')).toEqual(false);
        });
        test('Check that checkCoordinatesForPlacement will return false if there is an assigned ship in the way', () => {
            const frig1 = new Ship('Destroyer', 2);
            const direction = 'up';
            gameBoard.placeShip('5,6', frig1, direction);
            expect(
                gameBoard.checkCoordinatesForPlacement(
                    '5,5',
                    frig1.size,
                    direction,
                ),
            ).toEqual(false);
        });
        test('Check that checkCoordinatesForPlacement will return true if there is NO assigned ship in the way', () => {
            const frig1 = new Ship('Destroyer', 2);
            const direction = 'up';
            expect(
                gameBoard.checkCoordinatesForPlacement(
                    '5,5',
                    frig1.size,
                    direction,
                ),
            ).toEqual(true);
        });
        test('Check that checkAndPlace places a ship when there is a free spot', () => {
            const frig1 = new Ship('Destroyer', 2);
            const direction = 'up';
            expect(gameBoard.checkAndPlace('5,5', frig1, direction)).toEqual(
                true,
            );
        });
        test('Check that checkAndPlace throws an error if there is already a ship in position', () => {
            const frig1 = new Ship('Destroyer', 2);
            const frig2 = new Ship('Destroyer', 2);
            const direction = 'up';
            gameBoard.placeShip('4,5', frig1, 'right');
            expect(() => {
                gameBoard.checkAndPlace('5,5', frig2, direction);
            }).toThrowError('Sorry the location already has a ship assigned');
        });
    });
    // Ship assignment tests
    describe('Test that an assigned ship can be sunk', () => {
        test.each([['4,1', '4,2', '4,3', '4,4']])(
            'Test that the game board has a sunk ship assigned to a location verifying change in ship state',
            (node1, node2, node3, node4) => {
                const battleShip = new Ship('Battleship', 4);
                const direction = 'up';
                const targetNode1 = gameBoard.gridNodes.find(
                    (node) => node.id === node1,
                );
                gameBoard.placeShip('4,1', battleShip);
                targetNode1.ship.hit();
                expect(targetNode1).toEqual({
                    id: node1,
                    position: [4, 1],
                    ship: {
                        type: 'Battleship',
                        size: 4,
                        health: 3,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                const targetNode2 = gameBoard.gridNodes.find(
                    (node) => node.id === node2,
                );
                targetNode2.ship.hit();
                expect(targetNode2).toEqual({
                    id: node2,
                    position: [4, 2],
                    ship: {
                        type: 'Battleship',
                        size: 4,
                        health: 2,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                const targetNode3 = gameBoard.gridNodes.find(
                    (node) => node.id === node3,
                );
                targetNode3.ship.hit();
                expect(targetNode3).toEqual({
                    id: node3,
                    position: [4, 3],
                    ship: {
                        type: 'Battleship',
                        size: 4,
                        health: 1,
                        isSunk: false,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                const targetNode4 = gameBoard.gridNodes.find(
                    (node) => node.id === node4,
                );
                targetNode4.ship.hit();
                expect(targetNode4).toEqual({
                    id: node4,
                    position: [4, 4],
                    ship: {
                        type: 'Battleship',
                        size: 4,
                        health: 0,
                        isSunk: true,
                        coordinates: expect.any(Set),
                    },
                    targeted: false,
                });
                expect(Array.from(targetNode4.ship.coordinates)).toEqual([
                    '4,1',
                    '4,2',
                    '4,3',
                    '4,4',
                ]);
            },
        );
    });
    //Board position targeting and end to end test for the steps involved in sinking a ship
    describe('Node Targeting', () => {
        test('A nodes default "Targeted" should be false', () => {
            expect(gameBoard.gridNodes[1].targeted).toBe(false);
        });
    });
});
