/**
 * Loads submarine images
 * @exports submarine
 */
var Submarine = (function() {
	/**
     * Loads background images
     * @memberOf module:submarine
     */
	function load() {
		game.load.image('subAboveWater', 'images/submarine/subAboveWater.png');
	}

	/**
     * Sets up the submarine sprite (right now only one)
     * @memberOf module:submarine
     */
	function create() {
		// submarine above water
		addSprite(0, 0, false, 'subAboveWater', game.width, game.height, layers[LAYER.instructions]);
	}

	return {
        load: load,
        create: create
    };
}());
