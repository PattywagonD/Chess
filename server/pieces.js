/**
 * WELCOME TO...
 * P I E C E S . J S
 * pieces.js contains class declarations for each individual chess piece. For our implementation,
 * a "blank" is as much a piece as any rook or king or queen. Individual methods and properties pertaining to
 * each individual piece is also defined here, on the server side.
 */
class Tile {
    constructor(occupationStatus, xCoordinate, yCoordinate) {
        this.occupied = occupationStatus;
        this.x = xCoordinate;
        this.y = yCoordinate;
        this.piece = new Blank(xCoordinate, yCoordinate);
    }
    // "Getter" Department
    getOccupied() {
        return (this.occupied);
    }
    getXCoordinate() {
        return(this.x);
    }
    getYCoordinate() {
        return(this.y);
    }
    getPiece() {
        return(this.piece);
    }
    // "Setter" Department
    setOccupied(occupationStatus) {
        this.occupied = occupationStatus;
    }
    setXCoordinate(xCoordinate) {
        this.x = xCoordinate;
    }
    setYCoordinate(yCoordinate) {
        this.y = yCoordinate;
    }
    setPiece(newPiece) {
        this.piece = newPiece;
    }
}


class Piece {
    constructor(xCoordinate, yCoordinate, color, type) {
        this.x = xCoordinate;
        this.y = yCoordinate;
        this.color = color;
        this.type = type;
        this.numberOfMoves = 0;
    }
    // "Getter" Department
    getXCoordinate() {
        return(this.x);
    }
    getYCoordinate() {
        return(this.y);
    }
    getColor() {
        return(this.color);
    }
    getType() {
        return(this.type);
    }
    getNumberOfMoves() {
        return(this.numberOfMoves)
    }
    addMove(){
        this.numberOfMoves += 1
    }
    setXCoordinate(newX){
        this.x = newX
    }
    setYCoordinate(newY){
        this.y=newY
    }
}

class Blank extends Piece {
    constructor(xCoordinate, yCoordinate){
        super(xCoordinate, yCoordinate, "Blank", "Empty");
    }
    getMoves(board) {
        return []
    }
}

class Pawn extends Piece {
    constructor(xCoordinate, yCoordinate, color) {
        super(xCoordinate, yCoordinate, color);
        this.type = "Pawn";
        this.numberOfMoves = 0;
    }

    getMoves(board){
        var movesArray = new Array();
        console.log(this.color);
        if (this.color == "White") {
            console.log("Inside Pawn IF statement for White")
            // Case 1.White : Capture a piece to your left
            if ((this.getXCoordinate() - 1 >= 1) && (this.getYCoordinate() + 1 <= 8)) {  
                if (board[this.getXCoordinate() - 1][this.getYCoordinate() + 1].getPiece().getColor() == "Black") {
                    movesArray.push([(this.getXCoordinate() - 1) , (this.getYCoordinate() + 1)]);
                }
            }
            // Case 2.White Move forward
            if ((this.getYCoordinate() + 1) <= 8) {
                console.log("Inside Pawn IF statement for Move Forward");
                if (!(board[this.getXCoordinate()][this.getYCoordinate() + 1].getOccupied())) { // 2.a Move forward 1 space
                    movesArray.push([(this.getXCoordinate()) , (this.getYCoordinate() + 1)]);
                    // 2.b Move forward 2 spaces; only possibly true if case 2.a is also true
                    if ((this.getNumberOfMoves() < 1) && !(board[this.getXCoordinate()][this.getYCoordinate() + 2].getOccupied())) {
                        movesArray.push([(this.getXCoordinate()), (this.getYCoordinate() + 2)]);
                    }
                }
            }
            // // Case 3.White : Capture a piece to your right
            if ((this.getXCoordinate() + 1 <= 8) && (this.getYCoordinate() + 1 <= 8)) {
                if (board[this.getXCoordinate() + 1][this.getYCoordinate() + 1].getPiece().getColor() == "Black") {
                    movesArray.push([(this.getXCoordinate() + 1), (this.getYCoordinate() + 1)]);
                }
            }
        }
        else if (this.color == "Black") {
            // Case 1.Black : Capture a piece to your left
            if((this.x - 1 >= 1) && (this.y - 1 >= 1)) {  
                if (board[this.getXCoordinate() - 1][this.getYCoordinate() - 1].getPiece().getColor() == "White") {
                    movesArray.push([(this.getXCoordinate() - 1), (this.getYCoordinate() - 1)]);
                }
            }
            // Case 2.Black Move forward
            if ((this.getYCoordinate() - 1) >= 1) { 
                if (!(board[this.getXCoordinate()][this.getYCoordinate() - 1].getOccupied())) { // 2.a Move forward 1 space
                    movesArray.push([(this.getXCoordinate()), (this.getYCoordinate() - 1)]);
                    // 2.b Move forward 2 spaces; only true if case 2.a is also true
                    if ((this.getNumberOfMoves() < 1) && !(board[this.getXCoordinate()][this.getYCoordinate() - 2].getOccupied())) {
                        movesArray.push([(this.getXCoordinate()), (this.getYCoordinate() - 2)]);
                    }
                }
            }
            // Case 3. Capture a piece to your right
            if ((this.getXCoordinate() + 1 <= 8) && (this.getYCoordinate() - 1 >= 1)) {
                if (board[this.getXCoordinate() + 1][this.getYCoordinate() - 1].getPiece().getColor() == "White") {
                    movesArray.push([(this.getXCoordinate() + 1), (this.getYCoordinate() - 1)]);
                }
            }
        }

        console.log(movesArray, "pawn moves")
        return movesArray;
    }
}
class Rook extends Piece {
    constructor (xCoordinate, yCoordinate, color) {
        super(xCoordinate, yCoordinate, color);
        this.type = "Rook";
    }
    /**
     * FUNCTION: getMoves() 
     * Rook getMoves() function uses a "Compass Rose" implementation to push moves to the moves array.
     * This mean moves are added Up, Right, Down, and then Left. Important to keep in mind for other objects
     * that will be using these pieces.
     */
    getMoves(board) {
        var movesArray = new Array();
        var xCurrent = this.getXCoordinate();
        var yCurrent = this.getYCoordinate();
        // Case One: Can the Rook move Forward? If so how far?
        while (yCurrent <= 7) {
            console.log("trip case 1")
            if (board[this.getXCoordinate()][yCurrent+1].getPiece().getColor() != "Blank") {
                if(board[this.getXCoordinate()][yCurrent+1].getPiece().getColor() == this.getColor()){
                    break;
                }else{
                    movesArray.push([this.getXCoordinate(), yCurrent+1])
                    break;
                }
            }

            else {
                console.log("adding")
                movesArray.push([this.getXCoordinate(), yCurrent+1]);
            }
            ++yCurrent;
        }
        // Case Two: How far Right can the Rook move?
        while (xCurrent <= 7) {
            console.log("trip case 2")
            if (board[xCurrent+1][this.getYCoordinate()].getPiece().getColor() != "Blank") {
                if(board[xCurrent+1][this.getYCoordinate()].getPiece().getColor() == this.getColor()){
                    break;
                }else{
                    movesArray.push([xCurrent+1, this.getYCoordinate()])
                    break;
                }
            }
            else {
                console.log("adding")
                movesArray.push([xCurrent+1, this.getYCoordinate()]);
            }
            ++xCurrent;
        }

        xCurrent = this.getXCoordinate();
        yCurrent = this.getYCoordinate();
        // Case Three: Can the Rook move Backward? To what degree?
        while (yCurrent >= 2) {
            console.log("trip case 3")
            if (board[this.getXCoordinate()][yCurrent-1].getPiece().getColor() != "Blank") {
                if(board[this.getXCoordinate()][yCurrent-1].getPiece().getColor() == this.getColor()){
                    break;
                }else{
                    movesArray.push([this.getXCoordinate(), yCurrent-1])
                    break;
                }
            }else {
                console.log("adding")
                movesArray.push([this.getXCoordinate(), yCurrent-1])
            }
            --yCurrent;
        }

        // Case Four: How far Left can our Rook move?
        while (xCurrent >= 2) {
            console.log("trip case 4")
            if (board[xCurrent-1][this.getYCoordinate()].getPiece().getColor() != "Blank") {
                if(board[xCurrent-1][this.getYCoordinate()].getPiece().getColor() == this.getColor()){
                    break;
                }else{
                    movesArray.push([xCurrent-1, this.getYCoordinate()]);
                    break;
                }
            }else {
                console.log("adding")
                movesArray.push([xCurrent-1, this.getYCoordinate()]);
            }
            --xCurrent;
        }
        console.log("rook moves")
        return movesArray;
    }
}
class Knight extends Piece {
    constructor(xCoordinate, yCoordinate, color) {
        super(xCoordinate, yCoordinate, color);
        this.type = "Knight";
    }
    /**
     * FUNCTION: getMoves()
     * The knight is unique among chess pieces in that it is the only piece that can "jump" other
     * pieces on the board to get to its destination. Knowing this, the only collisions we will check for
     * occur at the Knight's destination square.
     * A knight unfettered by any other pieces has 8 possible move cases:
     * 2 Up, 1 Left; 
     * 2 Up, 1 Right; 
     * 2 Right, 1 Up; 
     * 2 Right, 1 Down; 
     * 2 Down, 1 Right; 
     * 2 Down, 1 Left; 
     * 2 Left, 1 Down; 
     * 2 Left, 1 Up;
     */
    getMoves(board) {
        var movesArray = new Array();
        //Case 1. 2 Up, 1 Left
        if ((this.getXCoordinate() - 1 >= 1) && (this.getYCoordinate() + 2 <= 8)) {
            console.log("trip case one", this.getXCoordinate()-1, this.getYCoordinate() +2 )
            if (board[this.getXCoordinate() - 1][this.getYCoordinate() + 2].getPiece().getColor() != this.getColor()) {
                movesArray.push([(this.getXCoordinate() - 1), (this.getYCoordinate() + 2)])
            }
        }
        // Case 2. 2 Up, 1 Right
        if ((this.getXCoordinate() + 1 <= 8) && (this.getYCoordinate() + 2 <= 8)) {
            if (board[this.getXCoordinate() + 1][this.getYCoordinate() + 2].getPiece().getColor() != this.getColor()) {
                movesArray.push([(this.getXCoordinate() + 1),(this.getYCoordinate() + 2)])
            }
        }
        // Case 3. 2 Right, 1 Up
        if ((this.getXCoordinate() + 2 <= 8) && (this.getYCoordinate() + 1 <= 8)) {
            if (board[this.getXCoordinate() + 2][this.getYCoordinate() + 1].getPiece().getColor() != this.getColor()) {
                movesArray.push([(this.getXCoordinate() + 2), (this.getYCoordinate() + 1)])
            }
        }
        // Case 4. 2 Right, 1 Down
        if ((this.getXCoordinate() + 2 <= 8) && (this.getYCoordinate() - 1 >= 1)) {
            if (board[this.getXCoordinate() + 2][this.getYCoordinate() - 1].getPiece().getColor() != this.getColor()) {
                movesArray.push([(this.getXCoordinate() + 2),(this.getYCoordinate() - 1)])
            }
        }
        // Case 5. 2 Down, 1 Right
        if ((this.getXCoordinate() + 1 <= 8) && (this.getYCoordinate() - 2 >= 1)) {
            if (board[this.getXCoordinate() + 1][this.getYCoordinate() - 2].getPiece().getColor() != this.getColor()) {
                movesArray.push([(this.getXCoordinate() + 1),(this.getYCoordinate() - 2)])
            }
        }
        // Case 6. 2 Down, 1 Left
        if ((this.getXCoordinate() - 1 >= 1) && (this.getYCoordinate() - 2 >= 1)) {
            if (board[this.getXCoordinate() - 1][this.getYCoordinate() - 2].getPiece().getColor() != this.getColor()) {
                movesArray.push([(this.getXCoordinate() - 1),(this.getYCoordinate() - 2)])
            }
        }
        // Case 7. 2 Left, 1 Down
        if ((this.getXCoordinate() - 2 >= 1) && (this.getYCoordinate() - 1 >= 1)) {
            if (board[this.getXCoordinate() - 2][this.getYCoordinate() - 1].getPiece().getColor() != this.getColor()) {
                movesArray.push([(this.getXCoordinate() - 2), (this.getYCoordinate() - 1)])
            }
        }
        // Case 8. 2 Left, 1 Up
        if ((this.getXCoordinate() - 2 >= 1) && (this.getYCoordinate() + 1 <= 8)) {
            if (board[this.getXCoordinate() - 2][this.getYCoordinate() + 1].getPiece().getColor() != this.getColor()) {
                movesArray.push([(this.getXCoordinate() - 2), (this.getYCoordinate() + 1)])
            }
        }
        console.log("knight moves")
        return movesArray
    }
}
class Bishop extends Piece {
    constructor(xCoordinate, yCoordinate, color) {
        super(xCoordinate, yCoordinate, color);
        this.type = "Bishop";
    }
    /**
     * FUNCTION:getMoves()
     * Bishop getMoves uses a FOR loop to iterate through the potential move directions in this order:
     * Up-and-to-the-left, Up-and-to-the-Right, Down-and-to-the-Right, and Down-and-to-the-Left.
     */
    getMoves(board){
        var movesArray = new Array();
        
        for(var i = 0; i < 4; i++) {
            let xCurrent = this.x;
            let yCurrent = this.y;

            switch(i){

                case 0: //Up-and-to-the-left
                    console.log("triggered case 0")
                    while (xCurrent >= 2 && yCurrent <= 7) {
                        console.log(xCurrent, yCurrent)
                         console.log(board[xCurrent][yCurrent].getOccupied(), "get occupied?")
                        if(board[xCurrent-1][yCurrent+1].getOccupied()) {

                            if(board[xCurrent-1][yCurrent+1].getPiece().getColor() == this.getColor()) {
                                break;
                            }
                            else {
                                movesArray.push([xCurrent-1, yCurrent+1]);
                                break;
                            }
                        }
                        else {
                            movesArray.push([xCurrent-1, yCurrent+1]);
                        }
                        --xCurrent;
                        ++yCurrent;
                    }
                break;
                case 1: //Up-and-to-the-Right   
                    while (xCurrent <= 7 && yCurrent <= 7) {
                        if(board[xCurrent+1][yCurrent+1].getOccupied()) {
                            if(board[xCurrent+1][yCurrent+1].getPiece().getColor() == this.getColor()) {
                                break;
                            }
                            else {
                                movesArray.push([xCurrent+1, yCurrent+1]);
                                break;
                            }
                        }
                        else {
                            movesArray.push([xCurrent+1, yCurrent+1]);
                        }
                        ++xCurrent;
                        ++yCurrent;
                    }
                break;
                case 2: //Down-and-to-the-Right
                    while (xCurrent <= 7 && yCurrent >= 2) {
                        if(board[xCurrent+1][yCurrent-1].getOccupied()) {
                            if(board[xCurrent+1][yCurrent-1].getPiece().getColor() == this.getColor()) {
                                break;
                            }
                            else {
                                movesArray.push([xCurrent+1, yCurrent-1]);
                                break;
                            }
                        }
                        else {
                            movesArray.push([xCurrent+1, yCurrent-1])
                        }
                        ++xCurrent;
                        --yCurrent;     
                    }
                break;
                case 3: // Down-and-to-the-Left
                    while (xCurrent >= 2 && yCurrent >= 2) {
                        if(board[xCurrent-1][yCurrent-1].getOccupied()) {
                            if(board[xCurrent-1][yCurrent-1].getPiece().getColor() == this.getColor()) {
                                break;
                            }
                            else {
                                movesArray.push([xCurrent-1, yCurrent-1]);
                                break;
                            }
                        }
                        else {
                            movesArray.push([xCurrent-1, yCurrent-1])

                        }
                        --xCurrent;
                        --yCurrent;
                    }
                break;
            }
        }
        console.log("Bishop moves")
        return movesArray;
    }
}
class Queen extends Piece {
    constructor(xCoordinate, yCoordinate, color) {
        super(xCoordinate, yCoordinate, color);
        this.type = "Queen";
    }
    getMoves(board) {
        var protoRook = new Rook(this.getXCoordinate(), this.getYCoordinate(), this.getColor());
        var protoBishop = new Bishop(this.getXCoordinate(), this.getYCoordinate(), this.getColor());
        var arrayRook = protoRook.getMoves(board);
        var arrayBishop = protoBishop.getMoves(board);
        var movesArray = (arrayRook.concat(arrayBishop));
        return movesArray;
    }
}
class King extends Piece {
    constructor(xCoordinate, yCoordinate, color) {
        super(xCoordinate, yCoordinate, color);
        this.type = "King";

    }
    getMoves(board) {
        var movesArray = new Array();
        // Case 1. Forward [White] / Backward [Black]


        if (this.getYCoordinate() + 1 <= 8) {
            if (board[this.getXCoordinate()][this.getYCoordinate() + 1].getPiece().getColor() != this.getColor()) {
                movesArray.push([this.getXCoordinate(),(this.getYCoordinate() + 1)]);
            }
        }
        // Case 2. Up-and-to-the-Right [White] / Down-and-to-the-Left [Black]
        if ((this.getXCoordinate() + 1 <= 8) && (this.getYCoordinate() + 1 <= 8)) {
            if (board[this.getXCoordinate() + 1][this.getYCoordinate() + 1].getPiece().getColor() != this.getColor()) {
                movesArray.push([(this.getXCoordinate() + 1), (this.getYCoordinate() + 1)]);
            }
        }
        // Case 3. Right [White] / Left [Black]
        if (this.getXCoordinate() + 1 <= 8) {
            if (board[this.getXCoordinate() + 1][this.getYCoordinate()].getPiece().getColor() != this.getColor()) {
                movesArray.push([(this.getXCoordinate() + 1),(this.getYCoordinate())])
            }
        }
        // Case 4. Down-and-to-the-Right [White] / Up-and-to-the-Left [Black]
        if ((this.getXCoordinate() + 1 <= 8) && (this.getYCoordinate() - 1 >= 1)) {
            if (board[this.getXCoordinate() + 1][this.getYCoordinate() - 1].getPiece().getColor() != this.getColor()) {
                movesArray.push([(this.getXCoordinate() + 1),(this.getYCoordinate() - 1)]);
            }
        }
        // Case 5. Backward [White] / Forward [Black]
        if (this.getYCoordinate() - 1 >= 1) {
            if (board[this.getXCoordinate()][this.getYCoordinate() - 1].getPiece().getColor() != this.getColor()) {
                movesArray.push([(this.getXCoordinate()), (this.getYCoordinate() - 1)]);
            }
        }
        // Case 6. Down-and-to-the-Left [White] / Up-and-to-the-Right [Black]
        if ((this.getXCoordinate() - 1 >= 1) && (this.getYCoordinate() - 1 >= 1)) {
            if (board[this.getXCoordinate() - 1][this.getYCoordinate() - 1].getPiece().getColor() != this.getColor()) {
                movesArray.push([(this.getXCoordinate() - 1), (this.getYCoordinate() - 1)]);
            }
        }
        // Case 7. Left [White] / Right [Black]
        if (this.getXCoordinate() - 1 >= 1) {
            if (board[this.getXCoordinate() - 1][this.getYCoordinate()].getPiece().getColor() != this.getColor()) {
                movesArray.push([(this.getXCoordinate() - 1), (this.getYCoordinate())]);
            }
        }
        // Case 8. Up-and-to-the-Left [White] / Down-and-to-the-Right [Black]
        if ((this.getXCoordinate() - 1 >= 1) && (this.getYCoordinate() + 1 <= 8)) {
            if (board[this.getXCoordinate() - 1][this.getYCoordinate() + 1].getPiece().getColor() != this.getColor()) {
                movesArray.push([(this.getXCoordinate() - 1), (this.getYCoordinate() + 1)])
            }
        }

        console.log("king moves")
        return movesArray;
    }
}

module.exports = {Tile, Piece, Blank, Pawn, Rook, Knight, Bishop, Queen, King}