

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
    history: ['a4','kg4', 'qxc4'],
    username: "",
    opponent: "finding match...",
    feedback: "",
    color: "",
    noGame: true,
    isGame: false,
    moves: [],
    opp: true,
    gameId: "",
    messages: [],
    message: "",
    dialog: false,
    oppPieces: ["img/bpawn.png", "img/brook.png"],
    pieces: ["img/wpawn.png", "img/wbishop.png"]
  },

  created: {

  },
  watch: {
    board() {
      console.log("the board just changed")
    },
    oppopnent(){
      console.log("the oppopnent has changed")
    }, 
    message(){
      if(app.message == ""){
        this.socket.emit('typing', {name: ""})
      }else{
        this.socket.emit('typing', {name: app.username})
      }
    }
    //If oppopnent hasnt changed set socket to ping out 
  },

  methods: {
    //display the correct colors for the tiles
    getGridNum: function(num){
      if(app.color == "white"){
        return num
      }else{
        if(num == 1){
          return 8
        }else if(num == 2){
          return 7
        }else if(num == 3){
           return 6         
        }else if(num == 4){
          return 5          
        }else if(num == 5){
          return 4
        }else if(num == 6){
          return 3          
        }else if(num == 7){
          return 2          
        }else if(num == 8){
          return 1          
        }
      }
      return 1
    }, 

    getColor: function (num, start) {
            if (start % 2 == 0)    
                if (num % 2 == 0)
                    return "yellow lighten-5"

                 else
                     return "green darken-2" 
                     
            else
                if (num % 2 == 0)
                    return "green darken-2"

                 else
                     return "yellow lighten-5"
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
        return 'img/bking.png'
      }
      else if(this.board[i-1][j-1] == "6"){
        return 'img/bqueen.png'
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
        //save id
        app.gameId = this.socket.id
        console.log(this.username)
        app.noGame = false
        app.isGame = true
        console.log(this.gameId)
        //send username to server
        this.socket.emit('username', {username: this.username})
        //Receives two boards and both usernames, routes data to correct person
        this.socket.on('color', function(data){
          app.opp = false
          console.log("ON COLOR ", app.username, data.opponent[0])
          if(app.username == data.opponent[0]){
            app.color = "white"
            app.board = data.newBoard
            app.opponent = data.opponent[1]
            console.log("This should be player 1" , app.color, app.username, app. opponent)
          }else if(app.username == data.opponent[1]){
            app.color = "black"
            app.board = app.translateBoard(data.newBoard)
            app.opponent = data.opponent[0]
            console.log("This should be player 2" , app.color, app.username, app.opponent)
          }
        })

        this.socket.on('board', function(data){
          console.log("Client recieved board and moves! ")
          console.log(data.updatedboard, data.updatedmoves)
          if(app.color == "white"){
            app.board = data.updatedboard
            app.moves = data.updatedmoves
          //if the player is black then the board need translated for their viewing window
          }else if(app.color == "black"){
            app.board = app.translateBoard(data.updatedboard)
            app.moves = app.translateMoves(data.updatedmoves)
          }
        })

      this.socket.on('typing', function(typer){
        if(typer.name == ""){
          app.feedback = ""
        }else{
          app.feedback = typer.name + " is typing a message..."
        }
      })

      this.socket.on('chat', function(newChat){
        console.log("Getting new chat")
        app.messages.push(newChat.message)
      })

      }
    },

    //send the server the x, y of clicked square
    sendClick: function (i, j) {
        //var coordinates = [i, j]
        console.log(app.color, "test")
        console.log("Client sending coordinates!", i, j, app.color)
        // set 9-j if logic board is upside down
        this.socket.emit('updatedData', {x: i, y: j, color: app.color})
        //Listen for new board

    },

    sendMessage: function(){
      this.socket.emit('chat', {
        message: app.message,
        handle: app.username
      })
      app.message=""
    },


    //Need to reflect board horizontally!!!!!
    translateBoard: function(newBoard){
      var tempboard = []
      for(var x = newBoard.length-1; x >= 0; x--){
        tempboard.push(newBoard[x].reverse())
      }
      return tempboard
    },

    translateMoves: function(newMoves){
      var tempMoves = []
      for(var x = 0; x < newMoves.length; x++){
          tempMoves.push([9 - newMoves[x][0] , 9-newMoves[x][1]])
        }
      
      return tempMoves
    },

    exportClick: function(clientCoordinates){
      var x = clientCoordinates[0]
      var y = clientCoordinates[1]
      return [x, 9-y]
    }

  } 
})

