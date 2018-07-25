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
         * "white" = White's turn
         * "black" = Black's turn
         */
	this.turn = "white";
	this.players =  []
	this.gameId = id
	this.movesArray = []
	this.history = []
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
	this.whiteCaptures = ["img/wpawn.png", "img/wbishop.png"]	/**
	 * PROPERTY: blackCaptures[]
	 * blackCaptures is an array of pieces captured by the "Black" player
	 */
	this.blackCaptures = ["img/bpawn.png", "img/brook.png"];
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
		// //Set a piece for testing
		// this.logicalBoard[4][4].setPiece(new pieces.King(4, 4, "Black"));
		// this.logicalBoard[4][4].setOccupied(1);

		// this.logicalBoard[4][5].setPiece(new pieces.Queen(4, 5, "Black"));
		// this.logicalBoard[4][5].setOccupied(1);

		// this.logicalBoard[6][5].setPiece(new pieces.Bishop(6, 5, "Black"));
		// this.logicalBoard[6][5].setOccupied(1);

		// this.logicalBoard[2][2].setPiece(new pieces.Rook(2, 2, "Black"));
		// this.logicalBoard[2][2].setOccupied(1);	

		// this.logicalBoard[1][2].setPiece(new pieces.Blank(1, 2));
		// this.logicalBoard[1][2].setOccupied(0);	

		// this.logicalBoard[1][7].setPiece(new pieces.Blank(1, 7));
		// this.logicalBoard[1][7].setOccupied(0);	

		// this.logicalBoard[2][1].setPiece(new pieces.Blank(2, 1));
		// this.logicalBoard[2][1].setOccupied(0);	
	}

	getMoves(xCoordinate, yCoordinate, color) {
		var movesArray = [];
		// if (this.logicalBoard[xCoordinate][yCoordinate].getPiece() != pieces.Blank) {
		// 	movesArray = this.logicalBoard[xCoordinate][yCoordinate].getPiece().getMoves(this.logicalBoard);
		// }
		console.log(this.movesArray, "before export")
		movesArray = this.exportMoves(this.movesArray);
		console.log(movesArray, "after export")
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

	// First click is tranfored to last click 
	movePiece(firstClick, lastClick) {
		// Piece exists at its destination tile.
		var lx = lastClick.getPiece().getXCoordinate()
		var ly = lastClick.getPiece().getYCoordinate()
		var fx = firstClick.getPiece().getXCoordinate()
		var fy = firstClick.getPiece().getYCoordinate()
		console.log("l", lx, ly, "f", fx, fy)

		this.logicalBoard[lx][ly].setPiece(firstClick.getPiece());
		// Pieces' coordinates are updated to match its new parent tiles' coordinates.
		this.logicalBoard[lx][ly].getPiece().setXCoordinate(lx);
		this.logicalBoard[lx][ly].getPiece().setYCoordinate(ly);
		this.logicalBoard[lx][ly].setOccupied(1);
		this.logicalBoard[lx][ly].getPiece().addMove();
		// The previous coordinate is "scrubbed" to show that it is no longer occupied.
		this.logicalBoard[fx][fy].setPiece(new pieces.Blank(fx, fy))
		this.logicalBoard[fx][fy].setOccupied(0)

		//push the chess notation move into the history
		this.history.push(this.chessNotation(this.logicalBoard[lx][ly].getPiece().getType(), lx, ly, false, false))
	}
	/**
	 * FUNCTION: capturePiece()
	 *  
	 */
	capturePiece(firstClick, lastClick) { 
		// Inform the captureArray it has guests
		if(this.turn == "white") {
			this.blackCaptures.push("img/b"+lastClick.getPiece().getType().toLowerCase()+"png");
		}
		else if(this.turn == "black") {
			this.whiteCaptures.push("img/w"+lastClick.getPiece().getType().toLowerCase()+"png");
		}
		// Replace the piece at the lastClick tile
		this.logicalBoard[lastClick.getXCoordinate()][lastClick.getYCoordinate()].setPiece(firstClick.getPiece());
		// Update the pieces' coordinates
		this.logicalBoard[lastClick.getXCoordinate()][lastClick.getYCoordinate()].getPiece().setXCoordinate(lastClick.getXCoordinate());
		this.logicalBoard[lastClick.getXCoordinate()][lastClick.getYCoordinate()].getPiece().setYCoordinate(lastClick.getYCoordinate());
		this.logicalBoard[lastClick.getXCoordinate()][lastClick.getYCoordinate()].setOccupied(1);
		this.logicalBoard[lastClick.getXCoordinate()][lastClick.getYCoordinate()].getPiece().addMove();
		// Leave no evidence that we were ever in the prior space
		this.logicalBoard[firstClick.getXCoordinate()][firstClick.getYCoordinate()].setPiece(new pieces.Blank(firstClick.getXCoordinate(), firstClick.getYCoordinate()));
		this.logicalBoard[firstClick.getXCoordinate()][firstClick.getYCoordinate()].setOccupied(0)
		//push the chess notation move into the history
		this.history.push(this.chessNotation(this.logicalBoard[lastClick.getXCoordinate()][lastClick.getYCoordinate()].getPiece().getType(), lastClick.getXCoordinate(), lastClick.getYCoordinate(), true, false))
		
	}

	//TODO: Update evaluateClick 
	evaluateClick(x, y, color) {
		if(this.turn == color){
			console.log("recieved", x, y)
			//Is this the opening or "alpha" click?
			// if( !(this.alphaClick.getXCoordinate()) && !(this.alphaClick.getYCoordinate() && (this.logicalBoard[x][y].getOccupied))
			// 	 || (this.logicalBoard[x][y].getPiece().getColor() == color)){
			if(this.logicalBoard[x][y].getPiece().getColor().toLowerCase() == color){
				console.log("set Alpha click", x, y)
				this.alphaClick.setPiece(this.logicalBoard[x][y].getPiece())
				this.movesArray = this.logicalBoard[x][y].getPiece().getMoves(this.logicalBoard);
			}else {
			// This must be the omega click!
				console.log("set Omega click", x , y)
				this.omegaClick.setPiece(this.logicalBoard[x][y].getPiece())
				//Case 1. Check to see if the 2nd click is in our moves Array.
				var isValidMove = false;
				for(var i = 0; i < this.movesArray.length; i++) {
					console.log("Comparing X", this.movesArray[i][0] , this.omegaClick.getXCoordinate())
					console.log("Comparing Y", this.movesArray[i][1] , this.omegaClick.getXCoordinate())
					if(
						(this.movesArray[i][0] == this.omegaClick.getPiece().getXCoordinate())
						 && (this.movesArray[i][1] == this.omegaClick.getPiece().getYCoordinate())
						 ) {
						isValidMove = true;
						console.log("is a valid move")
						break;
					}else {
						isValidMove = false;
					}
				}
				// If the omega tile is un-occupied, then we can move there.
				if (!(this.omegaClick.getOccupied())  && (isValidMove)) {
					console.log("moving piece!")
					this.movePiece(this.alphaClick, this.omegaClick);
					this.changeTurn()
				}
				// The omega tile is occupied! Capture it!
				else if ((this.omegaClick.getOccupied()) && (isValidMove)) {
					this.capturePiece(this.alphaClick, this.omegaClick);
					this.changeTurn()
				}
				// Once we have resolved all possible click cases, we can - nay, must! - reset our clicks.
				this.movesArray = []
				this.alphaClick.setPiece(new pieces.Blank(0, 0, 0))
				this.omegaClick.setPiece(new pieces.Blank(0, 0, 0))
				
			}
		}
		this.exportBoard();
		return this.displayBoard;
	} 
	/**
	 * FUNCTION: pieceConverter()
	 * pieceConverter accepts a piece from the logical board and returns a piece code
	 * based on type and color of that piece. It is a helper function for the exportBoard()
	 * function.
	 */
	changeTurn(){
	 	if(this.turn == "white"){
	 		this.turn = "black"
	 	}else if(this.turn == "black"){
	 		this.turn = "white"
	 	}
	 }

	chessNotation(type, x, y, captured, check){
		var move = ""
		//get the letter
		if(type == "King"){
			move = move + "K"
		}else if(type == "Queen"){
			move = move + "Q"
		}else if(type == "Rook"){
			move = move + "R"
		}else if(type == "Knight"){
			move = move + 'N'
		}else if(type == "Bishop"){
			move = move + 'B'
		}
		console.log(captured, "captured")
		//check to see if something was taken
		if(captured == true){
			console.log(captured, "captured")
			move = move + 'x'
		}

		//add the coordinates
		if(x == 1){
			move = move + 'a'
		}else if(x == 2){
			move = move + 'b'
		}else if(x == 3){
			move = move + 'c'
		}else if(x == 4){
			move = move + 'd'
		}else if(x == 5){
			move = move + 'e'
		}else if(x == 6){
			move = move +'f'
		}else if(x == 7){
			move = move + 'g'
		}else if(x == 8){
			move = move + 'h'
		}

		move = move + y

		if(check){
			move  = move + '+'
		}

		console.log(move)
		return move
	}

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
	exportMoves(oldMovesArray){
		var newMovesArray = [];
		for(var i = 0; i < oldMovesArray.length; i++) {
			newMovesArray.push([9 - oldMovesArray[i][1], oldMovesArray[i][0]]);
		}
		//this.displayMoves
		return newMovesArray;
	}
	getPlayers(username){
		return this.players
	}

	getId(){
		return this.gameId
	}

}


module.exports = {Game}
