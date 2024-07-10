// Import the Ship class
import { Ship } from './shipFactory.js';

export class Player {
    constructor(name) {
        this.name = name;
        this.ships = this.createShips();
    }

    createShips() {
        return [
            new Ship('Carrier', 5),
            new Ship('Battleship', 4),
            new Ship('Cruiser', 3),
            new Ship('Submarine', 3),
            new Ship('Destroyer', 2),
        ];
    }
}
