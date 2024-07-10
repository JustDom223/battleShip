// Import the Ship class
import { Ship } from './shipFactory.js';

export class Player {
    constructor(name) {
        this.name = name;
        this.ships = this.createShips();
        this.playerHealth = this.remainingHealth();
        this.shipCount = this.remainingShips();
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

    remainingHealth() {
        let currentHealth = 0;
        this.ships.forEach((ship) => {
            currentHealth += ship.health;
        });
        return (this.playerHealth = currentHealth);
    }

    remainingShips() {
        let shipCount = 0;
        this.ships.forEach((ship) => {
            if (!ship.isSunk) {
                shipCount += 1;
            }
        });
        return (this.shipCount = shipCount);
    }
}
