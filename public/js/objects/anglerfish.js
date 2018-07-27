/**
 * Exports Anglerfish object
 * @exports Anglerfish
 */
var Anglerfish = (function() {
	/**
     * Loads images of anglerfish and learning environment
     * @memberOf module:Anglerfish
     */
	function load() {
        game.load.image('angieInfo', 'images/anglerfish/angieInfo.png');
        game.load.image('tank', 'images/anglerfish/tank.png');
        game.load.image('angieBlack', 'images/anglerfish/angieBlack.png')
	}

	/**
     * Sets up background sprites
     * @memberOf module:Crispee
     */
	function create() {
		// Adds the the image of Pam above ground, outside the submarine 
		addSprite(0, 0, false, 'angieInfo', game.width, game.height);
    }

    function createTankEnvironment(){
        tank = addSprite(0, 0, false, 'tank', game.width, game.height);
    }


	return {
        load: load,
        create: create,
        createTankEnvironment: createTankEnvironment
    };
}());
