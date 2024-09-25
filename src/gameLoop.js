import { GameBoard } from './GameBoard.js';
import { Player } from './Player.js';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const connectionsNested = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
];

class GameLoop {
    constructor(player1Name) {
        this.player1 = new Player(player1Name);
        this.player2 = new Player('Bot');
        this.player1Board = new GameBoard();
        this.player2Board = new GameBoard();
        this.currentPlayer = this.player1;
        this.currentBoard = this.player2Board;
        this.setupGame();
    }

    // Set up the game by placing ships on both boards
    setupGame() {
        this.player1Board.createGridNodes(10, 10);
        this.player2Board.createGridNodes(10, 10);
        this.player1Board.assignEdges(connectionsNested);
        this.player2Board.assignEdges(connectionsNested);

        this.player1.ships.forEach((ship) => {
            this.player1Board.placeShipRandomly(ship);
        });

        this.player2.ships.forEach((ship) => {
            this.player2Board.placeShipRandomly(ship);
        });

        console.log("Ships placed. Let's begin the game!");
    }

    // Main game loop
    async start() {
        let gameOver = false;

        while (!gameOver) {
            await this.playTurn(); // Wait for player to make their move

            if (this.checkWinCondition()) {
                console.log(`${this.currentPlayer.name} wins!`);
                gameOver = true;
            } else {
                this.switchTurns();
            }
        }
    }

    // Handle a player's turn
    async playTurn() {
        console.log(`${this.currentPlayer.name}'s turn:`);

        this.currentBoard.renderBoard(false);
        if(this.currentPlayer === this.player1){
            let attackCoordinate = await this.getAttackCoordinates(); // Prompt player for coordinates
            
            try {
                const attackResult = this.currentBoard.attack(attackCoordinate);
                
                if (attackResult.hit) {
                    console.log('Hit!');
                    if (attackResult.shipSunk) {
                        console.log('Ship sunk!');
                    }
                } else {
                    console.log('Miss!');
                }
            } catch (error) {
                console.error(error.message);
            }
        }else{
            this.currentBoard.attackRandom()
        }

        this.currentBoard.renderBoard(false);
    }

    // Switch turns between players
    switchTurns() {
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
            this.currentBoard = this.player1Board;
        } else {
            this.currentPlayer = this.player1;
            this.currentBoard = this.player2Board;
        }
    }

    // Check if the current player has sunk all the opponent's ships
    checkWinCondition() {
        return this.currentBoard.getNodes().every(
            (node) => node.ship === undefined || node.ship.isSunk
        );
    }

    // Prompt the player to enter attack coordinates
    async getAttackCoordinates() {
        const rl = readline.createInterface({ input, output });
        let validInput = false;
        let coordinates;

        while (!validInput) {
            const input = await rl.question('Enter attack coordinates (row,col): ');
            coordinates = input.split(',').map(Number);

            // Validate that input is in the format of "row,col" and within bounds
            if (coordinates.length === 2 && 
                !isNaN(coordinates[0]) && 
                !isNaN(coordinates[1]) && 
                coordinates[0] >= 0 && coordinates[0] < 10 &&
                coordinates[1] >= 0 && coordinates[1] < 10) {
                validInput = true;
            } else {
                console.log("Invalid input. Please enter valid coordinates (e.g., 5,3).");
            }
        }

        rl.close();
        return `${coordinates[0]},${coordinates[1]}`; // Return formatted coordinate
    }
}

// Prompt the player for their name using readline/promises
async function startGame() {
    const rl = readline.createInterface({ input, output });
    const name = await rl.question('Please enter your name: ');

    const game = new GameLoop(name);
    await game.start();

    rl.close();
}

startGame();
