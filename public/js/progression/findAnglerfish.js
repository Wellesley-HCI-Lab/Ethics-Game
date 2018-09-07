/**
 * PROGRESSION OF STATES (updated 7/24)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js
 * The findAnglerfishState, where the submarine sees the glow in the water
 * and discovers an anglerfish
 * @exports findAnglerfishState
 */

var findAnglerfishState = {
	preload: function(){ FindAnglerfishState.load(); },
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
    var load = function(){
        game.load.image('zoom', 'images/anglerfish/angieZoomIn3.png');
    }

    var create = function(){
        SubUnderwater.create();
        GlowingAnglerfish.create();

        //what is this?
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        //format and add the speechBubble, hiding the text with alpha = 0
        speechBubble = Text.create(-30, 250, 'speechBubble', 0.15);
        text = game.add.text(45, 380, 'I wonder what that could be?\nIf you click on it maybe we can find\nout.', 
            {font: "22px Arial",
            fill: "#000000",
            align: "left"});
        text.alpha = 0;
        game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
        
        //add the zoom sprite and scale it, hiding it with alpha = 0
        zoom = game.add.sprite(300, 85, 'zoom');
        zoom.scale.setTo(0.7, 0.7);
        zoom.alpha = 0;

        //add the walkie talkie and scale it, plus animate it, hiding it with alpha = 0
        walkie = game.add.sprite(400,200,'radio');
        walkie.scale.setTo(1,1);
        walkie.animations.add('walk');
        walkie.animations.play('walk', 5, true);
        walkie.alpha = 0;

        content = ["My goodness!", "I'm not sure what it is?\nDo you?", 
        "Maybe the radio can tell us more?",
        "Radio, My crew of explorers have \nfound an interesting animal!", "Can you help us a bit?", 
        "Of course! \n just describe what you see.",
        "I'm sure it's a fish!\n It has a very big jaw,\n with a bulb floating right above it!", 
        "Wow! This is exciting news!","You've encountered a live Anglerfish",
        "There are a few important things to \nknow about Anglerfish",
        "Anglerfish are deep sea creatures\n that live in solitude.\n This means they prefer to be alone.",
        "That bulb hanging from their head is called\n a lure.",
         "The lure helps them to attract \n curious prey into their large mouths,\nand sometimes, to attract friends." ];
        
        index = 0;

        //create and add the callback function for the nextButton
        nextButton = Text.createNextButton(300, 490, 0.2, actionOnClick, 0);
    }

    //event loop for this progression
    var update = function(){
        { if(testing) BootState.updateLevel('learn'); }//for debugging
        GlowingAnglerfish.update();
        //if angie appears, make the next button appear
        if (angieAppears.alpha === 1){
            nextButton.alpha = 1;
            //when index is initialied to 0, make the text appear and increase index
            if (index === 0){
                text.setText(content[0]);
                index++;
            }
        };
    }

    //callback function for nextButton
    function actionOnClick(){
        //go to the next progression when we have gone through the content
        if (index === content.length){
            console.log('1');
            game.state.start('dilemmaOne');
            return;
        } 
        //index trigger for when zoom and walkie talkie shoudl appear
        if (index === 11){
            text.setText(content[index]);
            zoom.alpha = 1;
            index++;
        } if (index ===5 || index>=7){
            console.log('3');
            text.setText(content[index]);
            walkie.alpha = 1;
            index++;
        }
        //otherwise...
        else {
            //if (typeof walkie !== "undefined") {walkie.destroy();}
            //hide the zoom and walkie-talkies
            zoom.alpha = 0;
            walkie.alpha = 0;

            //set the text to the current index
            text.setText(content[index]);
            console.log(content[index]);

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

    
    //var onTap = function(){
        //game.state.start('learn');
    //}


    return {
        load: load,       
        create: create,
        update: update,
        onTap: onTap
    };

}());