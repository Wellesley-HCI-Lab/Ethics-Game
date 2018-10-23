
/**
 * PROGRESSION OF STATES (updated 9/21)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js ->  dilemmaOne.js -> crispeePlay.js -> socialBiosensor.js -> sbGame.js
 * The crispeePlay state, where the user gets to input blocks into CRISPEE
 * in order to change the color of Angie's lure.
 * @exports findAnglerfishState
 */
var content;
var block;
var index;
var text;

var consequenceState = {
    load: function(){ consequence.load();},
    create: function(){ consequence.create(); },
    update: function(){  BootState.updateLevel('sbGame','toxins'); }
}

var consequence = (function() {

    var load = function(){
    }

    var create = function(){
        //script content variable
        content = ["I can’t believe what I’m seeing! Other\nAnglerfishes are appearing!", //0
        "With this many in one spot, we can\nlearn about these creatures and how\nthey interact!", //1
        "Huh? What’s this?", //2
        "Their prey population going down\nmuch too fast! There isn’t enough\nfood for all the fish!",//3
        "This isn’t great for the Anglerfish.\nWe should stop this experiment for\nnow.",//4
        "Let’s bring Angie back on board, and\nsee if we can figure out what went\nwrong in our experiment.",//5
        "Do you have any idea why all the\nfood disappeared and the fishes\nstarted getting hungry?",//6
        "Maybe things that seem really\nhelpful may not be as helpful as\nwe think they are.",//7
        "Our task is going to be harder than\nwe thought!",//8
        "Experiments don’t always work but\nwe’ll find a way to learn more\nabout the deep sea!",//9
        "We should get moving if we want to\nlearn more."//10
        ];

        subBackground = addSprite(0, 0, false, 'subFish', game.width, game.height);

        index = 0;

       //add border and next button, make them appear
        bubble = Text.create(30, -70, 'speechLong', 0.11);
        next = Text.createNextButton(305, 95, 0.2, function(){
            actionOnClick();
        }, 1);

        //format and hide text
        text = game.add.text(55, 30, content[index], 
            {font: "22px Arial",
            fill: "#000000",
            align: "left"});
        text.alpha = 0;

       //show text and add animation
        game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
        index++;
    }

    //callback for next button to change trigger various events
    function actionOnClick(){
        switch(index){
        	//fish population decreasing cutscene
        	case 3:
        		subBackground.alpha = 0;
        		fishesCutscene();
        		break;
        	//going back to the lab
        	case 6:
        		text.setText(content[index]);
        		fishSprite.alpha = 0;

        		newBackground = Anglerfish.createTankEnvironment();
                
                Scientist.create(-140, 400);
        		fish = game.add.sprite(280, 145,'angieWhite');
                fish.scale.setTo(0.1,0.1);

        		game.world.bringToTop(fish);
        		game.world.bringToTop(bubble);
        		game.world.bringToTop(next);
        		game.world.bringToTop(text);

                index++;

        		break;
            //going to next phase
            case (content.length):
                game.state.start('toxins');
                break;
            default:
                text.setText(content[index]);
                index++;
        }
    }

    function fishesCutscene() {
    	next.inputEnabled = false;

        fishSprite = game.add.sprite(-1, -1, 'fishSpritesImg');
        fishSprite.animations.add('cutscene',[0,1,2,3,4,5]);
        fishSprite.animations.play('cutscene', 1, false);
        fishSprite.scale.set(1);
        fishSprite.smoothed = false;

        angieSprite = game.add.sprite(300, 200, 'angieHunger');
        angieSprite.animations.add('cutscene',[0,1,2,3]);
        angieSprite.animations.play('cutscene', 1, false);
        angieSprite.scale.set(1);
        angieSprite.smoothed = false;
        game.world.bringToTop(angieSprite);

        //call the second animation when the first one is complete
        fishSprite.animations.currentAnim.onComplete.add(
            function () {
            	console.log(index);
            	next.inputEnabled = true;
       			
        		game.world.bringToTop(bubble);
        		game.world.bringToTop(next);
        		game.world.bringToTop(text);

        		text.setText(content[index]);
        		index++;
            }, this);
    }

    return {      
        load: load, 
        create: create
    };

}());