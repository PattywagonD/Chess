var express = require('express')
var socket = require('socket.io')
const gameClass = require('./game.js')

var game = new gameClass.Game()

var board = [
              [2,3,4,6,5,4,3,2],
              [1,1,1,1,1,1,1,1],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [11,11,11,11,11,11,11,11],
              [12,13,14,16,15,14,13,12]

          	]
var board2 = [
	            [12,13,14,16,15,14,13,12],
	            [11,11,11,11,11,11,11,11],
	            [0,0,0,0,0,0,0,0],
	            [0,0,0,0,0,0,0,0],
	            [0,0,0,0,0,0,0,0],
	            [0,0,0,0,0,0,0,0],
	            [1,1,1,1,1,1,1,1],
	            [2,3,4,6,5,4,3,2]
	          	]

// a moves variable to show avaliable moves for a piece 
var moves = []

//App setup
var app = express()
//Server setup
var server =  app.listen(3000, function(){
	console.log("Listening to request on port 3000")
})

//Static files (middleware)

//Serve up the index.html file
app.use(express.static('../client'))

//Socket setup to work on server(3000)
var io = socket(server)
var ids = []

io.on('connection', function(socket){
	console.log('Made socket connection', socket.id)
	ids.push(socket.id)
	console.log(ids)
	//on recieving a new player:
	socket.on('username', function(newUsername){
		// add user to game
		game.addPlayer(newUsername.username)
		console.log(newUsername.username)
		console.log(game.getPlayers())

		//give the players the color they are playing
		//send them their starting board
		if (game.getPlayers().length == 2) {
			//console.log("opponent!", game.getPlayers()[1])... send both players
			io.emit("color", {newBoard: [board, board2] , opponent: [game.getPlayers()[0], game.getPlayers()[1]]  })
		}
	})


	//Pull this out of the connection 
	//Listen for a new click to update the board ie change socket to io
	socket.on('coordinates', function (data) {
		var x = data.coordinates[0]
		var y = data.coordinates[1]
		var color = data.coordinates[2]
		gameLogic(x, y, color)
    	console.log("Server recieved coordinates! ", data)
    	console.log("Server now sending a new board! ", board)
    	socket.emit(data.coordinates[2]+'board', {updated: board})
  })
})


gameLogic = function(x, y, color){

	//game.checkGameOver()
	board = game.evaluateClick(x, y, color)
	moves = game.updateMoves(x, y, color)
	//game.checkGameOver()
}

translateData = function(){
	
}