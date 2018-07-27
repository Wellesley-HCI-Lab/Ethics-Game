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
        // game.load.image('crispee', 'images/crispee/crispeeEmpty.png');
        // game.load.image('blueBlockOut', 'images/blocks/blueBlockOut.png')
        BlocksToCrispee.load();
	}

	/**
     * Sets up background sprites
     * @memberOf module:Crispee
     */
	function create() {
        BlocksToCrispee.create();
    }


	return {
        load: load,
        create: create
    };
}());
