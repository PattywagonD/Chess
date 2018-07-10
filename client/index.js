const app = new Vue({ 
	el: '#app' ,
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
