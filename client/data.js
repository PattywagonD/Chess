import {Piece, Pawn, Rook, Knight, Bishop, Queen, King, Blank} from './pieces.js'

      
const data = {
    
    board: [
        [new Rook(0, 6, "", "black", 1),
            new Knight(1, 6, "", "black", 1),
            new Bishop(2, 6, "", "black", 1),
            new King(3, 6, "", "black", 1),
            new Queen(4, 6, "", "black", 1),
            new Bishop(5, 6, "", "black", 2),
            new Knight(6, 6, "", "black", 2),
            new Rook(6, 6, "", "black", 2)],
        [new Pawn(0, 6, "", "black", 1),
            new Pawn(1, 6, "", "black", 2),
            new Pawn(2, 6, "", "black", 3),
            new Pawn(3, 6, "", "black", 4),
            new Pawn(4, 6, "", "black", 5),
            new Pawn(5, 6, "", "black", 6),
            new Pawn(6, 6, "", "black", 7),
            new Pawn(7, 6, "", "black", 8)],
        [new Blank(),new Blank(),new Blank(),new Blank(),
            new Blank(),new Blank(),new Blank(),new Blank()],
        [new Blank(),new Blank(),new Blank(),new Blank(),
            new Blank(),new Blank(),new Blank(),new Blank()],
        [new Blank(),new Blank(),new Blank(),new Blank(),
            new Blank(),new Blank(),new Blank(),new Blank()],
        [new Blank(),new Blank(),new Blank(),new Blank(),
            new Blank(),new Blank(),new Blank(),new Blank()],
        [new Pawn(0, 1, "", "white", 1),
            new Pawn(1, 1, "", "white", 2),
            new Pawn(2, 1, "", "white", 3),
            new Pawn(3, 1, "", "white", 4),
            new Pawn(4, 1, "", "white", 5),
            new Pawn(5, 1, "", "white", 6),
            new Pawn(6, 1, "", "white", 7),
            new Pawn(7, 1, "", "white", 8)],
        [new Rook(0, 1, "", "white", 1),
            new Knight(1, 1, "", "white", 1),
            new Bishop(2, 1, "", "white", 1),
            new King(3, 1, "", "white", 1),
            new Queen(4, 1, "", "white", 1),
            new Bishop(5, 1, "", "white", 2),
            new Knight(6, 1, "", "white", 2),
            new Rook(7, 1, "", "white", 2)]
    ],
    
    
    
    current: [],
    
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












