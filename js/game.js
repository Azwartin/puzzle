function Game() {
	this.cntX = 2;
	this.cntY = 2;
	this.field = [];

	this.setCountX = function(count, def = 5) {
		if(count > 0) {
			this.cntX = count;
		} else {
			this.cntX = def;
		}
	}

	this.setCountY = function(count, def = 5) {
		if(count > 0) {
			this.cntY = count;
		} else {
			this.cntY = def;
		}
	}

	this.mixPuzzle = function() {
		var i, j, positions = [], len = this.cntX * this.cntY;
		this.field = [];

		console.log(this.cntX);
		for(i = 0; i < len; i++){
			positions.push(i);
		}

		for(i = 0; i < this.cntX; i++) {
			this.field[i] = [];
			for(j = 0; j < this.cntY; j++) {
				this.field[i][j] = positions.splice(Math.trunc(Math.random() * positions.length), 1)[0];
			}
		}

		console.log(this.field);

		return this.field;
	}

	this.checkWin = function() {
		var cntX = this.field.length,
			cntY = this.field[0].length,
			i, j;

		for(i = 0; i < cntX; i++) {
			for(j = 0; j < cntY; j++) {
				if(this.field[i][j] != i * cntY + j) {
					return false;
				}
			}
		}

		return true;
	}

	this.getChunk = function(i, j) {
		return this.field[i][j];
	}

	this.swap = function(from, to) {
		var temp = this.field[from.i][from.j];
		this.field[from.i][from.j] = this.field[to.i][to.j];
		this.field[to.i][to.j] = temp;
	}

	this.chunkToPosition = function(chunk) {
		return {
			i: Math.trunc(chunk / this.cntY),
			j: chunk % this.cntY,
		};
	}
}