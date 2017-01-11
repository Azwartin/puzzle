function Render(canvas, iconCanvas, image) {
	var ctx = canvas.getContext('2d'),
		iconCtx = iconCanvas.getContext('2d'),
		canvasRect = canvas.getBoundingClientRect();

	this.blockWidth = 0;
	this.blockHeight = 0;

	this.render = function render(positions) {
		var cntX = positions.length,
			cntY = positions[0].length,
			i, j,
			dx, dy, sx, sy;

		this.blockWidth = image.width / cntX;
		this.blockHeight = image.height / cntY;

		canvas.width = image.width;
		canvas.height = image.height;
		canvasRect = canvas.getBoundingClientRect();
		for(i = 0; i < cntX; i++) {
			for(j = 0; j < cntY; j++) {
				sx = Math.trunc(positions[i][j] / cntY) * this.blockWidth;
				sy = (positions[i][j] % cntY) * this.blockHeight;

				dx = i * this.blockWidth;
				dy = j * this.blockHeight;

				ctx.drawImage(image, sx, sy, this.blockWidth, this.blockHeight, dx, dy, this.blockWidth, this.blockHeight);
			}
		}
	}

	this.renderIcon = function(i, j, x, y) {
		if(iconCanvas.style.display == '' || iconCanvas.style.display == 'none') {
			iconCanvas.width = this.blockWidth;
			iconCanvas.height = this.blockHeight;
			iconCtx.drawImage(image, i * this.blockWidth, j * this.blockHeight, this.blockWidth, this.blockHeight,
				 0, 0, this.blockWidth, this.blockHeight);
			iconCanvas.style.display = 'block';
		}

		iconCanvas.style.top = y + 'px';
		iconCanvas.style.left = x + 'px';
	}

	this.moveIcon = function(x, y) {
		if (iconCanvas.style.display != '' && iconCanvas.style.display != 'none') {
			iconCanvas.style.top = y + 'px';
			iconCanvas.style.left = x + 'px';
		}
	}

	this.hideIcon = function() {
		console.log('hide');
		iconCanvas.style.display = 'none';
	}

	this.swap = function(from, to, imFrom, imTo) {
		ctx.drawImage(image, imFrom.i * this.blockWidth, imFrom.j * this.blockHeight,
					 this.blockWidth, this.blockHeight, 
				to.i * this.blockWidth, to.j * this.blockHeight, this.blockWidth, this.blockHeight);
		ctx.drawImage(image, imTo.i * this.blockWidth, imTo.j * this.blockHeight,
					 this.blockWidth, this.blockHeight, 
				from.i * this.blockWidth, from.j * this.blockHeight, this.blockWidth, this.blockHeight);
	}

	this.coordinateToPosition = function(x, y) {
		console.log(x + " " + y);
		console.log(canvasRect.left);
		console.log(canvasRect.top);
		return {
			i: Math.trunc((x - canvasRect.left) / this.blockWidth),
			j: Math.trunc((y - canvasRect.top) / this.blockHeight)
		}
	}
}