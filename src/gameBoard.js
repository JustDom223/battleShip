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
            this.edges.set(sourceId, []);
        }

        // check if targeId is already in the list of edges for sourceId
        const existingEdges = this.edges.get(sourceId);
        if (!existingEdges.includes(targetId)) {
            // Add the targetId only if its not already present
            existingEdges.push(targetId);
        }
        return;
    }

    placeShip(sourceId, ship, size = ship.size) {
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
            this.placeShip(targetsEdges[3], ship, --size);
            targetNode.ship = ship;
            return true;
        }
    }

    assignEdges(links) {
        this.gridNodes.forEach((node) => {
            for (let i = 0; i < links.length; i++) {
                let p1 = node.position[0] + links[i][0];
                let p2 = node.position[1] + links[i][1];
                let newEdge = `${p1},${p2}`;
                if (p1 >= 0 && p1 <= 9 && p2 >= 0 && p2 <= 9) {
                    this.addEdge(node.id, newEdge);
                }
            }
        });
    }
}
