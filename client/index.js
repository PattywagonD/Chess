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
     
        }
	})


