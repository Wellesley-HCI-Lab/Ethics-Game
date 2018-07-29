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
	// shutdown: function(){ FindAnglerfish.shutdown(); }
}


var introText;
var content;
var index;
var newIndex;
var signalCrossed;
var speechBubble;

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

        

        // textBubble = game.add.sprite(-200, 170, 'textBubble');
        // textBubble.scale.setTo(1.3, 1);

        // introText = game.add.text(70,400, 'I wonder what that could be?\n If you click on it maybe we can find out');
        signalCrossedcounter = 0; 

        walkie = game.add.sprite(400,200,'radio');
        walkie.scale.setTo(1,1);
        walkie.animations.add('walk');
        walkie.animations.play('walk', 5, true);
        walkie.alpha =0;

        
    }


    var update = function(){
        GlowingAnglerfish.update();
        nextButton = Text.createNextButton(640, 522, 0.2, actionOnClick);
        function actionOnClick(){
            
        }
        if (angieAppears.alpha == 1){
            signalCrossedcounter++;
            if (signalCrossedcounter == 10){
                console.log('pretty please work lol');
                showText();

            }
        }
        { if(testing) BootState.updateLevel('learn'); }

    }

    
    
    var showText = function(){
        introText.destroy();
        
        speechButton = game.add.button(500, 500, 'next', actionOnClick, this, 1, 0, 2);
        speechButton.scale.setTo(0.1, 0.1);

        //////DIALOGUE/////

        content = ["My goodness!", "I'm not sure what it is?\n Do you?", 
        "Maybe the radio can tell us more?",
        "Radio, My crew of explorers have found\n an interesting animal!", "Can you help us a bit?", 
        "Of course! \n just describe what you see.",
        "I'm sure it's a fish! It has a very big jaw,\n with a bulb floating right above it!", 
        "Wow! This is exciting news!","You've encountered a live Anglerfish",
        "From what scientists know about them,\n there are a few important things to know\n about Anglerfish",
        "Anglerfish are deep sea creatures\n that live in solitude.\n This means they prefer to be alone.",
        "That bulb hanging from their head is called\n a lure.",
         "The lure helps them to attract curious prey\n into their large mouths,\nand sometimes, to attract friends." 
         ];
        index = 0;

 
        text = game.add.text(70,400, content[index]);
        tween = game.add.tween(text);

    }


    function actionOnClick(){
        text.destroy(); 
        
        game.add.tween(tween).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
         
        newIndex = index++ ;
         
        text = game.add.text(70,400, content[index]);
        tween = game.add.tween(text);

        //MAKE RADIO ANIMATION OCCUR WHEN RADIO IS TALKING   
        if (content[index] =="Of course! \n just describe what you see."|| 
            content[index] =="Wow! This is exciting news!"||
            content[index] =="You've encountered a live Anglerfish"||
            content[index] =="From what scientists know about them,\n there are a few important things to know\n about Anglerfish"||
            content[index] =="Anglerfish are deep sea creatures\n that live in solitude.\n This means they prefer to be alone."||
            content[index] =="That bulb hanging from their head is called\n a lure."||
            content[index] =="The lure helps them to attract curious prey\n into their large mouths,\nand sometimes, to attract friends."
            ){
            console.log('content ! ' + content[index]);
            walkie.alpha = 1;
        } else {walkie.alpha =0;}
        
        ///////////////////ACTIONS REQUIRED//////////////

        //MAKE SCIENTIST APPEAR WHEN SHE'S TALKING

        //MAKE ZOOM IN OF ANGIE - DISCUSS WITH GROUP/ MAKE IT MORE STREAMLINE INSTEAD OF HAVING IT DRAWN

        if (index == content.length){ // PROBS CHANGE TO newIndex instead of index b/c undefined at end
            text.destroy(); //text is destroyed
            speechButton.pendingDestroy = true; // button for text is destroyed
            textBubble.destroy();
            walkie.destroy();

            //JUST FOR NOW TO INTEGRATE ONTAP - CHANGE BUTTON WORDS TO SAY 'BRING ANGIE ONBOARD'
            speechButton = game.add.button(500, 500, 'next', onTap, this, 1, 0, 2);
            speechButton.scale.setTo(0.1, 0.1);
            return;
        }
    } //END OF ONCLICK

    

    var onTap = function(){
        game.state.start('learn');
    }


    return {       
        create: create,
        update: update,
        onTap: onTap
    };

}());