import data from './data.js'
import {Piece, Pawn, Rook, Knight, Bishop, Queen, King} from './pieces.js'




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
            this.selected = image
            console.log("clicked")
        },
        
        displayMoves: function(i, j){
            console.log("called")

            for (var x = 0; x < this.moves.length; x++) { 
                console.log(i,j , "=", this.moves[x][0],this.moves[x][1], x)
                if (i == this.moves[x][0] && j == this.moves[x][1])
                     return true
            }
            
        },
        
        getMoves: function(i, j){
            var in1 = i - 1
            var in2 = j - 1
            console.log(this.board[in2][in1].getId())
            this.moves = this.board[in2][in1].getMoves(i,j)
            
        }
        
        

    }

})




