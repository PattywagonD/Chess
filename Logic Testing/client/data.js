// const data = {
//     board : [[],[],[],[],[],[],[],[]]
// }
// export default data
// import {Piece, Pawn, Rook, Knight, Bishop, Queen, King, Blank} from './pieces.js'

      
const data = {
    
    board: [
        [new Rook(1, 1, "", "black", 1),
            new Knight(2, 1, "", "black", 1),
            new Bishop(3, 1, "", "black", 1),
            new King(4, 1, "", "black", 1),
            new Queen(5, 1, "", "black", 1),
            new Bishop(6, 1, "", "black", 2),
            new Knight(7, 1, "", "black", 2),
            new Rook(8, 1, "", "black", 2)],
        [new Pawn(1, 2, "", "black", 1),
            new Pawn(1, 2, "", "black", 2),
            new Pawn(1, 2, "", "black", 3),
            new Pawn(1, 2, "", "black", 4),
            new Pawn(1, 2, "", "black", 5),
            new Pawn(1, 2, "", "black", 6),
            new Pawn(1, 2, "", "black", 7),
            new Pawn(1, 2, "", "black", 8)],
        [new Blank(),new Blank(),new Blank(),new Blank(),
            new Blank(),new Blank(),new Blank(),new Blank()],
        [new Blank(),new Blank(),new Blank(),new Blank(),
            new Blank(),new Blank(),new Blank(),new Blank()],
        [new Blank(),new Blank(),new Blank(),new Blank(),
            new Blank(),new Blank(),new Blank(),new Blank()],
        [new Blank(),new Blank(),new Blank(),new Blank(),
            new Blank(),new Blank(),new Blank(),new Blank()],
        [new Pawn(1, 7, "", "white", 1),
            new Pawn(2, 7, "", "white", 2),
            new Pawn(3, 7, "", "white", 3),
            new Pawn(4, 7, "", "white", 4),
            new Pawn(5, 7, "", "white", 5),
            new Pawn(6, 7, "", "white", 6),
            new Pawn(7, 7, "", "white", 7),
            new Pawn(8, 7, "", "white", 8)],
        [new Rook(1, 8, "", "white", 1),
            new Knight(2, 8, "", "white", 1),
            new Bishop(3, 8, "", "white", 1),
            new King(4, 8, "", "white", 1),
            new Queen(5, 8, "", "white", 1),
            new Bishop(6, 8, "", "white", 2),
            new Knight(7, 8, "", "white", 2),
            new Rook(8, 8, "", "white", 2)]
    ],
    
    
    
    current: new Blank(),
    
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