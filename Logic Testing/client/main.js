// import {Tile, Pawn, Rook, Knight, Bishop, Queen, King} from "./pieces.js"
// import data from './data.js'
// const app = new Vue({
//     el: '#app',
//     data,

//     methods: {
//         getGameLogic() {
            
//         }
//     }
// })

import data from './data.js'
import {Piece, Pawn, Rook, Knight, Bishop, Queen, King, Blank} from './pieces.js'




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
            if (this.board[j-1][i-1].getId() != 0){
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
                //console.log(i,j , "=", this.moves[x][0],this.moves[x][1], x)
                if (i == this.moves[x][0] && j == this.moves[x][1])
                     return true
            }
            
        },
        
        getMoves: function(i, j){
            var in1 = i - 1
            var in2 = j - 1
            console.log("called getMoves")
            this.moves = this.board[in2][in1].getMoves(i,j)
            console.log(this.moves  )
            
        },
        
        movePiece: function(i, j){
            for(var move = 0; move < this.moves.length; move++){
                if(this.moves[move][0] == i && this.moves[move][1] == j){
                    this.board[j-1][i-1] = this.current
                    // Need to delete old piece and change current piece x and ys 
                    console.log(this.current.getX(), this.current.getY())
                    this.board[this.current.getX()][this.current.getY()] = new Blank()
                    this.current = new Blank()
                }
            }

        }
    }

})