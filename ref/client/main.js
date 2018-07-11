import data from './data.js'
import {Pawn, Rook, Knight, Bishop, Queen, King, Tile} from './pieces.js'

const app = new Vue({
	el: '#app', 
	data,
    
	created() {

	},
	watch: {

	},
	computed: {

	},
	methods: {
                
        getImage: function (index1, index2){
            var in1 = index1 - 1
            var in2 = index2 - 1
            return this.board[in2][in1].getImg()     
        },

    
        getColor: function (num, start) {
            if (start % 2 == 0)    
                if (num % 2 == 0)
                    return "grey lighten-3"

                 else
                     return "green darken-1" 
                     
            else
                if (num % 2 == 0)
                    return "green darken-1"

                 else
                     return "grey lighten-3"
        },
        
        getSelected: function(i, j){
            var image = this.getImage(i, j)
            if (this.board[j-1][i-1].getOccupied() == true){
                this.selected = this.board[j-1][i-1].getImg()
                this.current = this.board[j-1][i-1]
                return
            }
            else
                this.movePiece(i, j)
            console.log("called getSelected")
        },
        
        displayMoves: function(i, j){
            console.log("called displayMoves")
            for (var x = 0; x < this.moves.length; x++) { 
                if (i == this.moves[x][0] && j == this.moves[x][1])
                     return true
            }
            
        },
        
        getMoves: function(i, j){
            var in1 = i - 1
            var in2 = j - 1
            console.log("called getMoves")
            this.moves = this.board[in2][in1].getMoves(i,j)
            //Refine moves from all moves to moves based off pieces on board

            // Original List for debugging
            for (var x = 0; x < this.moves.length; x++){
                console.log("x position is " + this.moves[x][0] + " and y position is " + this.moves[x][1])
            }
            
            //Moves only inside board
            this.moves = this.moves.filter(function(move) { 
                var x = 0
                var y = 1
                if ((move[x] > 8 || move[x] < 1) || (move[y] > 8 || move[y] < 1)) {
                    return false
                }
                return true
            })
            
            console.log("Moves only inside board")
            //List for debugging after first filter for debuggin
            for (var k = 0; k < this.moves.length; k++){
                console.log("x position is " + this.moves[k][0] + " and y position is " + this.moves[k][1])
            }
            
           for (var move = 0; move < this.moves.length; move++){
                var x = 0
                var y = 1
                var blockerx = i
                var blockery = j
                // Find every piece that collides
                if(this.board[this.moves[move][y]-1][this.moves[move][x]-1].getOccupied() == true){
                    console.log("Collision index is "+ this.moves[move][y] + ' ' + this.moves[move][x])
                    
                    //Filter everything behind blocked piece
                    //this.moves = this.moves.filter(function(move) { 
                        //var x = 0
                       // var y = 1
                        //if (move[x] > this.moves[move][x]){
                         //   return false
                       // }
                       // return true
                   // })
                    
                    
                    
                  //  blockery = this.moves[move][y]
                  //  blockerx = this.moves[move][x]
                   // console.log(blockery, blockerx)
                    
            }}
            
            console.log("Final set of Possible moves")
            //List for debugging after first filter for debuggin
            for (var k = 0; k < this.moves.length; k++){
                console.log("x position is " + this.moves[k][0] + " and y position is " + this.moves[k][1])
            }
    
            
            
        },
        
        movePiece: function(i, j){
            // Loop through each possible move
            for(var move = 0; move < this.moves.length; move++){
                // compare the current moves x & y with the square's x and y that was clicked 
                if(this.moves[move][0] == i && this.moves[move][1] == j && this.board[j-1][i-1].getOccupied() == false){
                    // if they match set the board to the piece that is the current
                    this.board[j-1][i-1] = this.current
                    // Delete piece that was just moved and set the new pieces' x and y 
                    this.board[this.current.getNumeric()-1][this.current.getAlpha()-1] = new Tile()
                    this.current = new Tile(0,0)
                    this.board[j-1][i-1].setAlpha(i)
                    this.board[j-1][i-1].setNumeric(j)
                }
            }
        },
        
        gameLogic: function(i , j){
            this.getSelected(i, j)
            this.getMoves(i, j)
        }

}

})




