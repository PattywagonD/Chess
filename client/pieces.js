export class Piece {
  constructor(x, y, type, color) {
      this.x = x;
      this.y = y;
      this.type = type;
      this.color = color;
  }
}

export class Pawn extends Piece{
    constructor(x, y, type="pawn", color, id){
        super(x, y, type, color)
        this.id = id
    }
    
    
    
    
}

