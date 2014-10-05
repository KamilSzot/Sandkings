'use strict';

define('Combat', [], function() {
	function Combat(config) {
		var self = this;
		$.extend(self, config);
	}

	Combat.prototype.update = function() {
		var self = this;
		var armies = self.armies;

		_.each(armies, function(army) {
			_.each(army.soldiers, function(soldier) {
				soldier.closestEnemyDistance = undefined;
				soldier.closestEnemy = undefined;
			});
		});

		// randomize order in which armies are considered when resolving combat
		var shuffle = _.shuffle(_.range(armies.length));

		for(var armyIndex = 0; armyIndex < armies.length - 1; armyIndex++) {
			var army = armies[shuffle[armyIndex]];
			for(var enemyIndex = armyIndex + 1; enemyIndex < armies.length; enemyIndex++) {
				var enemy = armies[shuffle[enemyIndex]];

				for(var i = 0; i < army.soldiers.length; i++) {
					var soldier = army.soldiers[i];
					if(soldier !== undefined) {
						for(var j = 0; j < enemy.soldiers.length; j++) {
							var enemySoldier = enemy.soldiers[j];
							if(enemySoldier !== undefined) {
								var dist = soldier.loc.distanceTo(enemySoldier.loc);
								if(dist < 10) {
									if(Math.random() < 0.5) {
										army.soldiers[i] = undefined;
										break;
									} else {
										enemy.soldiers[j] = undefined;
									}
								} else if(dist < 50) {
									if(!(soldier.closestEnemyDistance < dist)) {
										soldier.closestEnemyDistance = dist;
										soldier.closestEnemy = enemySoldier;
									}
									if(!(enemySoldier.closestEnemyDistance < dist)) {
										enemySoldier.closestEnemyDistance = dist;
										enemySoldier.closestEnemy = soldier;
									}
								}
							}
						}
					}
				}
			}
		}


		armies.forEach(function(army) { 
			army.soldiers = army.soldiers.filter(function(s) { return s !== undefined; }) 
		});
	}

	return Combat;
});