/**
 * Exports submarine underwater environment
 * @exports SubUnderwater
 */
var SubUnderwater = (function() {
	/**
     * Loads background images
     * @memberOf module:SubUnderwater
     */
	function load() {
		game.load.image('inSubLookingOut', 'images/submarine/inSubLookingOut.png');
	}

	/**
     * Sets up background sprites
     * @memberOf module:SubUnderwater
     */
	function create() {
		// Adds the the image of the submarine underwater, as the user is looking out
		addSprite(0, 0, false, 'inSubLookingOut', game.width, game.height);
	}

	return {
        load: load,
        create: create
    };
}());
