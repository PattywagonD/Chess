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
	this.gameId = id
	this.movesArray = []
	/**
    * logical Board is an array of tiles representing the chess board. Used by the server for an "absolute" board
	* that clients can access.
    */
	this.logicalBoard = [[],[],[],[],[],[],[],[],[]]
	/**
	 * displayBoard is an array of pieces represented as integers for client-side HTML; an isomorphism
	 * of the logicalBoard. It is exported from the server-side to
	 * the client-side.
	 */
	this.displayBoard = [
              [2,3,4,6,5,4,3,2],
              [1,1,1,1,1,1,1,1],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [11,11,11,11,11,11,11,11],
			  [12,13,14,16,15,14,13,12]
			  ]
	/**
	 * PROPERTY: alphaClick
	 * alphaClick represents the first tile or piece of a player's move when we arrive at their turn.
	 * It is the primary mover, the "Point A" of a journey a piece at that tile is about to undertake.
	 */
	this.alphaClick = new pieces.Tile(0, 0, 0);
	/**
	 * PROPERTY: omegaClick
	 * omegaClick is the anti-thesis of alphaClick. It is the final destination of our fated piece,
	 * the "Point B" of our pieces' journey.
	 */
	this.omegaClick = new pieces.Tile(0, 0, 0);
	/**
	 * PROPERTY: whiteCaptures[]
	 * whiteCaptures is an array of pieces captured by the "White" player
	 */
	this.whiteCaptures = [];
	/**
	 * PROPERTY: blackCaptures[]
	 * blackCaptures is an array of pieces captured by the "Black" player
	 */
	this.blackCaptures = [];
	this.logicalBoardInitialize();
	this.setPieces();
	}

	logicalBoardInitialize() {
		for(var x = 1; x < 9; x++) {
			for(var y = 1; y < 9; y++) {
				this.logicalBoard[x][y] = new pieces.Tile(0, x, y);
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
								this.logicalBoard[x][y].setPiece(new pieces.Rook(x, y, "White"));
								this.logicalBoard[x][y].setOccupied(1);
								break;
							case 2: case 7:
								this.logicalBoard[x][y].setPiece(new pieces.Knight(x, y, "White"));
								this.logicalBoard[x][y].setOccupied(1);
								break;
							case 3: case 6:
								this.logicalBoard[x][y].setPiece(new pieces.Bishop(x, y, "White"));
								this.logicalBoard[x][y].setOccupied(1);
								break;
							case 4:
								this.logicalBoard[x][y].setPiece(new pieces.Queen(x, y, "White"));
								this.logicalBoard[x][y].setOccupied(1);
								break;
							case 5:
								this.logicalBoard[x][y].setPiece(new pieces.King(x, y, "White"));
								this.logicalBoard[x][y].setOccupied(1);
								break;
						}
					}
					break;
				case 2:
					for(var x = 1; x < 9; x++) {
						this.logicalBoard[x][y].setPiece(new pieces.Pawn(x, y, "White"));
						this.logicalBoard[x][y].setOccupied(1);
					}
					break;
				case 3: case 4: case 5: case 6:
					for(var x = 1; x < 9; x++) {
						this.logicalBoard[x][y].setPiece(new pieces.Blank(x, y));
					}
					break;
				case 7:
					for(var x = 1; x < 9; x++) {
						this.logicalBoard[x][y].setPiece(new pieces.Pawn(x, y, "Black"));
						this.logicalBoard[x][y].setOccupied(1);
					}
					break;
				case 8:
					for(var x = 1; x < 9; x++) {
						switch (x) {
							case 1: case 8:
									this.logicalBoard[x][y].setPiece(new pieces.Rook(x, y, "Black"));
									this.logicalBoard[x][y].setOccupied(1);
									break;
								case 2: case 7:
									this.logicalBoard[x][y].setPiece(new pieces.Knight(x, y, "Black"));
									this.logicalBoard[x][y].setOccupied(1);
									break;
								case 3: case 6:
									this.logicalBoard[x][y].setPiece(new pieces.Bishop(x, y, "Black"));
									this.logicalBoard[x][y].setOccupied(1);
									break;
								case 4:
									this.logicalBoard[x][y].setPiece(new pieces.Queen(x, y, "Black"));
									this.logicalBoard[x][y].setOccupied(1);
									break;
								case 5:
									this.logicalBoard[x][y].setPiece(new pieces.King(x, y, "Black"));
									this.logicalBoard[x][y].setOccupied(1);
									break;
						}
					}
					break;
			}
		}
	}
	getMoves(xCoordinate, yCoordinate, color) {
		var movesArray = [];
		if (this.logicalBoard[xCoordinate][yCoordinate].getPiece() != pieces.Blank) {
			movesArray = this.logicalBoard[xCoordinate][yCoordinate].getPiece().getMoves(this.logicalBoard);
		}
		return movesArray;
	}
	addPlayer(username){
		if(this.players.length < 2)
			this.players.push(username);
		else
			console.log("Cannot add");
	}

	getPlayers(username){
		return this.players
	}

	checkGameOver(){

	}

	//TODO: Update evaluateClick 
	evaluateClick(x, y, color) {
		console.log("recieved", x, y)
		//Is this the opening or "alpha" click?
		if( !(this.alphaClick.getXCoordinate()) && !(this.alphaClick.getYCoordinate())) {
			this.alphaClick = (this.logicalBoard[x][y]);
			//this.movesArray = this.getMoves(x, y, color);
		}
		// This must be the omega click!
		else {
			this.omegaClick = (this.logicalBoard[x][y]);


		}
		this.exportBoard();
		return this.displayBoard;
		// return [
  //             [2,3,4,6,5,4,3,2],
  //             [1,1,1,1,1,1,1,1],
  //             [0,0,0,0,0,0,0,0],
  //             [0,1,0,0,0,0,0,0],
  //             [0,0,0,0,0,0,0,0],
  //             [0,0,0,0,0,0,0,0],
  //             [11,11,11,11,11,11,11,11],
  //             [12,13,14,16,15,14,13,12]
  //         	]
	} 
	// updateMoves(x, y, color){
	// 	return [[2,2], [6,8]];
	// }
	/**
	 * FUNCTION: pieceConverter()
	 * pieceConverter accepts a piece from the logical board and returns a piece code
	 * based on type and color of that piece. It is a helper function for the exportBoard()
	 * function.
	 */
	pieceConverter(piece) {
		var pieceNumber = 0;
		if (piece instanceof pieces.Piece) {
			if (piece.getType() == "Empty") {
				return 0;
			}
			if (piece.getType() == "Pawn") {
				pieceNumber = 1;
			}
			else if (piece.getType() == "Rook") {
				pieceNumber = 2;
			}
			else if (piece.getType() == "Knight") {
				pieceNumber = 3;
			}
			else if (piece.getType() == "Bishop") {
				pieceNumber = 4;
			}
			else if (piece.getType() == "King") {
				pieceNumber = 5;
			}
			else if (piece.getType() == "Queen") {
				pieceNumber = 6;
			}
			if (piece.getColor() == "White") {
				return (pieceNumber + 10);
			}
			else {
				return (pieceNumber);
			}
		}
	}
	/**
	 * FUNCTION: exportBoard()
	 * exportBoard converts the logical board pieces into the display board "piece codes".
	 * The piece code is a number in the 0-16 range that represents a color and piece type.
	 * F'rex a Black King has a piece code of 6.
	 * IMPORTANT: DISPLAY BOARD INDEXING BEGINS AT ZERO (0). LOGICAL BOARD INDEXING BEGINS AT ONE (1).
	 * I DON'T MAKE THE RULES I JUST INSTANTIATE THEM.
	 */
	exportBoard() {	
		for(var y = 1; y < 9; y++) {
			for(var x = 1; x < 9; x++) {
				this.displayBoard[y - 1][x - 1] = this.pieceConverter(this.logicalBoard[x][y].getPiece());
			}
		}
		this.displayBoard.reverse();
	}
	getPlayers(username){
		return this.players
	}

	getId(){
		return this.gameId
	}

}


module.exports = {Game}
