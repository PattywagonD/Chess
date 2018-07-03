export class Piece {
  constructor(x, y, type, color) {
      this.x = x;
      this.y = y;
      this.type = type;
      this.color = color;
  }
    getId(){
        return this.color + " " + this.type
    }
}

export class Blank{
    constructor(){
    }
    
    getImg(){
        return "img/blank.png"
    }
    getMoves(x, y){
        return [[]]
    }
    getId(){
        return "nothing"
    }
}

export class Pawn extends Piece{
    constructor(x, y, type, color, id){
        super(x, y, type="pawn", color)
        this.id = id
    }
    
    getImg(){
        if (this.color == "white")
            return "img/wpawn.png"
        else
            return "img/bpawn.png"
    }
    
    getMoves(x, y){
        if (this.color == "white")
            return [[x, y-1], [x, y-2]]
        else
            return [[x, y+1], [x, y+2]]
    }
}
        
export class Rook extends Piece{
    constructor(x, y, type, color, id){
        super(x, y, type="rook", color)
        this.id = id
    }
    
    getImg(){
        if (this.color == "white")
            return "img/wrook.png"
        else
            return "img/brook.png"
    }
    
    getMoves(x, y){
        for (var i = x; i < 8; i++) { 
                
            }
        return [[3,3]]
    }
}
     
export class Knight extends Piece{
    constructor(x, y, type, color, id){
        super(x, y, type="knight", color)
        this.id = id
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
        
export class Bishop extends Piece{
    constructor(x, y, type, color, id){
        super(x, y, type="bishop", color)
        this.id = id
    }
    getImg(){
        if (this.color == "white")
            return "img/wbishop.png"
        else
            return "img/bbishop.png"
    }
    
    getMoves(x, y){
        return [[2,5]]
    }
    

}
        
export class Queen extends Piece{
    constructor(x, y, type, color, id){
        super(x, y, type="queen", color)
        this.id = id
    }
    
    getImg(){
        if (this.color == "white")
            return "img/wqueen.png"
        else
            return "img/bqueen.png"
    }
    
    getMoves(x, y){
        return [[1,1]]
    }
}
        
export class King extends Piece{
    constructor(x, y, type, color, id){
        super(x, y, type="king", color)
        this.id = id
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

