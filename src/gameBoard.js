function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class GameBoard {
    constructor() {
        this.gridNodes = [];
        this.edges = new Map();
    }
    addNode(id, position) {
        this.gridNodes.push({ id, position, targeted: false });
        this.edges.set(id, {
            up: false,
            down: false,
            left: false,
            right: false,
        });
    }
    createGridNodes(rows, col) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < col; j++) {
                this.addNode(`${i},${j}`, [i, j]);
            }
        }
    }
    getNodes() {
        return this.gridNodes;
    }
    getEdges() {
        return this.edges;
    }
    getEdgesArray() {
        return Array.from(this.edges);
    }
    // add edge for specific node
    addEdge(nodeId, direction, targetId) {
        if (!this.edges.has(nodeId)) {
            this.edges.set(nodeId, {
                up: false,
                down: false,
                left: false,
                right: false,
            });
        }
        let nodeEdges = this.edges.get(nodeId);
        nodeEdges[direction] = targetId;
    }
    assignEdges(links) {
        this.gridNodes.forEach((node) => {
            const nodeId = node.id;
            const [xAxis, yAxis] = node.position;
            // Assign edges based on the links provided
            links.forEach(([directionX, directionY]) => {
                const newX = xAxis + directionX;
                const newY = yAxis + directionY;
                if (newX >= 0 && newX <= 9 && newY >= 0 && newY <= 9) {
                    const direction = this.getDirection(directionX, directionY);
                    const newEdge = `${newX},${newY}`;
                    this.addEdge(nodeId, direction, newEdge);
                }
            });
        });
    }
    getDirection(dx, dy) {
        if (dx === 0 && dy === 1) return 'up';
        if (dx === 0 && dy === -1) return 'down';
        if (dx === -1 && dy === 0) return 'left';
        if (dx === 1 && dy === 0) return 'right';
        return null; // or throw an error if the direction is invalid
    }
    placeShip(sourceId, ship, direction = 'up') {
        // check if the ship is fully placed
        if (ship.coordinates.size >= ship.size) return true;

        const targetNode = this.gridNodes.find((node) => node.id === sourceId);

        // asign the ship to the current node and add the coordinate
        targetNode.ship = ship;
        ship.addCoordinate(sourceId);

        // Get the next node ID based on the direction
        const targetsEdges = this.edges.get(sourceId);
        const nextNodeId = targetsEdges[direction];

        // Check if the edge in the current direction is valid
        if (targetsEdges[direction] !== false) {
            return this.placeShip(nextNodeId, ship, direction);
        } else {
            const oppositeDirection = this.getOppositeDirection(direction);
            const oppositeNodeId = targetsEdges[oppositeDirection];
            if (oppositeNodeId) {
                return this.placeShip(oppositeNodeId, ship, oppositeDirection);
            }
        }

        // If no valid move is possible, return false
        return false;
    }
    getRandomCoordinates() {
        const row = getRandomInt(0, 9);
        const col = getRandomInt(0, 9);
        const sourceId = `${row},${col}`;
        return sourceId;
    }
    placeShipRandomly(ship) {
        const directions = ['up', 'down', 'left', 'right'];
        let placed = false;

        while (!placed) {
            try {
                const randomCoordinate = this.getRandomCoordinates();
                console.log(randomCoordinate)
                const randomDirection =
                    directions[getRandomInt(0, directions.length - 1)];
                if (
                    this.checkAndPlace(randomCoordinate, ship, randomDirection)
                ) {
                    placed = true;
                }
            } catch (error) {
                console.error(`Error placing ship:`, error);
                // Handle the error or simply continue to the next iteration
            }
        }
    }
    checkCoordinate(sourceId) {
        const targetNode = this.gridNodes.find((node) => node.id === sourceId);
        if (targetNode.ship) return true;
        else return false;
    }
    // Use checkCoordinates that returns as true if there is a ship
    // and return false for Placement.
    //I have added an extra note as this might cause confusion
    checkCoordinatesForPlacement(sourceId, shipSize, direction) {
        let tempSet = new Set();
        let targetsEdges = this.edges.get(sourceId);
        while (tempSet.size < shipSize) {
            if (this.checkCoordinate(sourceId)) {
                return false;
            }
            if (targetsEdges[direction] === false) {
                direction = this.getOppositeDirection(direction);
                targetsEdges = this.edges.get(sourceId);
            }
            tempSet.add(sourceId);
            sourceId = targetsEdges[direction];
            if (!sourceId) {
                return false;
            }
            targetsEdges = this.edges.get(sourceId);
        }
        return true;
    }
    checkAndPlace(sourceId, ship, direction = 'up') {
        const locationsChecked = this.checkCoordinatesForPlacement(
            sourceId,
            ship.size,
            direction,
        );
        if (locationsChecked) {
            this.placeShip(sourceId, ship, direction);
            return true;
        } else {
            throw new Error('Sorry, the location already has a ship assigned');
        }
    }
    getOppositeDirection(direction) {
        const opposites = {
            up: 'down',
            down: 'up',
            left: 'right',
            right: 'left',
        };
        return opposites[direction];
    }

    attack(targetId) {
        const node = this.gridNodes.find((node) => node.id === targetId);
        if (node && !node.targeted) {
            node.targeted = true;
            if (node.ship) {
                node.ship.hit();
                return { hit: true, shipSunk: node.ship.isSunk };
            } else {
                return { hit: false };
            }
        } else {
            throw new Error('This node has already been targeted!');
        }
    }

    attackRandom() {
        let randomCoordinate;
        try {
            randomCoordinate = this.getRandomCoordinates();
            console.log(randomCoordinate);
            this.attack(randomCoordinate);
        } catch (error) {
                // console.log('Retrying attack...');
                return this.attackRandom(); // Retry the attack      
        }
        return randomCoordinate;
    }
    

    renderBoard(showShips = false) {
        let board = [];
        for (let i = 0; i < 10; i++) {
            let row = [];
            for (let j = 0; j < 10; j++) {
                const node = this.gridNodes.find(
                    (node) => node.id === `${i},${j}`,
                );
                if (node.targeted) {
                    if (node.ship) {
                        row.push('H'); // Hit
                    } else {
                        row.push('M'); // Miss
                    }
                } else if (showShips && node.ship) {
                    row.push('■'); // A ship
                } else {
                    row.push('~'); // Untargeted and no Ship
                }
            }
            board.push(row);
        }
        console.log(board.map((row) => row.join(' ')).join('\n'));
        return true;
    }
}
