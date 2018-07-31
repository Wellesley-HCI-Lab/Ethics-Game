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
        Text.load('bubble', 'images/text/bubbleNew.png');
        BlocksToCrispee.load();
	}

	/**
     * Sets up background sprites
     * @memberOf module:Crispee
     */
	function create() {
        blocks = BlocksToCrispee.create(0);
        // blue = blocks.children[0];
        // red = blocks.children[1];
        // green = blocks.children[2];
        // transBlue = blocks.children[3];

        // blue.alpha = 1; red.alpha = 1; green.alpha = 1;
        // // transBlue.scale.setTo = (1, 1); transBlue.alpha = 1; 
        // blue.inputEnabled = false; red.inputEnabled = false;



        
        // Scientist.create(310, 400);
        // var contentOne = ["We can use our CRISPEE machine \nto genetically modify Angie’s genes \nso that she can light up.", 
        // "Let’s go over to our CRISPEE \nmachine and see what we can do."]
        // bubble = Text.create(-30, -100, 'bubble', 0.15);
        // bubble.alpha = 0;
        // index = 0;
        // text = game.add.text(30, 100, contentOne[index], 
        //     {font: "22px Arial",
        //     fill: "#000000",
        //     align: "left"});
        // text.alpha = 0;
        // game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
        // index++;


    }


	return {
        load: load,
        create: create
    };
}());
