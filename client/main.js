import data from './data.js'
//import {Piece, Pawn} from './pieces.js'




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

            var num = this.getType(index1, index2)
    
            if (num == 1)
                return "img/bpawn.png"
                
            else if (num == 2)
                return "img/brook.png"
                
            else if (num == 3)
                return "img/bknight.png"
                
            else if (num == 4)
                return "img/bbishop.png"
                
            else if (num == 5)
                return "img/bqueen.png"
                
            else if (num == 6)
                return "img/bking.png"
                
            else if (num == 11)
                return "img/wpawn.png"
                
            else if (num == 12)
                return "img/wrook.png"
                
            else if (num == 13)
                return "img/wknight.png"
                
            else if (num == 14)
                return "img/wbishop.png"
                
            else if (num == 15)
                return "img/wqueen.png"
                
            else if (num == 16)
                return "img/wking.png"
                
            else
                return "img/blank.png"
        },
        
        getType: function(i, j){
            var num = this.items[i-1][j-1]
            return num
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
            var image = this.getType(i, j)
            this.selected = image
            console.log("clicked")
        },
        
        getMove: function(i, j){
    
            var num = this.items[i-1][j-1]
            console.log("this is the piece", num)
            if (num != 0)
                this.current = num
            //else
                //this.items[i-1][j-1] = this.current
            
            
        }
        
        

    }

})




