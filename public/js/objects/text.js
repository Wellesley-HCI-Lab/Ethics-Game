/**
 * Exports Text
 * @exports text
 */
var Text = (function() {

    var buttonX;
    var buttonY;
    var index;
    var content = [];
    var text;
    var nextState;
    var nextButton;
    var nameButton;


	/**
     * Loads the text bubble images
     * @memberOf module:Text
     */
	function load(bubble, path) {
        game.load.image(bubble, path);
        // game.load.spritesheet('bubble', 'images/text/bubble.png', 521, 193);
        game.load.spritesheet('nextButton', 'images/text/nextButtonSprite.png', 521, 193);
        game.load.atlasJSONHash('nameButton', 'images/text/nameButtonSprite.png','images/text/nameButton.json');

        // game.load.image(button, path);
	}

	/**
     * Sets up speech bubble sprite with alpha set to 0;
     * @memberOf module:Text
     */
	function create(X, Y, bubble, scale) {
		
        text = game.add.sprite(X, Y, bubble);
        text.scale.setTo(scale, scale);
		text.alpha = 0;
        tween = game.add.tween(text).to( { alpha: 1 }, 1000, Phaser.Easing.Circular.InOut, true);
        return text;
    }
    
    /**
     * Sets up sa next button to go with speech bubble
     * @memberOf module:Text
     */
    function createNextButton(X, Y, scale, actionOnClick, alpha){
        console.log("Creating next button");
        nextButton = game.add.button(X, Y, 'nextButton', actionOnClick, this, 0, 1, 1);
        nextButton.scale.setTo(scale, scale);
        buttonX = X; buttonY = Y;
        nextButton.alpha = 0;
        game.add.tween(nextButton).to( {alpha: alpha }, 1000, Phaser.Easing.Circular.InOut, true);
        return nextButton;
    }

    //I was trying to figure out how to put the spritesheet for nameButton and nameClicked
    function createNameButton(X, Y, scale, actionOnClick, alpha){
        nameButton = game.add.button(X, Y, 'nameButton', actionOnClick, this, 0, 1, 1);
        nameButton.scale.setTo(scale, scale);
        buttonX = X; buttonY = Y;
        nameButton.alpha = 0;
        game.add.tween(nameButton).to( {alpha: alpha }, 1000, Phaser.Easing.Circular.InOut, true);
        return nameButton;
    }
    
	return {
        load: load,
        create: create,
        createNextButton: createNextButton,
        createNameButton: createNameButton
        // addContent: addContent,
        // actionOnClick: actionOnClick
    };
}());
