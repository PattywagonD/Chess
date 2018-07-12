/**
 * pieces.js
 * This file defines the properties and behaviors of individual chess pieces. For our implementation, a blank tile
 * is just as much a piece as any other tile.
 */
/**
 * VARIABLES
 * occupied - a boolean value that is true if a chess piece inhabits the tile, and false if there is no chess piece on the tile
 * 
 * x - Represents the value of the x coordinate for the specific tile object.
 *
 */


export class Tile {
    constructor(occupied, xCoordinate, yCoordinate) {
        this.occupied = occupied;
        this.x = xCoordinate;
        this.y = yCoordinate; 
    }
}

export class Piece extends Tile {
    constructor(xCoordinate, yCoordinate, color, type) {
        super(1, xCoordinate, yCoordinate);
        this.color = color;
        this.type = type;
        this.numberMoves = 0;
    }
}

export class Empty extends Piece {
    constructor(xCoordinate, yCoordinate){
        super(xCoordinate, yCoordinate, "Blank", "Empty");
    }
}

export class Pawn extends Piece {
    constructor(xCoordinate, yCoordinate, color) {
        super(1, xCoordinate, yCoordinate, color);
        this.type = "Pawn";
    }
    getMyMoves(){
        movesArray = new Array();
        // Special case: Pawn can move forward 2 if it's in initial position
        if((this.numberMoves == 0) && (this.color == "White")) {
            movesArray.push({x = this.x + 0, y = this.y + 2});
        }
        else if ((this.numberMoves == 0) && (this.color == "Black")) {
            movesArray.push({x = this.x + 0, y = this.y - 2});
        }
        if(this.color == "White") {
            movesArray.push({x = this.x + 0, y = this.y + 1});
        }
        else if(this.color == "Black") {
            movesArray.push({x = this.x + 0, y = this.y - 1});
        }
        return movesArray;
    }
    getMyCaptures() {
        captureArray = new Array();
        if(this.color == "White") {
            
        }
    }
}
export class Rook extends Piece {
    constructor(xCoordinate, yCoordinate, color) {
        super(1, xCoordinate, yCoordinate, color);
        this.type = "Rook";
    }
}
export class Knight extends Piece {
    constructor(xCoordinate, yCoordinate, color) {
        super(1, xCoordinate, yCoordinate, color);
        this.type = "Knight";
    }
}
export class Bishop extends Piece {
    constructor(xCoordinate, yCoordinate, color) {
        super(1, xCoordinate, yCoordinate, color);
        this.type = "Bishop";
    }
}
export class Queen extends Piece {
    constructor(xCoordinate, yCoordinate, color) {
        super(1, xCoordinate, yCoordinate, color);
        this.type = "Queen";
    }
}
export class King extends Piece {
    constructor(xCoordinate, yCoordinate, color) {
        super(1, xCoordinate, yCoordinate, color);
        this.type = "King";
    }
}