function Screensaver () {
	'use strict';

	this.init();
};

Screensaver.prototype.init = function() {
	this.epsilon = 0.5;
	this.G = 10;

	this.pos = {
		x:300,
		y:300
	}
	this.speed = {
		x:20,
		y:0
	}
	this.acceleration = {
		x: 0,
		y: 0
	}
	this.objSize = {
		x: 50,
		y: 50
	}
	this.boxSize = {
		x: 0,
		y: 0
	}
	this.boxCenter = {
		x: 0,
		y: 0
	}

	this.g = {
		x: 0,
		y: 0
	}

	this.handleResize();

	// document.getElementById('screensaver').onmousemove = this.handleMouseMove.bind(this);
	window.onresize = this.handleResize.bind(this);

	window.requestAnimationFrame(this.draw.bind(this));
};

Screensaver.prototype.draw = function() {
	var ctx = document.getElementById('screensaver').getContext('2d');
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	// this.computeCollisions();
	// this.computeGravity();
	this.computeCentralGravity();

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
	var grad = ctx.createRadialGradient(this.pos.x+this.objSize.x/2, this.pos.y+this.objSize.y/2,0,this.pos.x+this.objSize.x/2, this.pos.y+this.objSize.y/2, this.objSize.x/2);
	grad.addColorStop(0, 'rgba(255,255,255,1)');
	grad.addColorStop(0.6, 'rgba(255,255,255,.9)');
	grad.addColorStop(1, 'rgba(255,255,255,0)');
	ctx.fillStyle = grad;
	ctx.fillRect(this.pos.x, this.pos.y, this.objSize.x, this.objSize.y);
	// console.log('v :' + this.speed.x + ' :'  + this.speed.y + ' - a :' + this.acceleration.x + ' :'   + this.acceleration.y);

	// // Draw force
	// ctx.beginPath();
	// ctx.strokeStyle = 'rgb(0,200,200)';
	// ctx.moveTo(this.pos.x, this.pos.y);
	// ctx.lineTo(this.pos.x + 10*this.g.x, this.pos.y + 10*this.g.y);
	// ctx.stroke();
	// console.log("V norm :" + this.norm(this.speed));


	window.requestAnimationFrame(this.draw.bind(this));
};

Screensaver.prototype.handleResize = function() {
	var ctx = document.getElementById('screensaver').getContext('2d');
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	this.boxSize.x = ctx.canvas.width;
	this.boxSize.y = ctx.canvas.height;
	this.boxCenter.x = this.boxSize.x/2;
	this.boxCenter.y = this.boxSize.y/2;
};

Screensaver.prototype.handleMouseMove = function(e) {
	this.pos.x = e.clientX - this.objSize.x/2;
	this.pos.y = e.clientY - this.objSize.y/2;
};

Screensaver.prototype.computeGravity = function() {
	var g = {
		x: 0,
		y: 10
	}

	this.acceleration.x = g.x;
	this.acceleration.y = g.y;
	this.speed.x += this.acceleration.x * this.epsilon;
	this.speed.y += this.acceleration.y * this.epsilon;
	this.pos.x += this.speed.x * this.epsilon;
	this.pos.y += this.speed.y * this.epsilon;
};

Screensaver.prototype.computeCentralGravity = function() {
	var dist = this.dist(this.pos, this.boxCenter);
	var u = { // gravity vector
		x: this.boxCenter.x - this.pos.x,
		y: this.boxCenter.y - this.pos.y
	}
	this.g = {
		x: this.G * u.x / Math.pow(dist/10, 2),
		y: this.G * u.y / Math.pow(dist/10, 2)
	}

	this.acceleration.x = this.g.x;
	this.acceleration.y = this.g.y;
	this.speed.x += this.acceleration.x * this.epsilon;
	this.speed.y += this.acceleration.y * this.epsilon;
	this.pos.x += this.speed.x * this.epsilon;
	this.pos.y += this.speed.y * this.epsilon;
};

Screensaver.prototype.computeCollisions = function() {
	if ((this.pos.x <= 0 && (this.speed.x * this.epsilon + this.pos.x) < this.pos.x)
		|| ((this.pos.x >= this.boxSize.x - this.objSize.x) && ((this.speed.x * this.epsilon + this.pos.x) > this.pos.x))){
		this.speed.x = -this.speed.x;
	}

	if ((this.pos.y <= 0 && (this.speed.y * this.epsilon + this.pos.y) < this.pos.y)
		|| ((this.pos.y >= this.boxSize.y - this.objSize.y) && ((this.speed.y * this.epsilon + this.pos.y) > this.pos.y))){
		// do {} while false;
		this.speed.y = -this.speed.y;
	}
};

Screensaver.prototype.dist = function(pt1, pt2) {
	return Math.sqrt(Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2))
};

Screensaver.prototype.norm = function(pt1) {
	var pt2 = {
		x: 0,
		y: 0
	}
	return this.dist(pt1, pt2);
};

var scsv = new Screensaver();