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
              [0,0,0,0,0,1,0,0],
              [11,11,11,11,11,11,11,11],
              [12,13,14,16,15,14,13,12]
          	]

var username = ""

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
	socket.on('username', function(newUsername){
		game.addPlayer(newUsername)
		username = newUsername.username
		console.log(username)
		console.log(game.getPlayers())
		if(game.getPlayers().length == 1){
			socket.emit("color", {playerColor: "white"})
		}
		else if (game.getPlayers().length == 2) {
			socket.emit("color", {playerColor: "black"})
		}

	})

	//emit the white players board to them
	socket.emit('whiteboard' , {newBoard: board})
	//emit the black players board to them
	socket.emit('blackboard' , {newBoard: translateBoard(board)})

	socket.on('coordinates', function (data) {
		gameLogic(data.coordinates)
    	console.log("Server recieved coordinates! ", data)
    	console.log("Server now sending a new board! ", board)


    	socket.emit(data.coordinates[2]+'board', {updated: board})
  })
})

translateBoard = function(){
	return [ 
            [12,13,14,16,15,14,13,12],
            [11,11,11,11,11,11,11,11],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,1],
            [2,3,4,6,5,4,3,2]
          	]
}

gameLogic = function(coordinates){

	game.checkGameOver()
	game.evaluateClick(coordinates)
	game.checkGameOver()

	// if they are white board stays the same
	if(coordinates[2] == "white"){
		board = [
              [2,3,4,6,5,4,3,2],
              [1,1,1,1,1,1,1,1],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [11,11,11,11,11,11,11,11],
              [12,13,14,16,15,14,13,12]
          	]
	}
	// if they are black change display for them
	else if(coordinates[2] == "black"){
		board = translateBoard()
	}
}