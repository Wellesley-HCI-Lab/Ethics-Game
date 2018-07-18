/**
 * Exports scientist
 * @exports Scientist
 */
var Scientist = (function() {
	/**
     * Loads background images
     * @memberOf module:Scientist
     */
	function load() {
		game.load.image('pam', 'images/scientist/pamDrawing.png');
	}

	/**
     * Sets up background sprites
     * @memberOf module:Scientist
     */
	function create() {
		// Adds the the image of Pam above ground, outside the submarine 
		addSprite(0, 0, false, 'pam', game.width, game.height);
	}

	return {
        load: load,
        create: create
    };
}());
