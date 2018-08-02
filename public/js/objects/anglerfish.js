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
        game.load.image('angieBlack', 'images/anglerfish/angieBlack.png');
        //game.load.image('bioExplWhite', 'images/anglerfish/bioExplWhite-01.png');
	}

	/**
     * Sets up background sprites
     * @memberOf module:Crispee
     */
	function create() {
		// Adds the the image of Pam above ground, outside the submarine 
		sprite = addSprite(0, 0, false, 'angieInfo', game.width, game.height);
    }

    function createTankEnvironment(){
        tank = addSprite(0, 0, false, 'tank', game.width, game.height);
    }

    //function createbioExplCyan(){

    //}

    //function createbioExplYellow(){
        
    //}

    //intended to repace original image
    //function createbioExplWhite(){
     //   addSprite(0,0, false, 'bioExplWhite', game.width, game.height);
        
    //}

    //function createbioExplFound(){
        
    //}


	return {
        load: load,
        create: create,
        createTankEnvironment: createTankEnvironment
        //createbioExplWhite: createbioExplWhite
    };
}());
