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
		game.load.image('pam', 'images/scientist/Pam.png');
	}

	/**
     * Sets up background sprites
	 * Sets alpha to 0
     * @memberOf module:Scientist
     */
	function create(X, Y) {
		// Adds the the image of Pam above ground, outside the submarine 
		pam = addSprite(X, Y, false, 'pam', game.width, game.height);
		// pam.alpha = 0;
		tween = game.add.tween(pam).to( { y: 0 }, 2000, Phaser.Easing.Circular.InOut, true);
		// game.add.tween(pam).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
	}



	return {
        load: load,
		create: create
    };
}());
