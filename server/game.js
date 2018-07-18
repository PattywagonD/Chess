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
	constructor(){
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
	/**
    * Board is an array of tiles representing the chess board. Used for logic.
    */
	this.board = [[],[],[],[],[],[],[],[],[]]
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
	this.boardInitialize();
	this.setPieces();
	}
	boardInitialize() {
		for(var x = 1; x < 9; x++) {
			for(var y = 1; y < 9; y++) {
				this.board[x][y] = new pieces.Tile(0, x, y);
			}
		}
	}
	setPieces() {
		for(var y = 1; y < 9; y++) {
			switch (y) {
				case 1:
					for(var x = 1; x < 9; x++) {
						switch (x) {
							case 1: case 8:
								this.board[x][y].setPiece(new pieces.Rook(x, y, "White"));
								this.board[x][y].setOccupied(1);
								break;
							case 2: case 7:
								this.board[x][y].setPiece(new pieces.Knight(x, y, "White"));
								this.board[x][y].setOccupied(1);
								break;
							case 3: case 6:
								this.board[x][y].setPiece(new pieces.Bishop(x, y, "White"));
								this.board[x][y].setOccupied(1);
								break;
							case 4:
								this.board[x][y].setPiece(new pieces.Queen(x, y, "White"));
								this.board[x][y].setOccupied(1);
								break;
							case 5:
								this.board[x][y].setPiece(new pieces.King(x, y, "White"));
								this.board[x][y].setOccupied(1);
								break;
						}
					}
					break;
				case 2:
					for(var x = 1; x < 9; x++) {
						this.board[x][y].setPiece(new pieces.Pawn(x, y, "White"));
						this.board[x][y].setOccupied(1);
					}
				case 3: case 4: case 5: case 6:
					for(var x = 1; x < 9; x++) {
						this.board[x][y].setPiece(new pieces.Blank(x, y));
					}
					break;
				case 7:
					for(var x = 1; x < 9; x++) {
						this.board[x][y].setPiece(new pieces.Pawn(x, y, "Black"));
						this.board[x][y].setOccupied(1);
					}
				case 8:
					for(var x = 1; x < 9; x++) {
						switch (x) {
							case 1: case 8:
									this.board[x][y].setPiece(new pieces.Rook(x, y, "Black"));
									this.board[x][y].setOccupied(1);
									break;
								case 2: case 7:
									this.board[x][y].setPiece(new pieces.Knight(x, y, "Black"));
									this.board[x][y].setOccupied(1);
									break;
								case 3: case 6:
									this.board[x][y].setPiece(new pieces.Bishop(x, y, "Black"));
									this.board[x][y].setOccupied(1);
									break;
								case 4:
									this.board[x][y].setPiece(new pieces.King(x, y, "Black"));
									this.board[x][y].setOccupied(1);
									break;
								case 5:
									this.board[x][y].setPiece(new pieces.Queen(x, y, "Black"));
									this.board[x][y].setOccupied(1);
									break;
						}
					}
					break;
			}
		}
	}
	getMoves(xCoordinate, yCoordinate, color) {
		var movesArray;
		if (this.board[xCoordinate][yCoordinate].getPiece() != pieces.Blank) {
			console.log("Inside getMoves() @game.js");
			console.log("X:");
			console.log(xCoordinate);
			console.log("Y:");
			console.log(yCoordinate);
			console.log("Board:")
			console.log(this.board)
			console.log("Container at index values:");
			console.log(this.board[xCoordinate][yCoordinate]);
			movesArray = this.board[xCoordinate][yCoordinate].getPiece().getMoves(this.board);
		}
		return movesArray;
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
	updateMoves(x, y, color){
		return [[2,2], [6,8]]
	}
}


module.exports = {Game}
