class Tile {
     constructor(alpha, numeric) {
         this.alpha = alpha
         this.numeric = numeric
         this.occupied = false
     }
    getImg(){
        return "img/blank.png"
    }
    getMoves(x, y){
        return [[]]
    }
    getOccupied(){
        return this.occupied
    }
    getNumeric(){
        return this.numeric
    }
    getAlpha(){
        return this.alpha
    }
    setAlpha(a){
        this.alpha = a
    }
    setNumeric(n){
        this.numeric = n
    }
}


class Piece extends Tile {
    constructor(color, alpha, numeric, type){
        super(alpha, numeric);
        this.type = type;
        this.color = color;
        this.occupied = true
    }

}

class Pawn extends Piece {
    constructor(color, alpha, numeric, type="Pawn") {
        super(color, alpha, numeric, type);

    }
    getMoves(x, y){
        return []
    }
}



class Rook extends Piece {
    constructor(color, alpha, numeric, type="Rook") {
        super(color, alpha, numeric, type);
    }
    
    getMoves(x, y){
        return  []
    }
}

class Knight extends Piece {
    constructor(color, alpha, numeric, type="Knight") {
        super(color, alpha, numeric, type);
    }
    
    getMoves(x, y){
        return []

    }
}
class Bishop extends Piece {
    constructor(color, alpha, numeric, type="Bishop") {
        super(color, alpha, numeric, type)
    }
    getMoves(x, y){
        return []
    }
}

class Queen extends Piece {
    constructor(color, alpha, numeric, type="Queen") {
        super(color, alpha, numeric, type)
    }
    getMoves(x, y){     
        return  []
    }
}

class King extends Piece {
    constructor(color, alpha, numeric, type="King") {
        super(color, alpha, numeric, type)
    }
    
    getMoves(x, y){
        return [] 
    }
}

module.exports = {Tile, Piece, Pawn, Rook, Knight, Bishop, Queen, King}