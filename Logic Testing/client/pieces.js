/*July 9th, 2018 GMKW *****
* Changed id to use a alpha-numeric design. Chess pieces have a coordinate address
* a1, b7, h4, etc. Constructers, getters, and setters use this binomial system to
* make changes. */
export class Tile {
     constructor(alpha, numeric) {
         this.alpha = alpha;
         this.numeric = numeric;
         this.occupied = false;
     }
 }
export class Piece extends Tile {
    constructor(type, color, alpha, numeric) {
        this.type = type;
        this.color = color;
        this.occupied = true;
        this.numberMoves = 0;
        super(alpha, numeric);
    }
    getOccupationStatus() {
        return this.occupied;
    }
    /* validAddress()
    * validAddress returns a list alpha-numeric addresses that can be occupied by this piece.
    * It calculates these addresses based on piece type. It serves as a helper function to
    * getMoves()
    * */
    validAddress() {
        var alphaArray = new Array();
        var numericArray = new Array();
        /**
         * How to check for valid moves. A guide.
         * 1. Check what type of piece
         * 2. Check what Color that piece is
         * 3. Check it's alpha address, can you capture left or right? Is it on the edge?
         * 4. Check it's numeric address, can you move forward?
         */
        if (this.type == "Pawn") {
            // Numeric address is incremented if the color is "White"
            if(this.color == "White") {
                alphaArray.push(this.alpha);
                
            }
        } 
    }
    /*getMoves()
    * getMoves is called on clicking a chess piece. It highlights available
    * tiles for movement or capture. It makes this decision based on piece type and
    * address on the board 
    * */
    getMoves(type, alpha, numeric) {

    }
}
export class Blank extends Piece {

}
export class Pawn extends Piece {
    constructor(type, color, alpha, numeric) {
        super("Pawn", color, alpha, numeric);
        
    }
}
export class Rook extends Piece {
    constructor(type, color, alpha, numeric) {
        super("Rook", color, alpha, numeric);
    }
}
export class Knight extends Piece {
    constructor(type, color, alpha, numeric) {
        super("Knight", color, alpha, numeric);
    }
}
export class Bishop extends Piece {
    constructor(type, color, alpha, numeric) {
        super("Bishop", color, alpha, numeric);
    }
}
export class Queen extends Piece {
    constructor(type, color, alpha, numeric) {
        super("Queen", color, alpha, numeric);
    }
}
export class King extends Piece {
    constructor(type, color, alpha, numeric) {
        super("King", color, alpha, numeric);
    }
}
// export class Piece {
//   constructor(x, y, type, color) {
//       this.x = x;
//       this.y = y;
//       this.type = type;
//       this.color = color;
//   }
//     getId(){
//         return this.color + " " + this.type
//     }
//     getType(){
//         return this.type
//     }
//     getX(){
//         return this.x
//     }
//     getY(){
//         return this.y
//     }
// }

// export class Blank{
//     constructor(){
//     }
    
//     getImg(){
//         return "img/blank.png"
//     }
//     getMoves(x, y){
//         return [[]]
//     }
//     getId(){
//         return 0
//     }
//     getY(){
//         return null
//     }
//     getX(){
//         return null
//     }
// }

// export class Pawn extends Piece{
//     constructor(x, y, type, color, id){
//         super(x, y, type="Pawn", color)
//         this.id = id
//     }
    
//     getImg(){
//         if (this.color == "white")
//             return "img/wpawn.png"
//         else
//             return "img/bpawn.png"
//     }
    
//     getMoves(x, y){
//         if (this.color == "white" && y ==7)
//             return [[x, y-1],[x, y-2]]
//         else if(this.color =="black" && y == 2)
//             return [[x, y+1],[x, y+2]]
//         else if(this.color == "white" && y != 7)
//             return[[x,y-1]]
//         else
//             return [[x, y+1]]
//     }
// }
        
// export class Rook extends Piece{
//     constructor(x, y, type, color, id){
//         super(x, y, type="Rook", color)
//         this.id = id
//     }
    
//     getImg(){
//         if (this.color == "white")
//             return "img/wrook.png"
//         else
//             return "img/brook.png"
//     }
    
//     getMoves(x, y){
//         console.log("getting  move for rook")
//         var tx = x
//         var ty = y
//         var moves = [[8, y],
//                 [x+1-tx, y], [x+2-tx, y], [x+3-tx, y], [x+4-tx, y],
//                 [x+5-tx, y], [x+6-tx, y], [x-tx+7, y],
//                 [x, 8],
//                 [x, y+1-ty], [x, y+2-ty], [x, y+3-ty], [x, y+4-ty],
//                 [x, y+5-ty], [x, y+6-ty], [x, y+7-ty]]
        
//         for (var m = 0; m < moves.length; m++){
//             console.log("in for loop")
//             console.log(moves[m] + " =? " + [x,y])
//             if (moves[m][0] == x && moves[m][1] == y){

//                 console.log("does equal")
//                 moves.splice(m, 1)
//             }
//         }
//         return  moves
//     }
// }
     
// export class Knight extends Piece{
//     constructor(x, y, type, color, id){
//         super(x, y, type="Knight", color)
//         this.id = id
//     }
    
//     getImg(){
//         if (this.color == "white")
//             return "img/wknight.png"
//         else
//             return "img/bknight.png"
//     }
    
//     getMoves(x, y){
//         return [[x-1, y-2], [x+1, y-2], [x-1, y+2], [x+1, y+2], [x-2, y+1], [x-2, y-1], [x+2, y-1], [x+2, y+1]]

//     }
// }
        
// export class Bishop extends Piece{
//     constructor(x, y, type, color, id){
//         super(x, y, type="Bishop", color)
//         this.id = id
//     }
//     getImg(){
//         if (this.color == "white")
//             return "img/wbishop.png"
//         else
//             return "img/bbishop.png"
//     }
    
//     getMoves(x, y){
//         return [[x+1, y+1],[x+2,y+2], [x+3,y+3], [x+4,y+4],
//                 [x+5, y+5], [x+6, y+6],[x+7, y+7],
//                 [x-1, y-1],[x-2,y-2], [x-3,y-3], [x-4,y-4],
//                 [x-5, y-5], [x-6, y-6],[x-7, y-7],
//                 [x+1, y-1],[x+2,y-2], [x+3,y-3], [x+4,y+4],
//                 [x+5, y-5], [x+6, y-6], [x+7, y-7],
//                 [x-1, y+1],[x-2,y+2], [x-3,y+3], [x-4,y+4],
//                 [x-5, y+5], [x-6, y+6], [x-7, y+7]
               
//                ]
//     }
    

// }
        
// export class Queen extends Piece{
//     constructor(x, y, type, color, id){
//         super(x, y, type="Queen", color)
//         this.id = id
//     }
    
//     getImg(){
//         if (this.color == "white")
//             return "img/wqueen.png"
//         else
//             return "img/bqueen.png"
//     }
    
//     getMoves(x, y){     
//         var tx = x
//         var ty = y
//         var moves = [[8, y],
//                 [x+1-tx, y], [x+2-tx, y], [x+3-tx, y], [x+4-tx, y],
//                 [x+5-tx, y], [x+6-tx, y], [x-tx+7, y],
//                 [x, 8],
//                 [x, y+1-ty], [x, y+2-ty], [x, y+3-ty], [x, y+4-ty],
//                 [x, y+5-ty], [x, y+6-ty], [x, y+7-ty],
//                 //Diagnols
//                 [x+1, y+1],[x+2,y+2], [x+3,y+3], [x+4,y+4],
//                 [x+5, y+5], [x+6, y+6],[x+7, y+7],
//                 [x-1, y-1],[x-2,y-2], [x-3,y-3], [x-4,y-4],
//                 [x-5, y-5], [x-6, y-6],[x-7, y-7],
//                 [x+1, y-1],[x+2,y-2], [x+3,y-3], [x+4,y-4],
//                 [x+5, y-5], [x+6, y-6], [x+7, y-7],
//                 [x-1, y+1],[x-2,y+2], [x-3,y+3], [x-4,y+4],
//                 [x-5, y+5], [x-6, y+6], [x-7, y+7]]
        
//         for (var m = 0; m < moves.length; m++){
//             console.log("in for loop")
//             console.log(moves[m] + " =? " + [x,y])
//             if (moves[m][0] == x && moves[m][1] == y){

//                 console.log("does equal")
//                 moves.splice(m, 1)
//             }
//         }
//         return  moves
//     }
// }
        
// export class King extends Piece{
//     constructor(x, y, type, color, id){
//         super(x, y, type="King", color)
//         this.id = id
//     } 
    
//     getImg(){
//         if (this.color == "white")
//             return "img/wking.png"
//         else
//             return "img/bking.png"
//     }
    
//     getMoves(x, y){
//         return [[x+1, y], [x-1, y], [x, y-1], [x, y+1], [x-1, y-1], [x+1, y-1], [x-1, y+1], [x+1, y+1]] 
//     }
    
// }

