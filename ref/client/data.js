import {Pawn, Rook, Knight, Bishop, Queen, King, Tile} from './pieces.js'

      
const data = {
    
    board: [
        [new Rook("black", 1, 1),
            new Knight("black", 2, 1),
            new Bishop("black", 3, 1),
            new King("black", 4, 1),
            new Queen("black", 5, 1),
            new Bishop("black", 6, 1),
            new Knight("black", 7, 1),
            new Rook("black", 8, 1)],
        [new Pawn("black", 1, 2),
            new Pawn("black", 2, 2),
            new Pawn("black", 3, 2),
            new Pawn("black", 4, 2),
            new Pawn("black", 5, 2),
            new Pawn("black", 6, 2),
            new Pawn("black", 7, 2),
            new Pawn("black", 8, 2)],
        [new Tile(1, 3),new Tile(2, 3),new Tile(3, 3),new Tile(4, 3), new Tile(5, 3),new Tile(6, 3),new Tile(7, 3),new Tile(8, 3)],
        
        [new Tile(1, 4),new Tile(2, 4),new Tile(3, 4),new Tile(4, 4), new Tile(5, 4),new Tile(6, 4),new Tile(7, 4),new Tile(8, 4)],
        
        [new Tile(1, 5),new Tile(2, 5),new Tile(3, 5),new Tile(4, 5), new Tile(5, 5),new Tile(6, 5),new Tile(7, 5),new Tile(8, 5)],
        
        [new Tile(1, 6),new Tile(2, 6),new Tile(3, 6),new Tile(4, 6), new Tile(5, 6),new Tile(6, 6),new Tile(7, 6),new Tile(8, 6)],
        [new Pawn("white", 1, 7),
            new Pawn("white", 2, 7),
            new Pawn("white", 3, 7),
            new Pawn("white", 4, 7),
            new Pawn("white", 5, 7),
            new Pawn("white", 6, 7),
            new Pawn("white", 7, 7),
            new Pawn("white", 8, 7)],
        [new Rook("white", 1, 8),
            new Knight("white", 2, 8),
            new Bishop("white", 3, 8),
            new King("white", 4, 8),
            new Queen("white", 5, 8),
            new Bishop("white", 6, 8),
            new Knight("white", 7, 8),
            new Rook("white", 8, 8)]
    ],
    
    
    
    current: new Tile(0, 0),
    
    //starts at 1 to 8
    moves: [
           ],

    
/*	items: [
            [2,3,4,6,5,4,3,2],
           [1,1,1,1,1,1,1,1],
           [0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
           [11,11,11,11,11,11,11,11],
           [12,13,14,16,15,14,13,12]
           ],
*/
    
    url: "img/brook.png",
    
    col: "blue",
    
    selected: "",
    
/*    pieces: [
            [2,3,4,6,5,4,3,2],
           [1, 1, 1, 1, 1, 1, 1, 1],
           [0,0, 0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
           [11, 11, 11, 11, 11, 11, 11, 11],
           [12,13,14,16,15,14,13,12]
           ],
*/
    
}

export default data












