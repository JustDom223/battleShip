export class Ship {
    //Create ship with size and health
    constructor(size) {
        this.size = size;
        this.health = size;
        this.isSunk = false;
        this.coordinates = new Set();
    }
    //Function that registers a hit
    hit() {
        this.health -= 1;
        if (this.health <= 0) {
            this.isSunk = true;
        }
        return true;
    }
    addCoordinate(coordinate) {
        if (this.coordinates.size < this.size) {
            this.coordinates.add(coordinate);
        }
    }
}
