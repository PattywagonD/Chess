/**
 * July 11th, 2018
 * Chess App Project for CodeSchool 2018
 * Programmed by
 * Dockstader, Patrick
 * Richardson, Makalee
 * Wright, Grady MK
 * With instruction from
 * Eames, Andrew
 * Holt, DJ
 * Kearl, Matt
 * Wilkinson, Kaden
 */

const pieces = require('./pieces')


class Game{
	constructor(id){
	/**
    * Let gameState be defined as
    * 0. Beginning of the game (implies we need to set-up the board)
    * 1. Middle of the game, let the players inform the board
         * 2. Check: a King is in check, update move behavior to match
         * 3. Stalemate: There is not enough material on the board for either player to make a 
         * definitive play. This game is over by default. 
         * 4. End: a King is in checkmate, inform the players and present them some options
     */
	this.gameState = 0
	/**
         * Let turn be defined as
         * 0 = White's turn
         * 1 = Black's turn
         */
	this.turn = 0;
	this.players =  []
	this.gameId = ""
	/**
    * Board is an array of tiles representing the chess board. Used for logic.
    */
	this.board = []
	/**
	 * Display is a copy of the board for HTML. It is exported from the server-side to
	 * the client-side.
	 */
	this.display = [
              [2,3,4,6,5,4,3,2],
              [1,1,1,1,1,1,1,1],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [11,11,11,11,11,11,11,11],
              [12,13,14,16,15,14,13,12]
          	]
	}
	boardInitialize() {
        
		for(var x = 1; x < 9; x++) {
			for(var y = 1; y < 9; y++) {
				this.board[x][y] = new Tile(0, x, y);
			}
		}
	}	
	addPlayer(username){
		if(this.players.length < 2)
			this.players.push(username)
		else
			console.log("Cannot add")
	}

	getPlayers(username){
		return this.players
	}

	checkGameOver(){

	}

	evaluateClick(x, y, color){
		return [
              [2,3,4,6,5,4,3,2],
              [1,1,1,1,1,1,1,1],
              [0,0,0,0,0,0,0,0],
              [0,1,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [11,11,11,11,11,11,11,11],
              [12,13,14,16,15,14,13,12]
          	]
	} 
	getMoves(xCoordinate, yCoordinate, color) {
		return [[5,2], [6,3]]
	}
		// var movesArray;
		// if (this.board[xCoordinate][yCoordinate].getPiece().getColor() != "Blank") {
		// 	movesArray = this.board[xCoordinate][yCoordinate].getPiece().getMoves(this.board);
		// }
		// return movesArray;

}


module.exports = {Game}