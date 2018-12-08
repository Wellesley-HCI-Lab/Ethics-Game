/**
* PROGRESSION OF STATES (updated 9/21)
* boot.js -> load.js -> intro.js -> findAnglerfish.js ->  dilemmaOne.js -> crispeePlay.js -> socialBiosensor.js -> sbGame.js
* -> sbGame.js
* The Learn state, where the user gets to explore facts about Anglerfish
* @exports socialBiosensorState
*/

var socialBiosensorState = {
    create: function(){ SocialBiosensorState.create();},
    update: function(){  BootState.updateLevel('crispeePlay','sbGame'); }
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
        "Maybe she can help us locate other\nangler fish like her! Can we use\nbioengineering to help?",//1
        "Just like there are genes that make\nglowing colors, some genes let\nanimals use special senses.",//2
        "Do you know what your senses\nare?",//3
        "We can use bioengineering to add \nspecial senses, called biosensors\ngenes, into an animal's gene\nprogram.",//4
        "Here is one biosensor that we can\ntry now. It lets Angie know when\nshe is near other angler fish.",//5
        "Let’s use all of our bioengineering\nskills and program Angie to alert us\nwhen she finds other fish!",//6
        "What color should Angie light up\nwhen she senses friends in her\nenvironment?",//7
        "Remember, if you program the same\ncolor as before, it will be hard for\nhumans to tell when she senses\nfriends are near or far away.",//8
        "Click the color you want Angie's\nlight to be."];

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

                    //add new background with color machine
                    crispee = addSprite(0, 0, false, 'colorMachine', game.width, game.height);

                    //buttons for color machine with their input disabled
                    white = game.add.button(225, 300, 'whiteButton', function(){showAngieLight('white');});
                    white.scale.setTo(.3,.3)
                    white.inputEnabled = false;

                    blue = game.add.button(325, 300, 'blueButton', function(){showAngieLight('blue');});
                    blue.scale.setTo(.3,.3)
                    blue.inputEnabled = false;

                    red = game.add.button(375, 350, 'redButton', function(){showAngieLight('red');});
                    red.scale.setTo(.3,.3)
                    red.inputEnabled = false;

                    green = game.add.button(175, 350, 'greenButton', function(){showAngieLight('green');});
                    green.scale.setTo(.3,.3)
                    green.inputEnabled = false;

                    cyan = game.add.button(275, 350, 'cyanButton', function(){showAngieLight('cyan');});
                    cyan.scale.setTo(.3,.3)
                    cyan.inputEnabled = false;

                    yellow = game.add.button(200, 400, 'yellowButton', function(){showAngieLight('yellow');});
                    yellow.scale.setTo(.3,.3)
                    yellow.inputEnabled = false;

                    magenta = game.add.button(300, 400, 'magentaButton', function(){showAngieLight('magenta');});
                    magenta.scale.setTo(.3,.3)
                    magenta.inputEnabled = false;

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
                    white.inputEnabled = true;
                    blue.inputEnabled = true;
                    red.inputEnabled = true;
                    green.inputEnabled = true;
                    cyan.inputEnabled = true;
                    yellow.inputEnabled = true;
                    magenta.inputEnabled = true;

                default:
                    text.setText(content[index]); 
                    index++;
            }
         }

         function showAngieLight(color){
            tank = Anglerfish.createTankEnvironment();
            angie = addScaledSprite(300, 150, false, 'angie'+color, 0.1);
            game.world.bringToTop(angie);

            speechBubble = Text.create(315, 280, 'speechBubble', 0.15);
            nextButton = Text.createNextButton(640, 522, 0.2, actionOnClick,1);

            content = ["Great, you did it!", 
            "Now Angie has a biosensor\nthat lights up "  + color + " \nwhen other anglerfish are near.",
            "Let’s put Angie back in the ocean,\nand see if the other fish come\nnear her."];

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
                addSprite(0, 0, false, 'stop3', game.width, game.height);
                    next = Text.createNextButton(350, 450, 0.2, function(){
                         game.state.start('sbGame');
                     }, 1);
                }
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