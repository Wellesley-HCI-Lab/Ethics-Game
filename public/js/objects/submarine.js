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
		game.load.image('subAboveWater', 'images/submarine/subHiddenAboveWater.png');
	}

	/**
     * Sets up the submarine sprite (right now only one)
     * @memberOf module:submarine
     */
	function create() {
		// submarine above water
		// subAboveWater = addScaledSprite(-0, 0, false, 'subAboveWater', 0.25);
		subAboveWater = addSprite(0, 0, false, 'subAboveWater', game.width, game.height);
	}

	return {
        load: load,
		create: create
    };
}());
