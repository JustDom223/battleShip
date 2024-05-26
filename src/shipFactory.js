export class Ship {
    //Create ship with size and health
    constructor(size) {
        this.size = size;
        this.health = size;
        this.isSunk = false;
    }
    //Function that registers a hit
    hit() {
        this.health -= 1;
        if (this.health <= 0) {
            this.isSunk = true;
        }
    }
}
