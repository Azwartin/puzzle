function Loader() {
	var image = null;
	this.load = function (img, callback = false) {
		if (!img.type.match(/image.*/)) {
			alert('The dropped file is\'nt an image');
			return;
		}

		var reader = new FileReader();
		reader.addEventListener('load', function(e) {
			image = new Image();
			image.addEventListener('load', function() {
				var coef = 1, maxSize = 0.7;
				console.log('Loaded');
				if(callback) {
					callback(this);
				}
			});

			image.src = e.target.result;
		});

		reader.readAsDataURL(img);
	}

	this.getImage = function(){
		return image;
	}
}