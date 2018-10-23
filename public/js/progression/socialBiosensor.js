/**
* PROGRESSION OF STATES (updated 9/21)
* boot.js -> load.js -> intro.js -> findAnglerfish.js ->  dilemmaOne.js -> crispeePlay.js -> socialBiosensor.js -> sbGame.js
* -> sbGame.js
* The Learn state, where the user gets to explore facts about Anglerfish
* @exports socialBiosensorState
*/

var socialBiosensorState = {
    create: function(){ SocialBiosensorState.create();},
    update: function(){ if(testing) BootState.updateLevel('sbGame');}
}

var background;
var background2;
var index;
var content;
var speechBubble;
var nextButton;
var mixButton;
var color;

var SocialBiosensorState = (function() {
	var load = function(){
		game.load.image('angieMagenta', 'images/anglerfish/angieMagenta.png');
		game.load.image('angieWhite', 'images/anglerfish/angieWhite.png');
        game.load.image('angieYellow', 'images/anglerfish/angieYellow.png');
        game.load.image('angieCyan', 'images/anglerfish/angieCyan.png');
        game.load.image('angieRed', 'images/anglerfish/angieRed.png');
        game.load.image('angieBlue', 'images/anglerfish/angieBlue.png');
        game.load.image('angieGreen', 'images/anglerfish/angieGreen.png');
	}
	
    var create = function(){
    	background2 = BlocksToCrispee.createCrispeeW(1);
        background = Anglerfish.createTankEnvironment();

        fish = game.add.sprite(280, 145,'angieWhite');
        fish.scale.setTo(0.1,0.1);

        //BlocksToCrispee.create(0);
        Scientist.create(-140, 400);
        speechBubble = Text.create(315, 280, 'speechBubble', 0.15);
        nextButton = Text.createNextButton(640, 522, 0.2, actionOnClick,1);

        content =["We brought Angie aboard and we’ve\nfixed her light! She’s now ready\nto go.",//0
        "Maybe she can help us locate other\nangler fish like her! Can we use\nCRISPEE to help?",//1
        "Just like there are genes that make\nglowing colors, some genes let\nanimals use special senses.",//2
        "Do you know what your senses\nare?",//3
        "We can use CRISPEE to add these\nspecial senses, called biosensors\ngenes, into an animal's gene\nprogram.",//4
        "Here is one biosensor that we can\ntry now. It lets Angie know when\nshe is near other angler fish.",//5
        "Let’s combine all of our CRISPEE\nskills and program Angie to alert us\nwhen she finds other fish!",//6
        "What color should Angie light up\nwhen she senses friends in her\nenvironment?",//7
        "Remember, if you program the same\ncolor as before, it will be hard for\nhumans to tell when she senses\nfriends are near or far away.",//8
        "Click the button that appears after\nyou've added your genes. This button\nmixes your program!"];

        index = 0;
        text = game.add.text(390, 420, content[index], 
            {font: "22px Arial",
            fill: "#000000",
            align: "left"});
        text.alpha = 0;
        game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
        console.log(" intitial a: " + index);
        index++;
        


         function actionOnClick(){
            switch(index){
                case (content.length):
                    game.state.start('sbGame');
                    break;
                case 7:
                    background.alpha = 0; // made old background disappear
                    background2 = BlocksToCrispee.createCrispeeW(); // made new backgroound with tank in back and CRISPEE in front appear

                    bubble = Text.create(0, -80, 'speechLong', 0.12); // create text box at the top
                    nextButton = Text.createNextButton(310, 105, 0.2, actionOnClick,1); // next button that triggers actionOnClick appears
                    text = game.add.text(20, 20, content[index], 
                                {font: "22px Arial",
                                fill: "#000000",
                                align: "left"});


                    text.setText(content[index]);
                    index++;
                    break;
                case 9:
                    nextButton.pendingDestroy = true; 

                    BlocksToCrispee.blockOutRedOn(); //
                    BlocksToCrispee.blockOutRedOff();

                    BlocksToCrispee.blockOutBlueOn();
                    BlocksToCrispee.blockOutBlueOff();

                    BlocksToCrispee.blockOutGreenOn();
                    BlocksToCrispee.blockOutGreenOff();
                default:
                    text.setText(content[index]); 
                    index++;
            }
         }
    }//end of create function

    return {     
    	load: load, 
        create: create
    };

}());