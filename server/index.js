// VARIABLES DEPARTMENT
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
var room = ""
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



	//Put player in appropriate game and create new games as needed
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



	//Send Updated Data to Client
	socket.on('updatedData', function(newClick){
		room = newClick.room
		index = ids.indexOf(room)
		console.log("socket data" , newClick)
	    console.log(x, y, color, "Click before server import")
		var logicClick = importMoves(newClick.x, newClick.y)
		var x = logicClick[0]
		var y = logicClick[1]
		var color = newClick.color
	    console.log(x, y, color, "click after server import")
	    //Update the board from the click and send new board
		gameLogic(x, y, color, index)
		console.log("Server now sending a new board! ", games[index].board)
		console.log("server sending updated moves", games[index].moves)
		console.log("server sending updated history", games[index].logic.history)
	    io.sockets.in(room).emit('board', {updatedboard: games[index].board, updatedmoves: games[index].moves, wPieces: games[index].logic.getWhiteCaptures() , bPieces: games[index].logic.getBlackCaptures(), history:games[index].logic.history})
	})

	//Listen for new chats in each game room
	socket.on('chat', function(newChat){
		room = newChat.room
		index = ids.indexOf(room)
		console.log("Recieving new chat", newChat.message)
		io.sockets.in(room).emit('chat', newChat)
	})

	//Broadcast in a specific room if someone there is typing
	socket.on('typing', function(typer){
	 	socket.broadcast.to(typer.room).emit('typing', typer)
	 })
})

importMoves = function(clickx, clicky) {
	return [clickx, 9-clicky]
}
//Update the board and moves for each game 
gameLogic = function(x, y, color, index){

	//game.checkGameOver()
	console.log(games[index]);
	games[index].board = games[index].logic.evaluateClick(x, y, color)
	games[index].moves = games[index].logic.getMoves(x, y, color)
	//game.checkGameOver()
}
