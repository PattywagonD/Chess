

const app = new Vue({ 
  
	el: '#app',
	data: {

    socket: io.connect('http://localhost:3000'),
    room: "",
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
    history: [],
    username: "",
    opponent: "finding match...",
    loader: 20,
    feedback: "",
    color: "",
    noGame: true,
    isGame: false,
    moves: [],
    opp: true,
    gameId: "",
    messages: [],
    handles: [],
    message: "",
    dialog: false,
    chatMobile: false,
    oppPieces: [],
    pieces: [],
    awidth: 300,
    unread: false,
    mouseX: 0,
    mouseY: 0,
    drag: [0,0],
    mouseDown: false,
    read: true,
    hovered: null,
    coordinates: []

  },

  computed: {
    styles1: function() {
      var newWidth = this.awidth;
    
      return {
        'background-color': 'rgba(0,0,0,.5)',
        width: newWidth + 'px',
        height: newWidth/12 + 'px'
      };
    },

    boardMobile: function() {
      var newWidth = this.awidth;
      console.log(newWidth)
      return {
        'background-color': 'green',
        width: newWidth + 'px',
        height: newWidth   + 'px'
      };
    },

    down: function() {
      if(app.mouseDown ){
        return {
            cursor: 'none',
        }
      }else{
        return{
          cursor: 'default'
        }
      }
    },

    // dragable: function(){
    //   var x = app.mouseX
    //   var y = app. mouseY
    //   if(app.mouseDown && app.dragging(app.drag[0], app.drag[1])){
    //     return{
    //       position: 'fixed',
    //       top: y-25 + 'px',
    //       left: x-35 + 'px',
    //       'z-index': 2,
    //       cursor: 'none'
    //     }
    //   }
    // },

    footerHUD: function() {
      var newWidth = this.awidth;
    
      return {
        'background-color': 'rgba(0,0,0,.3)',
        width: newWidth + 'px',
        height: newWidth/8 + 'px'
      };
    },

    chat: function() {
      var newWidth = this.awidth;
    
      return {
        'background-color': 'blue',
        width: newWidth + 'px',
        height: newWidth/12 + 'px'
      };
    },
    tileMobile: function() {
      var newWidth = this.awidth/8;
    
      return {
        'background-color': 'rgba(0,0,0,.7)',
        width: newWidth+ 'px',
        height: newWidth + 'px'
      };
    },
  },

  created(){
    addEventListener('resize', function(){
      app.awidth = window.innerWidth
      console.log(app.awidth)
    })
    //keep track of the mouse x and y position
    addEventListener('mousemove', function(event){
        if(event.stopPropagation) event.stopPropagation();
        if(event.preventDefault) event.preventDefault();
        event.cancelBubble=true;
        event.returnValue=false;
        app.mouseX = event.clientX
        app.mouseY = event.clientY 
    })

    addEventListener('mousedown', function(){
      app.mouseDown = true
    })

    addEventListener('mouseup', function(){
      app.mouseDown = false
      app.drag = [0,0]
      })




    //Event Listener for Mouse over?
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
        this.socket.emit('typing', {name: "", room:app.room})
      }else{
        this.socket.emit('typing', {name: app.username, room:app.room})
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

    getOpponent: function(){
      console.log(this.opponent)
      if (this.oppopnent != "finding match..."){
        return true
      }
    },

		getColor: function (num, start) {
            if (start % 2 == 0)    
                if (num % 2 == 0)
                    return "light-green lighten-4"

                 else
                     return "light-green darken-3" 
                     
            else
                if (num % 2 == 0)
                    return "light-green darken-3"

                 else
                     return "light-green lighten-4"
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


    dragging: function(i, j){

      var x = app.mouseX
      var y = app. mouseY      
      if(i == app.drag[0] && j == app.drag[1] && app.mouseDown){

        console.log("conditions met",i,j)
        //app.coordinates = [i, j-2]
        console.log(app.hovered)
        return{
          cursor: 'none',
          position: 'fixed',
          top: y-25 + 'px',
          left: x-35 + 'px',
          'z-index': 2,
        }
      }

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
          app.loader = 0
          app.room = data.room
          console.log(app.room, "Game Room ID")
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
            app.pieces = data.wPieces
            app.oppPieces = data.bPieces
            app.history = data.history
            console.log("pieces", app.pieces, app.oppPieces, data.wPieces, data.bPieces)
          //if the player is black then the board need translated for their viewing window
          }else if(app.color == "black"){
            app.board = app.translateBoard(data.updatedboard)
            app.moves = app.translateMoves(data.updatedmoves)
            app.pieces = data.bPieces
            app.oppPieces = data.wPieces
            app.history = data.history
            console.log("pieces", app.pieces, app.oppPieces, data.wPieces, data.bPieces)
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
        var firstLetter = newChat.handle.substring(0,1)
        var pcolor = "blue"
        if(app.color == "white" && newChat.handle == app.username){
          pcolor = "light-green lighten-4"
        }else if(app.color == "black" && newChat.handle == app.username){
          pcolor = "light-green darken-3"
        }else if(app.color == "white" && newChat.handle == app.opponent){
          pcolor= "light-green darken-3"
        }else{
          pcolor = "light-green lighten-4"
        }
        app.messages.push({message: newChat.message, handle: newChat.handle, avatar:firstLetter, avatarColor: pcolor})
        if(newChat.handle != app.username){
          app.unread = true
          app.read = false
        }
      })

      }
    },

    //send the server the x, y of clicked square
    sendClick: function () {
        var i = app.coordinates[0]
        var j = app.coordinates[1]

        console.log(app.color, "test")
        console.log("Client sending coordinates!", i, j, app.color)
        //set piece to mouse while mouse is clicked down

        // export blacks click differently 
        if(app.color == "white"){
          this.socket.emit('updatedData', {x: i, y: j, color: app.color, room:app.room})
        }else{
          this.socket.emit('updatedData', {x: 9-i, y: 9-j, color: app.color, room:app.room})   
        }
    },

    newDrag: function(){
        console.log("MOUSEDOWN")
        var i = this.coordinates[0]
        var j = this.coordinates[1]
        app.drag[0] = i
        app.drag[1] = j

        console.log(app.drag[0], app.drag[1], "==?" , i, j , "and?", app.mouseDown)

        if(app.color == "white"){
          this.socket.emit('updatedData', {x: i, y: j, color: app.color, room:app.room})
        }else{
          this.socket.emit('updatedData', {x: 9-i, y: 9-j, color: app.color, room:app.room})   
        }



    },

    // sendClick2: function(){
    //   console.log(app.mouseX, app.mouseY)
    //   console.log(app.$refs[app.hovered])
    //   app.$refs[app.hovered][0].click()
    // },

    setHovered: function(i, j){

      this.hovered = String(i) + String(j)
      this.coordinates = [i , j]
      console.log(this.coordinates, "coordinates?")
      console.log(this.hovered, "Hovered?")

    },

    sendMessage: function(){
      this.socket.emit('chat', {
        message: app.message,
        handle: app.username,
        room: app.room
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
  } 
})


