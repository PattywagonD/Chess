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
         * 2. Check: white king in check, update move behavior to match
         * 3. Check: black king in check
         * 4. Stalemate: There is not enough material on the board for either player to make a 
         * definitive play. This game is over by default. 
         * 5. End: a King is in checkmate, inform the players and present them some options
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
	this.whiteKing = [5,1]
	this.blackKing = [5,8]
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
	this.whiteCaptures = []	/**
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
		// //Set a piece for testing

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
		movesArray = this.exportMoves(this.movesArray);
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

	checkGameOver(color){
		if(color.toLowerCase() == "white"){
			var opponent = "black"
		}else{
			var opponent = "white"
		}
		//Color is the person who just moved
		//Check to see if the opponent is in check
		var inCheckBlack = this.logicalBoard[this.blackKing[0]][this.blackKing[1]].getPiece().getCheck(this.blackKing[0], this.blackKing[1], this.logicalBoard)
		var inCheckWhite = this.logicalBoard[this.whiteKing[0]][this.whiteKing[1]].getPiece().getCheck(this.whiteKing[0], this.whiteKing[1], this.logicalBoard)
		//check to see if the opponent can move out of check
		if(opponent == "white"){
			//in check
			if(inCheckWhite){
				console.log("Checked Opponent!")
				//Changed the Notation to display the check
				var histLength = this.history.length-1
				this.history[histLength] = this.history[histLength]+"+"
				//game state is 2 if he can still move
				this.gameState = 2
				//if he cant move it will be changed to a higher number
			//not in check
			}else{
				this.gameState = 0
				//Check for statelmate however
			}
		}else if(opponent == "black"){
			if(inCheckBlack){
				console.log("Checked Opponent!")
				//Changed the Notation to display the check
				var histLength = this.history.length-1
				this.history[histLength] = this.history[histLength]+"+"
				this.gameState = 3
			}else{
				this.gameState = 0
				//Check for statelmate however
			}
		}

	}

	// First click is tranfored to last click 
	movePiece(firstClick, lastClick) {

		// Piece exists at its destination tile.
		var lx = lastClick.getPiece().getXCoordinate()
		var ly = lastClick.getPiece().getYCoordinate()
		var fx = firstClick.getPiece().getXCoordinate()
		var fy = firstClick.getPiece().getYCoordinate()


		//update king pointers if needed
		if(firstClick.getPiece().getType() == "King"){
			if(firstClick.getPiece().getColor().toLowerCase() == "white"){
				this.whiteKing = [lx,ly]
			}else if(firstClick.getPiece().getColor().toLowerCase() == 'black'){
				this.blackKing = [lx, ly]
			}
			console.log("Just moved a king!")
		}

		this.logicalBoard[lx][ly].setPiece(firstClick.getPiece());
		// Pieces' coordinates are updated to match its new parent tiles' coordinates.
		this.logicalBoard[lx][ly].getPiece().setXCoordinate(lx);
		this.logicalBoard[lx][ly].getPiece().setYCoordinate(ly);
		console.log(this.logicalBoard[lx][ly].getPiece().getColor(),"Moved Pieces color")		
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
		var capture = "img/"
		console.log("CAPTURING")
		if(this.turn == "white") {
			capture = capture + "b" + lastClick.getPiece().getType().toLowerCase() + ".png"
			console.log(capture)
			this.blackCaptures.push(capture)
		}
		else if(this.turn == "black") {
			capture = capture + "w" + lastClick.getPiece().getType().toLowerCase() + ".png"
			console.log(capture)
			this.whiteCaptures.push(capture);
		}
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
		this.history.push(this.chessNotation(this.logicalBoard[lx][ly].getPiece().getType(), lx, ly, true, false))
		
	}

	//TODO: Update evaluateClick 
	evaluateClick(x, y, color) {
		if(this.turn == color){
			var inCheckBlack = this.logicalBoard[this.blackKing[0]][this.blackKing[1]].getPiece().getCheck(this.blackKing[0], this.blackKing[1], this.logicalBoard)
			var inCheckWhite = this.logicalBoard[this.whiteKing[0]][this.whiteKing[1]].getPiece().getCheck(this.whiteKing[0], this.whiteKing[1], this.logicalBoard)
			console.log(inCheckWhite, inCheckBlack, "currently in check?")
			console.log("recieved", x, y)

			//Is this the opening or "alpha" click?
			if(this.logicalBoard[x][y].getPiece().getColor().toLowerCase() == color){
				console.log("set Alpha click", x, y)
				this.alphaClick.setPiece(this.logicalBoard[x][y].getPiece())
				this.alphaClick.setOccupied(1)
				this.movesArray = this.logicalBoard[x][y].getPiece().getMoves(this.logicalBoard);
			}else {
			// This must be the omega click!
				console.log("set Omega click", x , y)
				this.omegaClick.setPiece(this.logicalBoard[x][y].getPiece())
				this.omegaClick.setOccupied(1)
				//Case 1. Check to see if the 2nd click is in our moves Array.
				var isValidMove = false;
				for(var i = 0; i < this.movesArray.length; i++) {
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
				if ( (!(this.logicalBoard[x][y].getOccupied())  && (isValidMove))) {
					console.log("moving piece!")
					this.movePiece(this.alphaClick, this.omegaClick);
					this.checkGameOver(color)
					this.changeTurn()
				}
				// The omega tile is occupied! Capture it!
				else if ((this.logicalBoard[x][y].getOccupied()) && (isValidMove)) {
					(console.log("capturing a piece!"))
					this.capturePiece(this.alphaClick, this.omegaClick);
					this.checkGameOver(color)
					this.changeTurn()    
				}
				// Once we have resolved all possible click cases, we can - nay, must! - reset our clicks.
				this.movesArray = []
				this.alphaClick.setPiece(new pieces.Blank(0, 0, 0))
				this.alphaClick.setOccupied(0)
				this.omegaClick.setPiece(new pieces.Blank(0, 0, 0))
				this.alphaClick.setOccupied(0)
				
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
		}if(this.gameState == 0){
			this.displayBoard[this.whiteKing[1]-1][this.whiteKing[0]-1] = 15
			this.displayBoard[this.blackKing[1]-1][this.blackKing[0]-1] = 5
		}else if(this.gameState == 2){
			this.displayBoard[this.whiteKing[1]-1][this.whiteKing[0]-1] = 35
		}else if(this.gameState == 3){
			this.displayBoard[this.blackKing[1]-1][this.blackKing[0]-1] = 25
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
	getWhiteCaptures(){
		return this.whiteCaptures
	}
	getBlackCaptures(){
		return this.blackCaptures
	}

}


module.exports = {Game}
