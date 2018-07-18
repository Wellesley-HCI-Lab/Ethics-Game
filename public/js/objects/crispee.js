/**
 * Exports Crispee object
 * @exports Crispee
 */
var Crispee = (function() {
	/**
     * Loads background images
     * @memberOf module:Crispee
     */
	function load() {
		game.load.image('crispee', 'images/crispee/crispeeEmpty.png');
	}

	/**
     * Sets up background sprites
     * @memberOf module:Crispee
     */
	function create() {
		// Adds the the image of Pam above ground, outside the submarine 
		addSprite(0, 0, false, 'crispee', game.width, game.height);
    }


	return {
        load: load,
        create: create
    };
}());
