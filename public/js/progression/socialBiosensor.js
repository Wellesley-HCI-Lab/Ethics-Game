/**
* PROGRESSION OF STATES (updated 7/31)
* boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js -> socialBiosensor.js 
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




var SocialBiosensorState = (function() {
	var load = function(){
		game.load.image('angieMagenta', 'images/anglerfish/angieMagenta.png');
	}
	

    var create = function(){
    	background2 = BlocksToCrispee.createCrispeeW(1);
        background = Anglerfish.create();
        //BlocksToCrispee.create(0);
        Scientist.create(-140, 400);
        speechBubble = Text.create(315, 280, 'speechBubble', 0.15);
        nextButton = Text.createNextButton(640, 522, 0.2, actionOnClick,1);

        content =["We brought Angie aboard and we’ve\nfixed her light! She’s now \nready to go.",
        "What do we know about anglerfish?",
        "Can you think of a way in which\nAngie can help us discover\nother deep sea creatures?",
        "Did you know that a biosensor\nis when a living thing acts\nlike a sensor?",
        "Your body has senses that tell\nyou when it's hot and cold\nand when music is playing",
        "Animal bodies also have \nspecial senses that can tell them\nthings",
        "like when another animal\nlike them is nearby. ",
        "We can use CRISPEE to add\nthese special senses, called biosensors,\ninto an animal's gene program",
        "If Angie has a biosensor,\nher light could point us to\nother anglerfish",
        "Doing this could help us observe\nthem!",
        "What color should Angie light up\nwhen she senses friends in her\nenvironment?",
        "Code a color that will act as\na biosensor", "Click the button that appears\nafter you've filled all three slots.\nThis button mixes your program!"
        ];
        //radioContent = [];

        index = 0;
        text = game.add.text(390, 420, content[index], 
            {font: "22px Arial",
            fill: "#000000",
            align: "left"});
        text.alpha = 0;
        game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
        index++;


         function actionOnClick(){
        	if (index === content.length){
                game.state.start('sbGame');
                return;
             }
            console.log("a");
            if (index === 10){
            	background.alpha = 0;
            	background2 = BlocksToCrispee.createCrispeeW();

            	bubble = Text.create(30, -60, 'speechLong', 0.11);
            	nextButton = Text.createNextButton(280, 84, 0.2, actionOnClick,1);
            	text = game.add.text(65, 30, content[index], 
				            {font: "22px Arial",
				            fill: "#000000",
				            align: "left"});

            	//Scientist.destroy();
            	BlocksToCrispee.blockOutRedOn();
            	BlocksToCrispee.blockOutRedOff();

            	
            	BlocksToCrispee.blockOutBlueOn();
            	BlocksToCrispee.blockOutBlueOff();


                BlocksToCrispee.blockOutGreenOn();
            	BlocksToCrispee.blockOutGreenOff();


             	text.setText(content[index]);
             	index++;
             }
             if (index === 12){ nextButton.pendingDestroy = true;  }

            text.setText(content[index]); 
        	index++;
         }


         function resetGame(){
         	index = 10;
         }
    }//end of create function


    return {     
    	load: load, 
        create: create
    };

}());