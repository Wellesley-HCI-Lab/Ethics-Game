/**
 * Exports Text
 * @exports text
 */
var Text = (function() {
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
     * @memberOf module:Scientist
     */
	function create(X, Y, bubble, scaleX, scaleY) {
		// Adds the the image of Pam above ground, outside the submarine 
        text = game.add.sprite(X, Y, bubble);
        text.scale.setTo(scaleX, scaleY);
		text.alpha = 0;
        tween = game.add.tween(text).to( { alpha: 1 }, 1000, Phaser.Easing.Back.Out, true);
        return text;
    }
    
    function createNextButton(X, Y, button, scaleX, scaleY, actionOnClick){
        nextButton = game.add.button(X, Y, button, actionOnClick, this, 1, 0, 2);
        nextButton.scale.setTo(scaleX, scaleY);
        nextButton.alpha = 0;
        game.add.tween(nextButton).to( {alpha: 1 }, 1000, Phaser.Easing.Back.Out, true);
    }

    // function actionOnClick(){

    // }

	return {
        load: load,
        create: create,
        createNextButton: createNextButton
    };
}());
