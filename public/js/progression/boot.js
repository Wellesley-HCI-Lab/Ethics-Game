/**
 * PROGRESSION OF STATES (updated 7/24)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js
 * State that boots up the game
 * @type {State}
 * @property {Function} preload Before the state loads
 * @property {Function} create On creation
 * @property {Function} update Main loop
 */

var bootState = {

    preload: function() { BootState.load(); },
    create: function() { BootState.create(); },
    update: function() { if(testing) BootState.updateLevel('load'); },

}

/**
 * Level on which the player should start
 * @type {number}
 */
var startLevelID = 0;

/**
 * Up arrow key on the keyboard
 * @memberOf module:BootState
 * @type {Key}
 */
var upKey;

/**
 * Down arrow key on the keyboard
 * @memberOf module:BootState
 * @type {Key}
 */
var downKey;

/**
 * Is there a key currently pressed? 
 *      (Used to only trigger changes at the start of a key being pressed)
 * @memberOf module:BootState
 * @type {boolean}
 */
var keyDown = false;

/**
 * Are we testing the game (and therefore getting additional info in the javascript console)?
 * @type {boolean}
 */
var testing = true;


var background;
var startButton;
var speechButton;
var textBubble;

var BootState = (function() {

    var load = function(){ 
        //game.load.image('background', 'images/background/background.png');
        game.load.image('button', 'images/background/button.png');
        game.load.image('porthole', 'images/background/portholeSub.png');
        game.load.image('underwaterbac', 'images/background/underwater.png');
        game.load.image('ang', 'images/background/ang.png');
        game.load.image('ball', 'images/background/bubble256.png');
        game.load.audio('bubAudio', 'images/background/cuteBubbling.mp3');
        game.load.image('title', 'images/background/title.png');
        game.load.atlasJSONHash('radio', 'images/radio/walkietalkie.png', 'images/radio/walkietalkie.json');

        game.load.image('pointer', 'images/generalPointer.psd');
    }
    
    var create = function(){

        // to switch between levels while testing
        // For changing the level
        if(testing) {
            upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

            game.input.keyboard.addKeyCapture([ Phaser.Keyboard.UP, Phaser.Keyboard.DOWN ]);
        }


        // // underwater sounds - 100% for fun
        // music = game.add.audio('bubAudio');
        // music.loop = true;
        // music.play();
        
        // Scales canvas based on screen size
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.add.plugin(PhaserInput.Plugin);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //the blue gradient background
        underwaterbac = game.add.tileSprite(game.world.centerX-180, -150, 400, 600, 'underwaterbac');
        
        //the anglerfishes
        ang = game.add.sprite(300,200,'ang');
        ang2 = game.add.sprite(250,300,'ang');
        ang3 = game.add.sprite(400,200,'ang');


        //the anglerfishes - their scale, not by absolute #
        ang.scale.setTo(0.1, 0.1);
        ang2.scale.setTo(0.2, 0.2);
        ang2.scale.setTo(0.3, 0.3);

        ang.alpha = 0;
        ang2.alpha = 0;
        ang3.alpha = 0;

        //controls their disappearing and appearing act by tweening
        game.add.tween(ang).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        game.add.tween(ang2).to( { alpha: 1 }, 4000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        game.add.tween(ang3).to( { alpha: 1 }, 6000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        ang3.inputEnabled = true;

        //for cute animation - if they click on the angie closest to the ship...bubbles appear!
        ang3.events.onInputDown.add(bubbleBurst);

        //porthole pic
        porthole = game.add.tileSprite(0, 0, 800, 600, 'porthole');
        //button pic
        button = game.add.button(game.world.centerX-120,400, 'button', callLoad, this, 2, 1, 0);
        //title-logo pic
        title = game.add.image(160, 90, 'title');
        // speech = game.add.image(100, 100, 'textBubble');
        // speech.scale.setTo(0.1, 0.1);

        

    //     /*---------- CONTROLS CHANGING TEXT THAT WILL BE OVERLAYED ON TEXT BUBBLE ----------*/
    //     // speechButton = game.add.button(20, 50, 'next', actionOnClick, this, 1, 0, 2);
    //     // speechButton.scale.setTo(0.1, 0.1);


    //     // input text into chunks as you wish
    //     var content = ["Hi, and welcome! ", "It’s so good to meet the final member of our deep sea crew! ", 
    //     " I’m Pam and this is my crew of bioengineers.",'We want to study the deep sea and its mysterious creatures!'];
    //     // first word shown is set to the first index
    //     var index = 0;

    //     console.log(' initial dialogue ' + content[index]);

    //     text = game.add.text(20,20, content[index]);
    //     tween = game.add.tween(text);


    //     function actionOnClick(){
    //         text.destroy(); // Destroy the old text before the new one shows
        
    //         console.log('index before ' + index);
    //         console.log('original dialogue ' + content[index]);
    //         //text = game.add.text(20,20, content[index]);
    //         //tween = game.add.tween(text);
            

            //New text appears 
            game.add.tween(tween).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            //take note of index of the new word
            var newIndex = index++ ;
            console.log('after ' + index);
            console.log(' new dialogue ' + content[index]);
            //index = (index + 1) % content.length

            // Show that new text on world
            text = game.add.text(20,20, content[index]);
            tween = game.add.tween(text);
            console.log('dialogue length ' + content.length);

            //after dialogue is complete -
            if (index == content.length){
                 text.destroy(); //text is destroyed
                 speechButton.pendingDestroy = true; // button for text is destroyed
                 return;
            }
        }
        ////////CONTROLS CHANGING TEXT THAT WILL BE OVERLAYED ON TEXT BUBBLE end///// 

    //         //New text appears 
    //         game.add.tween(tween).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    //         //take note of index of the new word
    //         var newIndex = index++ ;
    //         console.log('after ' + index);
    //         console.log(' new dialogue ' + content[index]);
    //         //index = (index + 1) % content.length

    //         // Show that new text on world
    //         text = game.add.text(20,20, content[index]);
    //         tween = game.add.tween(text);
    //         console.log('dialogue length ' + content.length);

    //         //after dialogue is complete -
    //         if (index == content.length){
    //              text.destroy(); //text is destroyed
    //              speechButton.pendingDestroy = true; // button for text is destroyed
    //              return;
    //         }
    //     }
    //     /*---------- END OF CONTROLS CHANGING TEXT THAT WILL BE OVERLAYED ON TEXT BUBBLE ----------*/

    }

    //function for bubbles
    var bubbleBurst = function(){
        var delay = 0;

        //creates 5 bubbles in a single burst
        for (var i = 0; i < 5; i++){

            bubbles = game.add.sprite(410 , 300, 'ball');
            
            //bubbles are sized differently
            bubbles.scale.set(game.rnd.realInRange(0.01, 0.2));
            //bubbles move at different speeds
            speed = game.rnd.between(4000, 6000);

            //bubbles float up until a certain y coordinate
            game.add.tween(bubbles).to({ y: 100 }, speed, Phaser.Easing.Sinusoidal.InOut, true, delay, 6000, false);

            delay += 200;
        }

    }

    //calls for next game state
    var callLoad = function(){
        game.state.start('load');
        console.log('move state to game');
        game.sound.stopAll();
    }

    /**
     * Continuously called
     * @memberOf module:BootState
     */
    var updateLevel = function(stateName) {
        if (downKey.isDown){
            game.state.start(stateName)
        }
        // // If a button was previously pressed...
        // if(keyDown) {
        //     // but it's no longer pressed, then update keyDown
        //     if (!upKey.isDown && !downKey.isDown) keyDown = false;
        // // If a button was not previously pressed...
        // } else {
        //     // ...but now the up key is pressed 
        //     if(upKey.isDown) {
        //         keyDown = true;
        //         startLevelID++;
        //         // HACK: 8 is hardcoded and should be changed if we add/remove levels!
        //         if(startLevelID > 8) startLevelID = 8;
        //         console.log("Level: " + startLevelID);
        //     // ...but now the down key is pressed 
        //     } else if(downKey.isDown) {
        //         keyDown = true;
        //         startLevelID--;
        //         if(startLevelID < 0) startLevelID = 0;
        //         console.log("Level: " + startLevelID);
        //     }
        // }
    }

    return {
        load: load,
        create: create,
        updateLevel: updateLevel
    };
}());
