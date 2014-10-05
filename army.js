'use strict';

define('Army', ['Direction', 'Loc'], function(Direction, Loc) {

	function Army(config) {
		var self = this;
		$.extend(self, config);
		self.soldiers = self.soldiers || [];
	}
	Army.prototype.attack = function(enemy) {
		var self = this;
		self.target = enemy;
	}
	Army.prototype.update = function(delta, now, field, combat) {
		var self = this;

		var targetArmies = _.map(_.filter(combat.armies, function(army) { return army !== self; }), function(army, i) { return [ army.soldiers.length, army ]; });
		targetArmies.sort();
		self.target = targetArmies[1][1]; // pick second least numerous aremy as target


		self.soldiers.forEach(function(d, i) {
			var targetDirection;
			if(self.target) {
				targetDirection = d.loc.directionTo(self.target.spawn);
			}


			if(d.closestEnemyDistance !== undefined) {
				d.a.inc(d.loc.directionTo(d.closestEnemy.loc).diff(d.a));
			}

			d.a.inc(Math.random()-0.5);
			if(targetDirection) {
				d.a.inc(targetDirection.diff(d.a)*0.05);
			}

			d.loc.move(d.a);

			if(d.loc[1] < 0) {
				d.loc[1] = 0;
				d.a.flipVertical();
			}
			if(d.loc[1] >= field.height) {
				d.loc[1] = field.height - 1;
				d.a.flipVertical();
			}
			if(d.loc[0] < 0) {
				d.loc[0] = 0;
				d.a.flipHorizontal();
			}
			if(d.loc[0] >= field.width) {
				d.loc[0] = field.width - 1;
				d.a.flipHorizontal();
			}
		});

	//	self.soldiers = self.soldiers.filter(function() {
	//		return Math.random() > 0.002;
	//	});

		if(Math.random() < 0.1) {
			self.soldiers.push({
				loc: Loc((Math.random()-0.5)*self.spawnZone + self.spawn[0], (Math.random() - 0.5)*self.spawnZone + self.spawn[1]),
				a: new Direction(),
				id: self.soldiers.length
			});
		}


	}
	return Army;
});