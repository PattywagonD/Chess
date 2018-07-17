  

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
    opponent: "finding match...",
    color: "",
    noGame: true,
    isGame: false,
    moves: [[1,1], [3,4], [5,7] ],
    opp: true
  },

  created: {

  },
  watch: {
    board() {
      console.log("the board just changed")
    },
    oppopnent(){
      console.log("the oppopnent has changed")
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

    getMoves: function(j, i){
      for(var x = 0; x < this.moves.length; x ++){
        if(this.moves[x][0] == i && this.moves[x][1] == j){
          return true
        }
      }
    },

    startGame: function(i, j){
      //Make sure they entered a valid username
      if(this.username){
        console.log(this.username)
        app.noGame = false
        app.isGame = true
        //send username to server
        this.socket.emit('username', {username: this.username})
        //Receives two boards and both usernames, routes data to correct person
        this.socket.on('color', function(data){
          app.opp = false
          console.log("ON COLOR ", app.username, data.opponent[0])
          if(app.username == data.opponent[0]){
            app.color = "white"
            app.board = data.newBoard[0]
            app.opponent = data.opponent[1]
            console.log("This should be player 1" , app.color, app.username, app. opponent)
          }else if(app.username == data.opponent[1]){
            app.color = "black"
            app.board = data.newBoard[1]
            app.opponent = data.opponent[0]
            console.log("This should be player 2" , app.color, app.username, app.opponent)
          }
        })
      }
    },

    //send the server the x, y of clicked square
    sendClick: function (i, j) {
        //var coordinates = [i, j]
        console.log(app.color, "test")
        console.log("Client sending coordinates!", i, j, app.color)
        this.socket.emit('updatedData', {x: i, y: j, color: app.color})
        //Listen for new board
        this.socket.on('board', function(data){
          console.log("Client recieved board and moves! ")
          console.log(data.updatedboard, data.updatedmoves)
          app.board = data.updatedboard
          app.moves = data.updatedmoves

    })
    },
  } 
})

