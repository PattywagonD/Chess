/**
 * game.js
 * This file contains the definitions for variables and functions for the over all state of the game.
 * Examples include which player is currently taking their turn, an array of tiles representing the board,
 * and whether there is a checkmate.
 * 1. A variable representing who is currently taking their turn.
 * 2. An array representing the board.
 * 3. Game state
 *      -> Beginning
 *      -> Middle of the Game (normal)
 *      -> Player is in Check
 *      -> Stalemate
 *      -> CheckMate
 *  There is a game object in main.js.
 */
export class gameApp {
    constructor(gameState, yourTurn, board){
        /**
         * Let gameState be defined as
         * 0 = Beginning of the game (implies we need to set-up the board)
         * 1 = Middle of the game, let the players inform the board
         * 2 = Check: a King is in check, update move behavior to match
         * 3 = Stalemate: There is not enough material on the board for either player to make a 
         * definitive play. This game is over by default. 
         * 4 = End: a King is in checkmate, inform the players and present them some options
         */
        this.gameState = 0;
        /**
         * Let yourTurn be defined as
         * 0 = White's turn
         * 1 = Black's turn
         */
        this.yourTurn = 0;
        /**
         * Board is an array of tiles representing the chess board.
         */
        this.board = board;
    }
}