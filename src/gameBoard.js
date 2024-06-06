export class GameBoard {
    constructor() {
        this.gridNodes = [];
        this.edges = new Map();
    }
    addNode(id, position) {
        this.gridNodes.push({ id, position });
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

    placeShip(sourceId, ship, size = ship.size, direction) {
        if (size === 0) {
            return true;
        } else {
            const targetsEdges = this.edges.get(sourceId);
            if (!targetsEdges || targetsEdges.length === 0) {
                console.error('No edges found for source ID:', sourceId);
                return false;
            }
            const targetNode = this.gridNodes.find(
                (node) => node.id === sourceId,
            );
            if (!targetNode) {
                console.error('Target node not found for source ID:', sourceId);
                return false;
            }
            if (direction) {
                this.placeShip(targetsEdges.right, ship, --size, direction);
            } else {
                this.placeShip(targetsEdges.up, ship, --size, direction);
            }
            targetNode.ship = ship;
            return true;
        }
    }
}
