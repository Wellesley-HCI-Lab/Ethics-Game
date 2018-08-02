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
	

    var create = function(){
    	//background2 = BlocksToCrispee.create(0);
        background = Anglerfish.create();
        //BlocksToCrispee.create(0);
        //Scientist.create(-140, 400);
        speechBubble = Text.create(315, 280, 'speechBubble', 0.15);
        nextButton = Text.createNextButton(640, 522, 0.2, actionOnClick,1);

        content =["We brought Angie aboard and we’ve\n fixed her light! She’s now \nready to go.",
        "What do we know about anglerfish?",
        "Can you think of a way in which\n Angie can help us discover\n other deep sea creatures?",
        "Do you know that a biosensor\n is when a living thing acts\n like a sensor?",
        "Your body has senses that tell\n you when it's hot and cold\n and when music is playing",
        "Animal bodies also have \nspecial senses that can tell them\n things.",
        "Like when another animal\n like them is nearby. ",
        "We can use CRISPEE to add\n these special senses, called biosensors,\n into an animal's gene program",
        "If Angie has a biosensor,\n her light could point us to\n other anglerfish",
        "Doing this could help us observe\n them!",
        "What color should Angie light up\n when she senses friends in her\n environment?",
        "blahabakak"
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
            	//console.log("b" + BlocksToCrispee.create(0).world.x);


             	
             	//game.world.swap(background, background2);
          //    	speechBubble = Text.create(10, -60, 'speechBubble', 0.1);
        		// nextButton = Text.createNextButton(190, 90, 0.2, actionOnClick,1);
        		// content = ["Place the blocks in CRISPEE to what happens!"];
        		// index = 0;
        		// text = game.add.text(60, 25, content[index], 
		        //     {font: "22px Arial",
		        //     fill: "#000000",
		        //     align: "left"});
		        // text.alpha = 0;
		        // game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);

             	text.setText(content[index]);
             	index++;
             }

            text.setText(content[index]); 
        	index++;
         }


         function moveBack(){

         }
    }//end of create function


    return {       
        create: create
    };

}());