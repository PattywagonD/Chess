var express = require('express')
var socket = require('socket.io')
const gameClass = require('./game.js')

//var game = new gameClass.Game()


var startingBoard = [
              [2,3,4,6,5,4,3,2],
              [1,1,1,1,1,1,1,1],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [11,11,11,11,11,11,11,11],
              [12,13,14,16,15,14,13,12]

          	]

// A list to store multiple games         	
var games = []
var index = 0
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
var queue = []
var gameId = ""

//var newGame = new gameClass.Game("arandomId")

//games.game = {logic: newGame}

io.on('connection', function(socket){
	console.log('Made socket connection', socket.id)
	console.log(ids)



	//on recieving a new player:
	socket.on('username', function(newUsername){

		if(queue.length == 0){
			//Create new game with unique id 
			gameId = newUsername.username

			console.log(ids, "ids")
			socket.join(gameId)
			//This syntax sets games key to game Id games[gameId] = {}
			games.push({logic: new gameClass.Game(gameId), board: startingBoard, moves: [], id:"random" })
			queue.push(newUsername.username)
			ids.push(gameId)

			//Get the index with your gameId
			index = ids.indexOf(gameId)
			console.log(index)
			games[index].logic.addPlayer(newUsername.username)
			console.log(queue)
		}else if(queue.length == 1){
			index = ids.indexOf(gameId)
			socket.join(gameId)
			queue.push(newUsername.username)
			games[index].logic.addPlayer(newUsername.username)
			console.log(queue)

			io.sockets.in(gameId).emit("color", {newBoard: games[index].board , opponent: [games[index].logic.getPlayers()[0], games[index].logic.getPlayers()[1]], room: gameId})

			//reset
			queue = []
		}


	})





	//Pull this out of the connection??? 
	//Listen for a new click to update the board ie change socket to io
	// Needs to be moved into a for loop that goes over the objects in games
	socket.on('updatedData', function(newClick){
		console.log("socket data" , newClick)
		var x = newClick.x
		var y = newClick.y
		var color = newClick.color
	    console.log(x, y, color)
	    //Update the board from the click and send new board
		gameLogic(x, y, color)
	    console.log("Server recieved coordinates! ", newClick.x, newClick.y)
	    console.log("Server now sending a new board! ", games[0].board)
	    io.emit('board', {updatedboard: games[0].board, updatedmoves: games[0].moves })
	})

	socket.on('chat', function(newChat){
		console.log("Recieving new chat", newChat.message)
		io.sockets.emit('chat', newChat)
	})

	socket.on('typing', function(typer){
		socket.broadcast.emit('typing', typer)
	})

})


gameLogic = function(x, y, color){

	//game.checkGameOver()
	games[0].board = games[0].logic.evaluateClick(x, y, color)
	games[0].moves = games[0].logic.getMoves(x, y, color)
	//game.checkGameOver()
}
