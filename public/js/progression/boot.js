/**
 * PROGRESSION OF STATES (updated 9/21)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js -> socialBiosensor.js -> sbGame.js
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
        game.load.image('button', 'images/background/playButton.png');

        //images for buttons to jump to different storylines
        game.load.image('button1', 'images/background/button1.png');
        game.load.image('button2', 'images/background/button2.png');
        game.load.image('button3', 'images/background/button3.png');

        game.load.image('porthole', 'images/background/portholeSub.png');
        game.load.image('underwaterbac', 'images/background/underwater.png');
        game.load.image('ang', 'images/background/ang.png');
        game.load.image('ball', 'images/background/bubble256.png');
        game.load.audio('bubAudio', 'images/background/cuteBubbling.mp3');
        game.load.image('title', 'images/background/title.png');
        game.load.atlasJSONHash('radio', 'images/radio/walkietalkie.png', 'images/radio/walkietalkie.json');
        game.load.atlasJSONHash('swim','images/anglerfish/swim.png','images/anglerfish/swim.json');
        game.load.image('splashPage', 'images/background/splashPage.png');
        game.load.spritesheet('playButton', 'images/background/playButtonSprite.png', 758, 934);
        game.load.image('rename', 'images/text/renamePage01.png');

        //loading test audio
        game.load.audio('01','audio/01.wav');
        game.load.audio('02','audio/02.wav');
        game.load.audio('03','audio/03.wav');
        game.load.audio('04','audio/04.wav');

        //sound image files
        game.load.image('soundOff','images/background/soundoff.png');
        game.load.image('soundOn','images/background/soundon.png');

        // For crispeePlay state
        game.load.image('angieWhite', 'images/anglerfish/angieWhite.png');
        game.load.image('angieYellow', 'images/anglerfish/angieYellow.png');
        game.load.image('angieCyan', 'images/anglerfish/angieCyan.png');
        game.load.image('noButton', 'images/text/noButton.png');
        game.load.image('yesButton', 'images/text/yesButton.png');

        //loading objects
        Submarine.load();
        SubUnderwater.load();
        GlowingAnglerfish.load();
        Scientist.load();
        Anglerfish.load();
        BlocksToCrispee.load();
        Text.load();
        Text.load('speechBubble', 'images/text/bubbleNew.png');
        game.load.image('pointer', 'images/text/pointer.png');
        game.load.image('speechLong', 'images/text/long.png');
    }
    
    var create = function(){
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
        // underwaterbac = game.add.tileSprite(game.world.centerX-180, -150, 400, 600, 'underwaterbac');
        background = addSprite(0, 0, false, 'splashPage', game.width, game.height);
        
        start = game.add.button(190, 335, 'playButton', callLoad, this, 1, 0, 1);
        start.scale.setTo(0.238, 0.238);
        
        //buttons to skip to different storylines
        storyOneBttn = game.add.button(0, 0, 'button1', startStoryOne, this, 1, 0, 1);
        storyOneBttn.scale.setTo(0.5, 0.5);
        
        storyTwoBttn = game.add.button(0, 60, 'button2', startStoryTwo, this, 1, 0, 1);
        storyTwoBttn.scale.setTo(0.5, 0.5);
        
        storyThreeBttn = game.add.button(0, 120, 'button3', startStoryThree, this, 1, 0, 1);
        storyThreeBttn.scale.setTo(0.5, 0.5);

        }

        //calls for next game state
        var callLoad = function(){
            game.state.start('intro');
            console.log('move state to game');
            game.sound.stopAll();
        }

        //callback for first storyline
        var startStoryOne = function(){
            game.state.start('intro');
            console.log('move to storyline 1');
        }

        //callback for second storyline
        var startStoryTwo = function(){
            game.state.start('socialBiosensor');
            console.log('move to storyline 2');
        }

        //callback for third storyline
        var startStoryThree = function(){
            game.state.start('crispeePlay');
            console.log('move to storyline 3, it doesn\'t exist right now');
        }
    
        /**
         * Continuously called
         * @memberOf module:BootState
         */
        var updateLevel = function(stateName) {
            if (downKey.isDown){
                game.state.start(stateName)
            }
        }
    
        return {
            load: load,
            create: create,
            updateLevel: updateLevel
        };
}());

        //the anglerfishes
        // ang = game.add.sprite(300,200,'ang');
        // ang2 = game.add.sprite(250,300,'ang');
        // ang3 = game.add.sprite(400,200,'ang');


        //the anglerfishes - their scale, not by absolute #
        // ang.scale.setTo(0.1, 0.1);
        // ang2.scale.setTo(0.2, 0.2);
        // ang2.scale.setTo(0.3, 0.3);

        // ang.alpha = 0;
        // ang2.alpha = 0;
        // ang3.alpha = 0;

        // //controls their disappearing and appearing act by tweening
        // game.add.tween(ang).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        // game.add.tween(ang2).to( { alpha: 1 }, 4000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        // game.add.tween(ang3).to( { alpha: 1 }, 6000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        // ang3.inputEnabled = true;

        //for cute animation - if they click on the angie closest to the ship...bubbles appear!
        // ang3.events.onInputDown.add(bubbleBurst);

        // //porthole pic
        // porthole = game.add.tileSprite(0, 0, 800, 600, 'porthole');
        // //button pic
        // button = game.add.button(game.world.centerX-120,400, 'button', callLoad, this, 2, 1, 0);
        // //title-logo pic
        // title = game.add.image(160, 90, 'title');
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
            

            // //New text appears 
            // game.add.tween(tween).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            // //take note of index of the new word
            // var newIndex = index++ ;
            // console.log('after ' + index);
            // console.log(' new dialogue ' + content[index]);
            // //index = (index + 1) % content.length

            // // Show that new text on world
            // text = game.add.text(20,20, content[index]);
            // tween = game.add.tween(text);
            // console.log('dialogue length ' + content.length);

            // //after dialogue is complete -
            // if (index == content.length){
            //      text.destroy(); //text is destroyed
            //      speechButton.pendingDestroy = true; // button for text is destroyed
            //      return;
            // }
        
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



    // //function for bubbles
    // var bubbleBurst = function(){
    //     var delay = 0;

    //     //creates 5 bubbles in a single burst
    //     for (var i = 0; i < 5; i++){

    //         bubbles = game.add.sprite(410 , 300, 'ball');
            
    //         //bubbles are sized differently
    //         bubbles.scale.set(game.rnd.realInRange(0.01, 0.2));
    //         //bubbles move at different speeds
    //         speed = game.rnd.between(4000, 6000);

    //         //bubbles float up until a certain y coordinate
    //         game.add.tween(bubbles).to({ y: 100 }, speed, Phaser.Easing.Sinusoidal.InOut, true, delay, 6000, false);

    //         delay += 200;
    //     }

    // }


