'use strict';
define('Direction', [], function() {

	var Tau = Math.PI * 2;
	   
	function Direction(angle) {
		var self = this;
		if(!(self instanceof Direction)) self = Object.create(Direction.prototype);

		if(angle !== undefined) {
			self.angle = angle;
		} else {
			self.angle = Math.random() * Tau;
		}
		return self;
	}

	Direction.prototype.inc = function(delta) {
		var self = this;
		self.angle = (self.angle + Tau + delta % Tau) % Tau;
	}

	Direction.prototype.diff = function(other) {
		var self = this;

		return Math.abs(other.angle - self.angle) < Tau/2 ? self.angle - other.angle : self.angle + Tau - other.angle;
	}

	Direction.prototype.flipHorizontal = function() {
		var self = this;
		self.angle = (3/2*Tau - self.angle) % Tau;
	}

	Direction.prototype.flipVertical = function() {
		var self = this;
		self.angle = Tau - self.angle;
	}


	return Direction;
});