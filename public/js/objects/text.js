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
	function create(X, Y, bubble, scaleX, scaleY) {
		
        text = game.add.sprite(X, Y, bubble);
        text.scale.setTo(scaleX, scaleY);
		text.alpha = 0;
        tween = game.add.tween(text).to( { alpha: 1 }, 1000, Phaser.Easing.Circular.InOut, true);
        return text;
    }
    
    /**
     * Sets up sa next button to go with speech bubble
     * @memberOf module:Text
     */
    function createNextButton(X, Y, button, scaleX, scaleY){
        nextButton = game.add.button(X, Y, button, actionOnClick, this, 1, 0, 2);
        nextButton.scale.setTo(scaleX, scaleY);
        buttonX = X; buttonY = Y;
        nextButton.alpha = 0;
        game.add.tween(nextButton).to( {alpha: 1 }, 1000, Phaser.Easing.Circular.InOut, true);
    }

    /**
     * Handles changing text on the speech bubble
     * argument content is an array of sentences
     * @memberOf module:Text
     */ 
    function addContent(wordArray, X, Y, state){
        index = 0;
        content = wordArray;
        nextState = state;
        // console.log(content[0]);
        // console.log(typeof content)
        text = game.add.text(X, Y, content[index], 
            {font: "22px Arial",
            fill: "#000000",
            align: "left"});
        text.alpha = 0;
        game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
        index++; 
        return index;
        }

    function actionOnClick() {
        // console.log(content)
        if (typeof content !== 'undefined' && index === content.length ){
                nextButton = game.add.button(buttonX, buttonY, 'next', onTap, this, 1, 0, 2);
                nextButton.scale.setTo(0.1, 0.1);
                return text;
        } else {
            text.setText(content[index]);
            console.log(index)
            index++;
            return index;
            // console.log(index)
        }
    }

        // // Handles radio animation
        // if (index != 10){
        //     if (typeof radio !== "undefined"){
        //         radio.destroy();
        //     }
        // } else {
        //     radio = game.add.sprite(150, 50,'radio');
        //     radio.scale.setTo(1,1);
        //     radio.animations.add('walk');
        //     radio.animations.play('walk', 5, true); 
        // }



    function onTap() {
        game.state.start(nextState);
    }
    
	return {
        load: load,
        create: create,
        createNextButton: createNextButton, 
        addContent: addContent,
        actionOnClick: actionOnClick
    };
}());
