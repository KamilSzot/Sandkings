'use strict';
require(['Combat', 'Army', 'Loc', 'Field'], function(Combat, Army, Loc, Field) {
	var l = console.log.bind(console);



	var $field = $('#field');

	var reds = new Army({
		spawn: Loc(40, 40),
		spawnZone: 30,
		class: 'red'
	});

	var blues = new Army({
		spawn: Loc($field.width()-41, $field.height()-41),
		spawnZone: 30,
		class: 'blue'
	});

	var greens = new Army({
		spawn: Loc($field.width()-41, 40),
		spawnZone: 30,
		class: 'green'
	});

	var yellows = new Army({
		spawn: Loc(40, $field.height()-41),
		spawnZone: 30,
		class: 'yellow'
	});

	reds.attack(blues);
	blues.attack(reds);
	greens.attack(yellows);
	yellows.attack(greens);

	var armies = [reds, blues, greens, yellows];

	var field = new Field({
		$el: $('#field'),
		armies: armies,
		combat: new Combat({ armies: armies})
	});


	field.startRendering();


	function ang(a) {
		if(a>=0) {
			return a % (2*Math.PI);
		}
		return - (-a % (2*Math.PI));
	}



	console.log("ok");

});