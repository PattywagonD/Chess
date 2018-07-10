export class Tile {
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


export class Piece extends Tile {
    constructor(color, alpha, numeric, type){
        super(alpha, numeric);
        this.type = type;
        this.color = color;
        this.occupied = true
    }

}
export class Pawn extends Piece {
    constructor(color, alpha, numeric, type="Pawn") {
        super(color, alpha, numeric, type);

    }
    
    getImg(){
        if (this.color == "white")
            return "img/wpawn.png"
        else
            return "img/bpawn.png"
    }
    
    getMoves(x, y){
        if (this.color == "white" && y ==7)
            return [[x, y-1],[x, y-2]]
        else if(this.color =="black" && y == 2)
            return [[x, y+1],[x, y+2]]
        else if(this.color == "white" && y != 7)
            return[[x,y-1]]
        else
            return [[x, y+1]]
    }
}



export class Rook extends Piece {
    constructor(color, alpha, numeric, type="Rook") {
        super(color, alpha, numeric, type);
    }
    getImg(){
        if (this.color == "white")
            return "img/wrook.png"
        else
            return "img/brook.png"
    }
    
    getMoves(x, y){
        console.log("getting  move for rook")
        var tx = x
        var ty = y
        var moves = [[8, y],
                [x+1-tx, y], [x+2-tx, y], [x+3-tx, y], [x+4-tx, y],
                [x+5-tx, y], [x+6-tx, y], [x-tx+7, y],
                [x, 8],
                [x, y+1-ty], [x, y+2-ty], [x, y+3-ty], [x, y+4-ty],
                [x, y+5-ty], [x, y+6-ty], [x, y+7-ty]]
        
        for (var m = 0; m < moves.length; m++){
            console.log("in for loop")
            console.log(moves[m] + " =? " + [x,y])
            if (moves[m][0] == x && moves[m][1] == y){

                console.log("does equal")
                moves.splice(m, 1)
            }
        }
        return  moves
    }
}
export class Knight extends Piece {
    constructor(color, alpha, numeric, type="Knight") {
        super(color, alpha, numeric, type);
    }
    getImg(){
        if (this.color == "white")
            return "img/wknight.png"
        else
            return "img/bknight.png"
    }
    
    getMoves(x, y){
        return [[x-1, y-2], [x+1, y-2], [x-1, y+2], [x+1, y+2], [x-2, y+1], [x-2, y-1], [x+2, y-1], [x+2, y+1]]

    }
}

export class Bishop extends Piece {
    constructor(color, alpha, numeric, type="Bishop") {
        super(color, alpha, numeric, type)
        this.occupied = true
    }
    getImg(){
        if (this.color == "white")
            return "img/wbishop.png"
        else
            return "img/bbishop.png"
    }
    
    getMoves(x, y){
        return [[x+1, y+1],[x+2,y+2], [x+3,y+3], [x+4,y+4],
                [x+5, y+5], [x+6, y+6],[x+7, y+7],
                [x-1, y-1],[x-2,y-2], [x-3,y-3], [x-4,y-4],
                [x-5, y-5], [x-6, y-6],[x-7, y-7],
                [x+1, y-1],[x+2,y-2], [x+3,y-3], [x+4,y+4],
                [x+5, y-5], [x+6, y-6], [x+7, y-7],
                [x-1, y+1],[x-2,y+2], [x-3,y+3], [x-4,y+4],
                [x-5, y+5], [x-6, y+6], [x-7, y+7]
               
               ]
    }
}
export class Queen extends Piece {
    constructor(color, alpha, numeric, type="Queen") {
        super(color, alpha, numeric, type)
    }
    getImg(){
        if (this.color == "white")
            return "img/wqueen.png"
        else
            return "img/bqueen.png"
    }
    getMoves(x, y){     
        var tx = x
        var ty = y
        var moves = [[8, y],
                [x+1-tx, y], [x+2-tx, y], [x+3-tx, y], [x+4-tx, y],
                [x+5-tx, y], [x+6-tx, y], [x-tx+7, y],
                [x, 8],
                [x, y+1-ty], [x, y+2-ty], [x, y+3-ty], [x, y+4-ty],
                [x, y+5-ty], [x, y+6-ty], [x, y+7-ty],
                //Diagnols
                [x+1, y+1],[x+2,y+2], [x+3,y+3], [x+4,y+4],
                [x+5, y+5], [x+6, y+6],[x+7, y+7],
                [x-1, y-1],[x-2,y-2], [x-3,y-3], [x-4,y-4],
                [x-5, y-5], [x-6, y-6],[x-7, y-7],
                [x+1, y-1],[x+2,y-2], [x+3,y-3], [x+4,y-4],
                [x+5, y-5], [x+6, y-6], [x+7, y-7],
                [x-1, y+1],[x-2,y+2], [x-3,y+3], [x-4,y+4],
                [x-5, y+5], [x-6, y+6], [x-7, y+7]]
        
        for (var m = 0; m < moves.length; m++){
            //console.log("in for loop")
            //console.log(moves[m] + " =? " + [x,y])
            if (moves[m][0] == x && moves[m][1] == y){
                //console.log("does equal")
                moves.splice(m, 1)
            }
        }
        return  moves
    }
}

export class King extends Piece {
    constructor(color, alpha, numeric, type="King") {
        super(color, alpha, numeric, type)
    }
    getImg(){
        if (this.color == "white")
            return "img/wking.png"
        else
            return "img/bking.png"
    }
    
    getMoves(x, y){
        return [[x+1, y], [x-1, y], [x, y-1], [x, y+1], [x-1, y-1], [x+1, y-1], [x-1, y+1], [x+1, y+1]] 
    }
}



