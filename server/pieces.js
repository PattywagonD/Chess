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
}


class Piece {
    constructor(xCoordinate, yCoordinate, color, type) {
        this.x = xCoordinate;
        this.y = yCoordinate;
        this.color = color;
        this.type = type;
        this.numberOfMoves = 0;
    }
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
}

class Blank extends Piece {
    constructor(xCoordinate, yCoordinate){
        super(xCoordinate, yCoordinate, "Blank", "Empty");
    }
}

class Pawn extends Piece {
    constructor(xCoordinate, yCoordinate, color) {
        super(1, xCoordinate, yCoordinate, color);
        this.type = "Pawn";
        this.numberMoves = 0;
    }

    getMoves(board){
        movesArray = new Array();
        if(this.color == "White") {
            // Case 1.White : Capture a piece to your left
            if ((this.getXCoordinate() - 1 >= 1) && (this.getYCoordinate() + 1 <= 8)) {  
                if (board[this.getXCoordinate() - 1][this.getYCoordinate() + 1].piece.color == "Black") {
                    movesArray.push({x : (this.getXCoordinate() - 1), y : (this.getYCoordinate() + 1)});
                }
            }
            // Case 2.White Move forward
            if ((this.getYCoordinate() + 1) >= 1) { 
                if (!(board[this.getXCoordinate()][this.getYCoordinate() + 1].getOccupied())) { // 2.a Move forward 1 space
                    movesArray.push({x : (this.getXCoordinate()), y : (this.getYCoordinate() + 1)});
                    // 2.b Move forward 2 spaces; only possibly true if case 2.a is also true
                    if ((this.getNumberOfMoves() < 1) && !(board[this.getXCoordinate()][this.getYCoordinate() - 2].getOccupied())) {
                        movesArray.push({x : (this.getXCoordinate()), y : (this.getYCoordinate() + 2)});
                    }
                }
            }
            // Case 3.White : Capture a piece to your right
            if ((this.getXCoordinate() + 1 <= 8) && (this.getYCoordinate() + 1 <= 8)) {
                if (board[this.getXCoordinate() + 1][this.getYCoordinate() + 1].piece.color == "Black") {
                    movesArray.push({x : (this.getXCoordinate() + 1), y : (this.getYCoordinate() + 1)});
                }
            }
        }
        else if (this.color == "Black") {
            // Case 1.Black : Capture a piece to your left
            if((this.x - 1 >= 1) && (this.y - 1 >= 1)) {  
                if (board[this.x - 1][this.y - 1].piece.color == "White") {
                    movesArray.push({x : (this.x - 1), y : (this.y - 1)});
                }
            }
            // Case 2.Black Move forward
            if ((this.getYCoordinate() - 1) >= 1) { 
                if (!(board[this.getXCoordinate()][this.getYCoordinate() - 1].getOccupied())) { // 2.a Move forward 1 space
                    movesArray.push({x : (this.getXCoordinate()), y : (this.getYCoordinate() - 1)});
                    // 2.b Move forward 2 spaces; only true if case 2.a is also true
                    if ((this.getNumberOfMoves() < 1) && !(board[this.getXCoordinate()][this.getYCoordinate() - 2].getOccupied())) {
                        movesArray.push({x : (this.getXCoordinate()), y : (this.getYCoordinate() - 1)});
                    }
                }
            }
            // Case 3. Capture a piece to your right
            if ((this.getXCoordinate() + 1 <= 8) && (this.getYCoordinate() - 1 >= 1)) {
                if (board[this.getXCoordinate() + 1][this.getYCoordinate() - 1].piece.color == "White") {
                    movesArray.push({x : (this.getXCoordinate() + 1), y : (this.getYCoordinate() - 1)});
                }
            }
        }
        return movesArray;
    }
}
class Rook extends Piece {
    constructor (xCoordinate, yCoordinate, color) {
        super(1, xCoordinate, yCoordinate, color);
        this.type = "Rook";
    }
    /**
     * FUNCTION: getMoves() 
     * Rook getMoves() function uses a "Compass Rose" implementation to push moves to the moves array.
     * This mean moves are added Up, Right, Down, and then Left. Important to keep in mind for other objects
     * that will be using these pieces.
     */
    getMyMoves(board) {
        movesArray = new Array();
        let xCurrent = this.getXCoordinate();
        let yCurrent = this.getYCoordinate();
        // Case One: Can the Rook move Forward? If so how far?
        while (yCurrent <= 8) {
            ++yCurrent;
            if (board[this.getXCoordinate()][yCurrent].getOccupied()) {
                break;
            }
            else {
                movesArray.push({x : this.getXCoordinate(), y : yCurrent});
            }
        }
        // Case Two: How far Right can the Rook move?
        while (xCurrent <= 8) {
            ++xCurrent;
            if (board[xCurrent][this.getYCoordinate()].getOccupied()) {
                break;
            }
            else {
                movesArray.push({x : xCurrent, y : this.getYCoordinate()});
            }
        }
        let xCurrent = this.getXCoordinate();
        let yCurrent = this.getYCoordinate();
        // Case Three: Can the Rook move Backward? To what degree?
        while (yCurrent >= 1) {
            --yCurrent;
            if (board[this.getXCoordinate()][yCurrent].getOccupied()) {
                break;
            }
            else {
                movesArray.push({x : this.getXCoordinate(), y : yCurrent});
            }
        }
        // Case Four: How far Left can our Rook move?
        while (xCurrent >= 1) {
            --xCurrent;
            if (board[xCurrent][this.getYCoordinate()].getOccupied()) {
                break;
            }
            else {
                movesArray.push({x : xCurrent, y : this.getYCoordinate()});
            }
        }
        return movesArray;
    }
}
class Knight extends Piece {
    constructor(xCoordinate, yCoordinate, color) {
        super(1, xCoordinate, yCoordinate, color);
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
        movesArray = new Array();
        // Case 1. 2 Up, 1 Left
        if ((this.getXCoordinate() - 1 >= 1) && (this.getYCoordinate() + 2 <= 8)) {
            if (board[this.getXCoordinate() - 1][this.getYCoordinate() + 2].getColor() != this.getColor()) {
                movesArray.push({x : (this.getXCoordinate() - 1), y : (this.getYCoordinate() + 2)})
            }
        }
        // Case 2. 2 Up, 1 Right
        if ((this.getXCoordinate() + 1 <= 8) && (this.getYCoordinate() + 2 <= 8)) {
            if (board[this.getXCoordinate() + 1][this.getYCoordinate() + 2].getColor() != this.getColor()) {
                movesArray.push({x : (this.getXCoordinate() + 1), y : (this.getYCoordinate() + 2)})
            }
        }
        // Case 3. 2 Right, 1 Up
        if ((this.getXCoordinate() + 2 <= 8) && (this.getYCoordinate() + 1 <= 8)) {
            if (board[this.getXCoordinate() + 2][this.getYCoordinate() + 1].getColor() != this.getColor()) {
                movesArray.push({x : (this.getXCoordinate() + 2), y : (this.getYCoordinate() + 1)})
            }
        }
        // Case 4. 2 Right, 1 Down
        if ((this.getXCoordinate() + 2 <= 8) && (this.getYCoordinate() - 1 >= 1)) {
            if (board[this.getXCoordinate() + 2][this.getYCoordinate() - 1].getColor() != this.getColor()) {
                movesArray.push({x : (this.getXCoordinate() + 2), y : (this.getYCoordinate() - 1)})
            }
        }
        // Case 5. 2 Down, 1 Right
        if ((this.getXCoordinate() + 1 <= 8) && (this.getYCoordinate() - 2 >= 1)) {
            if (board[this.getXCoordinate() + 1][this.getYCoordinate() - 2].getColor() != this.getColor()) {
                movesArray.push({x : (this.getXCoordinate() + 1), y : (this.getYCoordinate() - 2)})
            }
        }
        // Case 6. 2 Down, 1 Left
        if ((this.getXCoordinate() - 1 >= 1) && (this.getYCoordinate() - 2 >= 1)) {
            if (board[this.getXCoordinate() - 1][this.getYCoordinate() - 2].getColor() != this.getColor()) {
                movesArray.push({x : (this.getXCoordinate() - 1), y : (this.getYCoordinate() - 2)})
            }
        }
        // Case 7. 2 Left, 1 Down
        if ((this.getXCoordinate() - 2 >= 1) && (this.getYCoordinate() - 1 >= 1)) {
            if (board[this.getXCoordinate() - 2][this.getYCoordinate() - 1].getColor() != this.getColor()) {
                movesArray.push({x : (this.getXCoordinate() - 2), y : (this.getYCoordinate() - 1)})
            }
        }
        // Case 8. 2 Left, 1 Up
        if ((this.getXCoordinate() - 2 >= 1) && (this.getYCoordinate() + 1 <= 8)) {
            if (board[this.getXCoordinate() - 2][this.getYCoordinate() + 1].getColor() != this.getColor()) {
                movesArray.push({x : (this.getXCoordinate() - 2), y : (this.getYCoordinate() + 1)})
            }
        }
    }
}
class Bishop extends Piece {
    constructor(xCoordinate, yCoordinate, color) {
        super(1, xCoordinate, yCoordinate, color);
        this.type = "Bishop";
    }
    /**
     * FUNCTION:getMoves()
     * Bishop getMoves uses a FOR loop to iterate through the potential move directions in this order:
     * Up-and-to-the-left, Up-and-to-the-Right, Down-and-to-the-Right, and Down-and-to-the-Left.
     */
    getMoves(board){
        movesArray = new Array();
        
        for(var i = 0; i < 4; i++) {
            let xCurrent = this.x;
            let yCurrent = this.y;

            switch(i){

                case 0: //Up-and-to-the-left
                    while (xCurrent >= 1 && yCurrent <= 8) {
                        --xCurrent;
                        ++yCurrent;
                        if(board[xCurrent][yCurrent].getOccupied()) {
                            break;
                        }
                        else {
                            movesArray.push({x : xCurrent, y : yCurrent})
                        }
                    }
                break;
                case 1: //Up-and-to-the-Right   
                    while (xCurrent <= 8 && yCurrent <= 8) {
                        ++xCurrent;
                        ++yCurrent;
                        if(board[xCurrent][yCurrent].getOccupied()) {
                            break;
                        }
                        else {
                            movesArray.push({x : xCurrent, y : yCurrent})
                        }
                    }
                break;
                case 2: //Down-and-to-the-Right
                    while (xCurrent <= 8 && yCurrent >= 1) {
                        ++xCurrent;
                        --yCurrent;
                        if(board[xCurrent][yCurrent].getOccupied()) {
                            break;
                        }
                        else {
                            movesArray.push({x : xCurrent, y : yCurrent})
                        }                    }
                break;
                case 3: // Down-and-to-the-Left
                while (xCurrent >= 1 && yCurrent >= 1) {
                    --xCurrent;
                    --yCurrent;
                    if(board[xCurrent][yCurrent].getOccupied()) {
                        break;
                    }
                    else {
                        movesArray.push({x : xCurrent, y : yCurrent})
                    }                
                }
            }
        }
        return movesArray;
    }
}
class Queen extends Piece {
    constructor(xCoordinate, yCoordinate, color) {
        super(1, xCoordinate, yCoordinate, color);
        this.type = "Queen";
    }
    getMoves(board) {
        protoRook = new Rook(this.getXCoordinate(), this.getYCoordinate(), this.getColor());
        protoBishop = new Bishop(this.getXCoordinate(), this.getYCoordinate(), this.getColor());
        arrayRook = protoRook.getMoves(board);
        arrayBishop = protoBishop.getMoves(board);
        movesArray = (arrayRook.concat(arrayBishop));
        return movesArray;
    }
}
class King extends Piece {
    constructor(xCoordinate, yCoordinate, color) {
        super(1, xCoordinate, yCoordinate, color);
        this.type = "King";

    }
    getMoves(board) {
        // Case 1. Forward [White] / Backward [Black]
        if (this.getYCoordinate() + 1 <= 8) {
            if (board[this.getXCoordinate()][this.getYCoordinate() + 1].getColor() != this.getColor()) {
                movesArray.push({x : this.getXCoordinate(), y : (this.getYCoordinate() + 1)})
            }
        }
        // Case 2. Up-and-to-the-Right [White] / Down-and-to-the-Left [Black]
        if ((this.getXCoordinate() + 1 <= 8) && (this.getYCoordinate() + 1 <= 8)) {
            if (board[this.getXCoordinate() + 1][this.getYCoordinate() + 1].getColor() != this.getColor()) {
                movesArray.push({x : (this.getXCoordinate() + 1), y : (this.getYCoordinate() + 1)})
            }
        }
        // Case 3. Right [White] / Left [Black]
        if (this.getXCoordinate() + 1 <= 8) {
            if (board[this.getXCoordinate() + 1][this.getYCoordinate()].getColor() != this.getColor()) {
                movesArray.push({x : (this.getXCoordinate() + 1), y : (this.getYCoordinate())})
            }
        }
        // Case 4. Down-and-to-the-Right [White] / Up-and-to-the-Left [Black]
        if ((this.getXCoordinate() + 1 <= 8) && (this.getYCoordinate() - 1 >= 1)) {
            if (board[this.getXCoordinate() + 1][this.getYCoordinate() - 1].getColor() != this.getColor()) {
                movesArray.push({x : (this.getXCoordinate() + 1), y : (this.getYCoordinate() - 1)});
            }
        }
        // Case 5. Backward [White] / Forward [Black]
        if (this.getYCoordinate() - 1 >= 1) {
            if (board[this.getXCoordinate()][this.getYCoordinate() - 1].getColor() != this.getColor()) {
                movesArray.push({x : (this.getXCoordinate() + 1), y : (this.getYCoordinate() - 1)});
            }
        }
        // Case 6. Down-and-to-the-Left [White] / Up-and-to-the-Right [Black]
        if ((this.getXCoordinate() - 1 >= 1) && (this.getYCoordinate() - 1 >= 1)) {
            if (board[this.getXCoordinate() - 1][this.getYCoordinate() - 1].getColor() != this.getColor()) {
                movesArray.push({x : (this.getXCoordinate() - 1), y : (this.getYCoordinate() - 1)});
            }
        }
        // Case 7. Left [White] / Right [Black]
        if (this.getXCoordinate() - 1 >= 1) {
            if (board[this.getXCoordinate() - 1][this.getYCoordinate()].getColor() != this.getColor()) {
                movesArray.push({x : (this.getXCoordinate() - 1), y : (this.getYCoordinate())});
            }
        }
        // Case 8. Up-and-to-the-Left [White] / Down-and-to-the-Right [Black]
        if ((this.getXCoordinate() - 1 >= 1) && (this.getYCoordinate() + 1 <= 8)) {
            if (board[this.getXCoordinate() - 1][this.getYCoordinate() + 1].getColor() != this.getColor()) {
                movesArray.push({x : (this.getXCoordinate() - 1), y : (this.getYCoordinate() + 1)})
            }
        }
        return movesArray;
    }
}

module.exports = {Tile, Piece, Blank, Pawn, Rook, Knight, Bishop, Queen, King}