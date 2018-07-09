import {Pawn, Rook, Knight, Bishop, Queen, King, Tile} from './pieces.js'

      
const data = {
    
    board: [
        [new Rook("black", "a", 1),
            new Knight("black", "b", 1),
            new Bishop("black", "c", 1),
            new King("black", "d", 1),
            new Queen("black", "e", 1),
            new Bishop("black", "f", 1),
            new Knight("black", "g", 1),
            new Rook("black", "h", 1)],
        [new Pawn("black", "a", 2),
            new Pawn("black", "b", 2),
            new Pawn("black", "c", 2),
            new Pawn("black", "d", 2),
            new Pawn("black", "e", 2),
            new Pawn("black", "f", 2),
            new Pawn("black", "g", 2),
            new Pawn("black", "h", 2)],
        [new Tile("a", 2),new Tile("a", 2),new Tile("a", 2),new Tile("a", 2),
            new Tile("a", 2),new Tile("a", 2),new Tile("a", 2),new Tile("a", 2)],
        [new Tile("a", 2),new Tile("a", 2),new Tile("a", 2),new Tile("a", 2),
            new Tile("a", 2),new Tile("a", 2),new Tile("a", 2),new Tile("a", 2)],
        [new Tile("a", 2),new Tile("a", 2),new Tile("a", 2),new Tile("a", 2),
            new Tile("a", 2),new Tile("a", 2),new Tile("a", 2),new Tile("a", 2)],
        [new Tile("a", 2),new Tile("a", 2),new Tile("a", 2),new Tile("a", 2),
            new Tile("a", 2),new Tile("a", 2),new Tile("a", 2),new Tile("a", 2)],
        [new Pawn("white", "a", 7),
            new Pawn("white", "b", 7),
            new Pawn("white", "c", 7),
            new Pawn("white", "d", 7),
            new Pawn("white", "e", 7),
            new Pawn("white", "f", 7),
            new Pawn("white", "g", 7),
            new Pawn("white", "h", 7)],
        [new Rook("white", "a", 8),
            new Knight("white", "b", 8),
            new Bishop("white", "c", 8),
            new King("white", "d", 8),
            new Queen("white", "e", 8),
            new Bishop("white", "f", 8),
            new Knight("white", "g", 8),
            new Rook("white", "h", 8)]
    ],
    
    
    
    current: new Tile("a", 1),
    
    //starts at 1 to 8
    moves: [
           ],

    
	items: [
            [2,3,4,6,5,4,3,2],
           [1,1,1,1,1,1,1,1],
           [0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
           [11,11,11,11,11,11,11,11],
           [12,13,14,16,15,14,13,12]
           ],
    
    url: "img/brook.png",
    
    col: "blue",
    
    selected: "",
    
    pieces: [
            [2,3,4,6,5,4,3,2],
           [1, 1, 1, 1, 1, 1, 1, 1],
           [0,0, 0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
           [11, 11, 11, 11, 11, 11, 11, 11],
           [12,13,14,16,15,14,13,12]
           ],
    
}

export default data












