function Screensaver () {
	'use strict';

	this.init();
};

Screensaver.prototype.init = function() {
	this.handleResize();

	this.pos = {
		x:50,
		y:50
	}

	document.getElementById('screensaver').onmousemove = this.handleMouseMove.bind(this);
	window.onresize = this.handleResize.bind(this);

	window.requestAnimationFrame(this.draw.bind(this));
};

Screensaver.prototype.draw = function() {
	var ctx = document.getElementById('screensaver').getContext('2d');
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	// ctx.fillStyle = 'rgba(0,0,0,0.4)';
	// ctx.strokeStyle = 'rgba(0,153,255,0.4)';
	// ctx.save();
	// ctx.translate(150,150);

	// ctx.restore();
	ctx.fillStyle = "orange";
	// ctx.beginPath();
	// ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
	// ctx.stroke();
	ctx.fillRect(this.pos.x, this.pos.y, 50, 50);

	window.requestAnimationFrame(this.draw.bind(this));
};

Screensaver.prototype.handleResize = function() {
	var ctx = document.getElementById('screensaver').getContext('2d');
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
};

Screensaver.prototype.handleMouseMove = function(e) {
	this.pos.x = e.clientX - 25;
	this.pos.y = e.clientY - 25;
};



var scsv = new Screensaver();