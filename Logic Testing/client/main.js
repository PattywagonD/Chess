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
            //var collision = []
            //for (var i = 0; i < this.moves.length; x++){
                //if(this.board[this.moves[i][0] == ??? && this.board[this.moves[i][1] == ???]]){
                    //if the board index is the same as the move index flag a collision               
                //}
            //}
            
            
        },
        
        movePiece: function(i, j){
            for(var move = 0; move < this.moves.length; move++){
                if(this.moves[move][0] == i && this.moves[move][1] == j){
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




