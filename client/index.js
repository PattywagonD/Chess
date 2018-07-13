

const app = new Vue({ 
  
	el: '#app',
	data: {

    socket: io.connect('http://localhost:3000'),

    board: [
              [2,3,4,6,5,4,3,2],
              [1,1,1,1,1,1,1,1],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [11,11,11,11,11,11,11,11],
              [12,13,14,16,15,14,13,12]
          ],

    username: "",
    opponent: "something",
    color: "",
    noGame: true,
    isGame: false
  },

  created: {

  },
  watch: {
    board() {
      console.log("the board just changed")
    }
    //If oppopnent hasnt changed set socket to ping out 
  },

	methods: {
    //display the correct colors for the tiles
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

    //display chess pieces
    getImage: function (j, i){
      if(this.board[i-1][j-1] == "1"){
        return 'img/bpawn.png'
      }
      else if(this.board[i-1][j-1] == "2"){
        return 'img/brook.png'
      }
      else if(this.board[i-1][j-1] == "3"){
        return 'img/bknight.png'
      }
      else if(this.board[i-1][j-1] == "4"){
        return 'img/bbishop.png'
      }
      else if(this.board[i-1][j-1] == "5"){
        return 'img/bqueen.png'
      }
      else if(this.board[i-1][j-1] == "6"){
        return 'img/bking.png'
      }
      else if(this.board[i-1][j-1] == "11"){
        return 'img/wpawn.png'
      }
      else if(this.board[i-1][j-1] == "12"){
        return 'img/wrook.png'
      }
      else if(this.board[i-1][j-1] == "13"){
        return 'img/wknight.png'
      }
      else if(this.board[i-1][j-1] == "14"){
        return 'img/wbishop.png'
      }
      else if(this.board[i-1][j-1] == "15"){
        return 'img/wking.png'
      }
      else if(this.board[i-1][j-1] == "16"){
        return 'img/wqueen.png'
      }
      else
        return 'img/blank.png' 

    },

    startGame: function(i, j){
      //Make sure they entered a valid username
      if(this.username){
        app.noGame = false
        app.isGame = true
        //send username to server
        this.socket.emit('username', {username: this.username})
        //recieves their color, board and opponent
        this.socket.on('color', function(data){
          app.color = data.playerColor
          app.board = data.newBoard
          // set the opponents user name
          console.log(app.color, "current color")
          app.opponent = data.opponent
          console.log(app.opponent, "and their opponent")
        })
      }
    },

    //send the server the x, y of clicked square
    sendClick: function (i, j) {
        //var coordinates = [i, j]
        console.log(app.color, "test")
        console.log("Client sending coordinates!", [i, j, this.color])
        this.socket.emit('coordinates', {coordinates: [i,j, this.color]})
        this.socket.on(this.color+'board', function(data){
          console.log("Client recieved board! ", data)
          console.log(data.updated)
          app.board = data.updated

    })
    },
  } 
})


