var express = require('express')
var socket = require('socket.io')

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
})