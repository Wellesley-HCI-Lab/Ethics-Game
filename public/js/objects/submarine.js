/**
 * Loads submarine images
 * @exports Submarine
 */
var Submarine = (function() {
	/**
     * Loads background images
     * @memberOf module:submarine
     */
	function load() {
		game.load.image('subAboveWater', 'images/submarine/longAboveWaterSub.png');
	}

	/**
     * Sets up the submarine sprite (right now only one)
     * @memberOf module:submarine
     */
	function create() {
		// submarine above water
		subAboveWater = addScaledSprite(-100, 0, false, 'subAboveWater', 0.24);
	}

	function move() {
		// game.add.tween(subAboveWater).to( { x: -400}, 2000, Phaser.Easing.Linear.None, true);
		// game.add.tween(subAboveWater).to( { x: -100}, 100, Phaser.Easing.Linear.None, true);


	}

	return {
        load: load,
		create: create,
		move: move
    };
}());
