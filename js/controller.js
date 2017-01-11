(function(){			
	window.addEventListener('load', function() {
		var canvas = document.querySelector('.game-canvas'),
			iconCanvas = document.querySelector('.icon-canvas'),
			btnMix = document.querySelector('.btn-mix'),
			btnLoad = document.querySelector('.btn-load'),
			inputChkXCount = document.querySelector('.count-chunk-x'),
			inputChkYCount = document.querySelector('.count-chunk-y'),
			loader = new Loader(), game = new Game(), render, 
			from, to,
			def = 5;

		function tryParseInt(value, def) {
			var parsed = parseInt(value);
			return parsed == value ? parsed : def; 
		}

		function init(files) {
			if(files.length > 0) {
				loader.load(files[0], function(img) {
					render = new Render(canvas, iconCanvas, img);
					game.setCountX(tryParseInt(inputChkXCount.value, def));
					game.setCountY(tryParseInt(inputChkYCount.value, def));
					render.render(game.mixPuzzle());

					canvas.addEventListener('mousedown', function(e) {
						var image = loader.getImage(),
							position = render.coordinateToPosition(e.pageX, e.pageY),
							chunk = game.getChunk(position.i, position.j);

						from = position;
						console.log(position);
						position = game.chunkToPosition(chunk);
					
						render.renderIcon(position.i, position.j, e.clientX, e.clientY);
					});

					canvas.addEventListener('mousemove', function(e){
						render.moveIcon(e.clientX, e.clientY);
					});

					btnMix.addEventListener('click', function() {
						if(loader.getImage()) {
							game.setCountX(tryParseInt(inputChkXCount.value, def));
							game.setCountY(tryParseInt(inputChkYCount.value, def));
							render.render(game.mixPuzzle());
						}
					});

					window.addEventListener('mouseup', function(e) {
						render.hideIcon();
						if(from) {
							var to = render.coordinateToPosition(e.clientX, e.clientY),
								imFrom = game.chunkToPosition(game.getChunk(from.i, from.j)),
								imTo = game.chunkToPosition(game.getChunk(to.i, to.j));

							render.swap(from, to, imFrom, imTo);
							game.swap(from, to);

							from = false;
							if(game.checkWin()){
								alert('Собрано!');
							}
						}
					});
				});
			}
		}

		canvas.addEventListener('dragover', function(e) {
			e.preventDefault();
		}, true);

		canvas.addEventListener('drop', function(e) {
			e.preventDefault();
			init(e.dataTransfer.files);
		}, true);

		btnLoad.addEventListener('change', function(e){
			init(e.target.files);
		}, false);
	});
})();