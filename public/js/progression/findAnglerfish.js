/**
 * PROGRESSION OF STATES (updated 7/24)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js
 * The findAnglerfishState, where the submarine sees the glow in the water
 * and discovers an anglerfish
 * @exports findAnglerfishState
 */

var findAnglerfishState = {
	// preload: function(){ FindAnglerfish.load(); },
    create: function(){ FindAnglerfishState.create(); },
    update: function(){ FindAnglerfishState.update();},
    destroy: function(){ if(testing) BootState.updateLevel('learn'); }

	// shutdown: function(){ FindAnglerfish.shutdown(); }
}


var introText;
var text;
var content;
var index;
var newIndex;
var signalCrossed;
var speechBubble;
var nextButton;

var FindAnglerfishState = (function() {

    var create = function(){
        SubUnderwater.create();
        GlowingAnglerfish.create()
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        speechBubble = Text.create(-30, 250, 'speechBubble', 0.15);
        text = game.add.text(45, 380, 'I wonder what that could be?\nIf you click on it maybe we can find\nout.', 
            {font: "22px Arial",
            fill: "#000000",
            align: "left"});
        text.alpha = 0;
        game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);

        content = ["My goodness!", "I'm not sure what it is?\n Do you?", 
        "Maybe the radio can tell us more?",
        "Radio, My crew of explorers have found\n an interesting animal!", "Can you help us a bit?", 
        "Of course! \n just describe what you see.",
        "I'm sure it's a fish! It has a very big jaw,\n with a bulb floating right above it!", 
        "Wow! This is exciting news!","You've encountered a live Anglerfish",
        "From what scientists know about them,\n there are a few important things to know\n about Anglerfish",
        "Anglerfish are deep sea creatures\n that live in solitude.\n This means they prefer to be alone.",
        "That bulb hanging from their head is called\n a lure.",
         "The lure helps them to attract curious prey\n into their large mouths,\nand sometimes, to attract friends." ];
        index = 0;
        nextButton = Text.createNextButton(300, 490, 0.2, actionOnClick, 0);
    }


    var update = function(){
        { if(testing) BootState.updateLevel('learn'); }
        GlowingAnglerfish.update();
        if (angieAppears.alpha === 1){
            nextButton.alpha = 1;
            if (index ===0){
                text.setText(content[0]);
                index++;
            }
        };
    }

    function actionOnClick(){
        if (index === content.length){
            console.log('1');
            game.state.start('learn');
            return;
        } else if (index > 2 && index< content.length){
            console.log('3');
            text.setText(content[index]);
            walkie = game.add.sprite(400,200,'radio');
            walkie.scale.setTo(1,1);
            walkie.animations.add('walk');
            walkie.animations.play('walk', 5, true);
            index++;
        } else {
            if (typeof walkie !== "undefined") {walkie.destroy();}
            text.setText(content[index]);
            console.log(content[index])
            index++;
        }
    }
        
    //     ///////////////////ACTIONS REQUIRED//////////////

    //     //MAKE SCIENTIST APPEAR WHEN SHE'S TALKING

    //     //MAKE ZOOM IN OF ANGIE - DISCUSS WITH GROUP/ MAKE IT MORE STREAMLINE INSTEAD OF HAVING IT DRAWN

    //     if (index == content.length){ // PROBS CHANGE TO newIndex instead of index b/c undefined at end
    //         text.destroy(); //text is destroyed
    //         speechButton.pendingDestroy = true; // button for text is destroyed
    //         textBubble.destroy();
    //         walkie.destroy();

    //         //JUST FOR NOW TO INTEGRATE ONTAP - CHANGE BUTTON WORDS TO SAY 'BRING ANGIE ONBOARD'
    //         speechButton = game.add.button(500, 500, 'next', onTap, this, 1, 0, 2);
    //         speechButton.scale.setTo(0.1, 0.1);
    //         return;
    //     }
    // } //END OF ONCLICK

    

    var onTap = function(){
        game.state.start('learn');
    }


    return {       
        create: create,
        update: update,
        onTap: onTap
    };

}());