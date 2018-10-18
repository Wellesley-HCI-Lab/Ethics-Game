/**
* PROGRESSION OF STATES (updated 9/21)
* boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js -> socialBiosensor.js -> sbGame.js
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
        //BlocksToCrispee.create(0);
        Scientist.create(-140, 400);
        speechBubble = Text.create(315, 280, 'speechBubble', 0.15);
        nextButton = Text.createNextButton(640, 522, 0.2, actionOnClick,1);

        content =["We brought Angie aboard and we’ve\nfixed her light! She’s now \nready to go.", //0
        "What do we know about anglerfish?",
        "Can you think of a way in which\nAngie can help us discover\nother deep sea creatures?",
        "Did you know that a biosensor\nis when a living thing acts\nlike a sensor?",
        "Your body has senses that tell\nyou when it's hot and cold\nand when music is playing.",
        "Animal bodies also have \nspecial senses that can tell them\nthings about their environment.",
        "For example, their senses can tell \nthem when another animal\nlike them is nearby.", //6
        "We can use CRISPEE to add\nthese special senses, called \nbiosensors, into an animal's gene \nprogram.",
        "If Angie has a biosensor,\nher light could point us to\nother anglerfish.",
        "Doing this could help us observe\nthem!",
        "What color should Angie light up\nwhen she senses friends in her\nenvironment?", // index equals 10
        "Code a color that will act as\na biosensor.", 
        "Click the button that appears\nafter you've filled all three slots.\nThis button mixes your program!"//12
        ];
        //radioContent = [];

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
        	if (index === content.length){
                game.state.start('sbGame');
                return;
             }
            console.log("a: " + index);
            if (index === 10){
            	background.alpha = 0; // made old background disappear
            	background2 = BlocksToCrispee.createCrispeeW(); // made new backgroound with tank in back and CRISPEE in front appear

            	bubble = Text.create(30, -60, 'speechLong', 0.11); // create text box at the top
            	nextButton = Text.createNextButton(280, 84, 0.2, actionOnClick,1); // next button that triggers actionOnClick appears
            	text = game.add.text(65, 30, content[index], 
				            {font: "22px Arial",
				            fill: "#000000",
				            align: "left"});


             	text.setText(content[index]);
             	index++;
             }

              if (index === 11){ 
              	console.log("index 11 is not skipped you just buggin");
         		}

             if (index === 12){ 
             	nextButton.pendingDestroy = true; 

             	BlocksToCrispee.blockOutRedOn(); //
            	BlocksToCrispee.blockOutRedOff();

            	
            	BlocksToCrispee.blockOutBlueOn();
            	BlocksToCrispee.blockOutBlueOff();


                BlocksToCrispee.blockOutGreenOn();
            	BlocksToCrispee.blockOutGreenOff();}

            text.setText(content[index]); 
        	index++;
         }


         //function resetGame(){
         	//index = 10;
         //}
    }//end of create function


    return {     
    	load: load, 
        create: create
    };

}());