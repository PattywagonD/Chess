const app = new Vue({ 
	el: '#app' ,
	data: { board: [
            [2,3,4,6,5,4,3,2],
           [1,1,1,1,1,1,1,1],
           [0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
           [0,0,0,0,0,0,0,0],
           [11,11,11,11,11,11,11,11],
           [12,13,14,16,15,14,13,12]
           ],
       },
	methods: {
		getColor: function (num, start) {
            if (start % 2 == 0)    
                if (num % 2 == 0)
                    return "blue-grey lighten-4"

                 else
                     return "blue-grey darken-3" 
                     
            else
                if (num % 2 == 0)
                    return "blue-grey darken-3"

                 else
                     return "blue-grey lighten-4"
        },
        getImage: function (index1, index2){
            var in1 = index1 - 1
            var in2 = index2 - 1
            return this.board[in2][in1].getImg()     
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
        }
	})


