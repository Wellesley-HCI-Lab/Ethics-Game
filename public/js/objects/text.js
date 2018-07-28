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


	/**
     * Loads the text bubble images
     * @memberOf module:Text
     */
	function load(bubble, path) {
        game.load.image(bubble, path);
        // game.load.image(button, path);
	}

	/**
     * Sets up speech bubble sprites
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
    function createNextButton(X, Y, button, scale, actionOnClick){
        nextButton = game.add.button(X, Y, button, actionOnClick, this, 1, 0, 2);
        nextButton.scale.setTo(scale, scale);
        buttonX = X; buttonY = Y;
        nextButton.alpha = 0;
        game.add.tween(nextButton).to( {alpha: 1 }, 1000, Phaser.Easing.Circular.InOut, true);
    }
    
	return {
        load: load,
        create: create,
        createNextButton: createNextButton
        // addContent: addContent,
        // actionOnClick: actionOnClick
    };
}());