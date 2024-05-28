export class GameBoard {
    constructor() {
        this.gridNodes = [];
        this.edges = new Map();
    }
    addNode(id, position) {
        this.gridNodes.push({ id, position });
        this.edges.set(id, []);
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
    addEdge(sourceId, targetId) {
        if (!this.edges.has(sourceId)) {
            // If the sourceId doesnt exist create an entry for it
            edges.set(sourceId, []);
        }

        // check if targeId is already in the list of edges for sourceId
        const existingEdges = this.edges.get(sourceId);
        if (!existingEdges.includes(targetId)) {
            // Add the targetId only if its not already present
            existingEdges.push(targetId);
        }
        return;
    }

    placeShip(sourceId, ship) {
        const targetNode = this.gridNodes.find((node) => node.id === sourceId);
        targetNode.ship = ship;
        return;
    }
}
