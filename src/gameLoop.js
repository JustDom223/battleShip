import { GameBoard } from '../src/GameBoard';
import { Ship } from '../src/Ship';
import { Player } from '../src/Player';

// Create the players
const player1 = new Player('Dom');
const player2 = new Player('Von');
// Build the boards
const board1 = new GameBoard();
const board2 = new GameBoard();
board1.createGridNodes(10, 10);
board2.createGridNodes(10, 10);

