define('Loc', ['Direction'], function(Direction) {
	
	function Loc() {
		var self = this;
		if(!(this instanceof Loc)) {
			self = Object.create(Loc.prototype);
		}

		self.push.apply(self, arguments);
		return self;
	}
	Loc.prototype = Object.create([]);
	Loc.prototype.directionTo = function(target) {
		if(target[1] !== this[1] || target[0] !== this[0]) {
			return Direction(- Math.atan2(target[1] - this[1], target[0] - this[0]));
		}
		return new Direction();
	}
	Loc.prototype.distanceTo = function(target) {
		return Math.abs(target[1] - this[1]) + Math.abs(target[0] - this[0]);
	}
	Loc.prototype.move = function(direction, distance) {
		if(distance === undefined) distance = 1;

		this[0] += Math.cos(direction.angle) * distance;
		this[1] += -Math.sin(direction.angle) * distance;
	}


	return Loc;
});