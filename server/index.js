var express = require('express')
var socket = require('socket.io')

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

io.on('connection', function(socket){
	console.log('Made socket connection', socket.id)
	socket.emit('board', {newBoard: board})
	socket.on('coordinates', function (data) {
		gameLogic(data.coordinates)
    	console.log("Server recieved coordinates! ", data)
    	console.log("Server now sending a new board! ", board)
    	socket.emit('board', {updated: board})
  })
})


gameLogic = function(coordinates){
	if(coordinates[0] < 4)
		board = [
              [2,3,4,6,5,4,3,2],
              [1,1,1,1,1,1,1,1],
              [0,0,0,0,0,0,0,0],
              [0,0,0,5,0,0,0,0],
              [0,0,0,0,15,0,0,0],
              [0,0,0,0,0,0,0,0],
              [11,11,11,11,11,11,11,11],
              [12,13,14,16,15,14,13,12]
          	]
	else
		board =[
              [2,3,4,6,5,4,3,2],
              [1,1,1,1,1,1,1,1],
              [0,0,0,0,0,0,0,0],
              [0,0,0,0,6,0,0,0],
              [0,0,0,16,0,0,0,0],
              [0,0,0,0,0,0,0,0],
              [11,11,11,11,11,11,11,11],
              [12,13,14,16,15,14,13,12]
          	]
}