const pieces = require('./pieces')


class Game{
	constructor(){
	this.players =  []
	this.board = []
	this.display = [
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
	addPlayer(username){
		if(this.players.length < 2)
			this.players.push(username)
		else
			console.log("Cannot add")
	}
	getPlayers(username){
		return this.players
	}
	checkGameOver(){

	}

	translateBoard(board){
		return  [
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
	evaluateClick(coordinates){
		if(coordinates[2]== "white"){
			return display
		}else if(coordinates[2]=="black"){
			return translateBoard(display)
		}
	} 
}


module.exports = {Game}
