const pieces = require('./pieces')


class Game{
	constructor(){
	this.players =  []
	this.board = []
	}
	addPlayer(username){
		if(this.players.length < 2)
			this.players.push(username.username)
		else
			console.log("Cannot add")
	}
	getPlayers(username){
		return this.players
	}
	checkGameOver(){

	}
	evaluateClick(coordinates){

	}
}


module.exports = {Game}
