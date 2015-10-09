function Screensaver () {
	'use strict';

	this.init();
};

Screensaver.prototype.init = function() {
	this.handleResize();

	this.epsilon = 0.1;

	this.pos = {
		x:50,
		y:50
	}

	this.speed = {
		x:50,
		y:0
	}

	this.acceleration = {
		x: 0,
		y: 0
	}

	// document.getElementById('screensaver').onmousemove = this.handleMouseMove.bind(this);
	window.onresize = this.handleResize.bind(this);

	window.requestAnimationFrame(this.draw.bind(this));
};

Screensaver.prototype.draw = function() {
	var ctx = document.getElementById('screensaver').getContext('2d');
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	this.computeGravity();

	// ctx.fillStyle = 'rgba(0,0,0,0.4)';
	// ctx.strokeStyle = 'rgba(0,153,255,0.4)';
	// ctx.save();
	// ctx.translate(150,150);

	// ctx.restore();
	// ctx.beginPath();
	// ctx.arc(150,150,105,0,Math.PI*2,false); // Earth orbit
	// ctx.stroke();

	// ctx.fillStyle = "orange";
	// OU
	var grad = ctx.createRadialGradient(this.pos.x+25, this.pos.y+25,0,this.pos.x+25, this.pos.y+25, 25);
	grad.addColorStop(0, 'rgba(255,255,255,1)');
	grad.addColorStop(0.6, 'rgba(255,255,255,.9)');
	grad.addColorStop(1, 'rgba(255,255,255,0)');
	ctx.fillStyle = grad;
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

Screensaver.prototype.computeGravity = function() {
	var g = {
		x: 0,
		y: 10
	}

	this.acceleration.x += g.x * this.epsilon;
	this.acceleration.y += g.y * this.epsilon;
	this.speed.x += this.acceleration.x * this.epsilon;
	this.speed.y += this.acceleration.y * this.epsilon;
	this.pos.x += this.speed.x * this.epsilon;
	this.pos.y += this.speed.y * this.epsilon;
};


var scsv = new Screensaver();