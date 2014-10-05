'use strict';

define('Field', [], function() {

	function Field(config) {
		var self = this;
		$.extend(self, config);

		self.width = self.$el.width();
		self.height = self.$el.height();

		self.time = 0;
		self.armies = self.armies || [];
	}

	Field.prototype.startRendering = function() {
		var self = this;

		window.requestAnimationFrame(function(now) {
			self.time = now;
			self.renderFrame(now);
			d3.select('#field').style('visibility', 'visible');

			window.requestAnimationFrame(self.renderFrame.bind(self));
		});


	}

	Field.prototype.renderFrame = function(now) {
		var self = this;

		var units;

		var scores = d3.select('#scoreboard').selectAll('div').data(self.armies)
		scores
			.enter()
				.append('div')

		scores
			.text(function(army) {
				return army.soldiers.length;
			})
			.attr('class', function(army) {
				return army.class;
			});



		var delta = now - self.time;
		self.time = now;
		window.requestAnimationFrame(self.renderFrame.bind(self));

		self.combat.update();

		self.armies.forEach(function(army) {
			army.update(delta, now, self, self.combat);
		});


		self.armies.forEach(function(army) {
			units = d3.select('#field').selectAll('i.'+army.class);

			// updates the collection
			units = units.data(army.soldiers)

			// adds new
			units
				.enter()
					.append('i')
					.attr('class', army.class)
					.style('position', 'absolute' )

			// removes dead
			units
				.exit()
					.remove()

			// updates all
			units
				.style('transform', function(d) { return 'translate3d('+d.loc[0]+'px,'+d.loc[1]+'px,0)'; })

		});
	}

	return Field;
});
