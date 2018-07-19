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

// A dictionary to store multiple games         	
var games = {
	game: {logic: new gameClass.Game("exampleid"), board: startingBoard, moves: [], id: "exampleid"}
	}

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
var queue = 0

io.on('connection', function(socket){
	console.log('Made socket connection', socket.id)
	queue += 1
	if(queue <= 2){
		console.log("Less than two people in game")
	}else{
		console.log("Too many people in game!")
		games.newId = {logic: new gameClass.Game(socket.id), board: startingBoard, moves: [], id: "game"+socket.id}
		console.log(games)
		queue = 0
	}

	ids.push(socket.id)
	console.log(ids)
	//on recieving a new player:
	socket.on('username', function(newUsername){
		// add user to game
		games.game.logic.addPlayer(newUsername.username)
		console.log(newUsername.username)
		console.log(games.game.logic.getPlayers())

		//give the players the color they are playing
		//send them their starting board
		if (games.game.logic.getPlayers().length == 2) {
			//console.log("opponent!", game.getPlayers()[1])... send both players
			io.emit("color", {newBoard: games.game.board , opponent: [games.game.logic.getPlayers()[0], games.game.logic.getPlayers()[1]]})
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
	    console.log("Server now sending a new board! ", games.game.board)
	    io.emit('board', {updatedboard: games.game.board, updatedmoves: games.game.moves })
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
	games.game.board = games.game.logic.evaluateClick(x, y, color)
	games.game.moves = games.game.logic.getMoves(x, y, color)
	//game.checkGameOver()
}