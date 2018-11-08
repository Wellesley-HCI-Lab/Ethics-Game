/**
 * PROGRESSION OF STATES (updated 9/21)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js ->  dilemmaOne.js -> crispeePlay.js -> socialBiosensor.js -> sbGame.js
 * State that boots up the game
 * @type {State}
 * @property {Function} preload Before the state loads
 * @property {Function} create On creation
 * @property {Function} update Main loop
 */

var bootState = {
    preload: function() { BootState.load(); },
    create: function() { BootState.create(); },
    update: function() { BootState.updateLevel('','intro'); }
}

/**
 * Level on which the player should start
 * @type {number}
 */
var startLevelID = 0;

/**
 * Left arrow key on the keyboard
 * @memberOf module:BootState
 * @type {Key}
 */
 var leftKey;

 /**
 * Up arrow key on the keyboard
 * @memberOf module:BootState
 * @type {Key}
 */
 var rightKey;

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
//var mixButton;

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
        game.load.atlasJSONHash('radio', 'images/radio/walkietalkie.png', 'images/radio/walkietalkie.json');
        game.load.atlasJSONHash('swim','images/anglerfish/swim.png','images/anglerfish/swim.json');
        game.load.image('splashPage', 'images/background/splashPage.png');
        game.load.spritesheet('playButton', 'images/background/playButtonSprite.png', 758, 934);
        game.load.image('rename', 'images/text/renamePage01.png');

        //retrieve button for angie
        game.load.image('retrieveButton','images/background/retrieveButton.png');
        game.load.image('retrieveButtonZoom','images/background/retrieveButton_zoom.png');

        //firstConsequence images
        game.load.image('subFish', 'images/consequence/subFish.png');
        game.load.spritesheet('fishSpritesImg','images/consequence/fishDecrease.png',864,625,5);
        game.load.spritesheet('angieHunger','images/anglerfish/angieHunger.png',300,240,4);

        //adding spritesheets for the submarine cutscene
        game.load.spritesheet('subSpritesImg0','images/submarine/submarineCutscene0.png',864,625,6);
        game.load.spritesheet('subSpritesImg1','images/submarine/submarineCutscene1.png',864,625,6);
        game.load.spritesheet('subSpritesImg2','images/submarine/submarineCutscene2.png',864,625,2);

        //toxins images
        game.load.image('pollution', 'images/toxins/pollution.png');
        game.load.image('yesScreen', 'images/toxins/dilemmaScreen_yes.png');
        game.load.image('noScreen', 'images/toxins/dilemmaScreen_no.png');
        
        //loading test audio
        game.load.audio('01','audio/01.wav');
        game.load.audio('02','audio/02.wav');
        game.load.audio('03','audio/03.wav');
        game.load.audio('04','audio/04.wav');
        game.load.audio('bubAudio', 'images/background/cuteBubbling.mp3');

        //loading scenario one audio
        game.load.audio('dilemmajs0','audio/Storyline1/dilemmaOne.js1.mp3');
        game.load.audio('dilemmajs1','audio/Storyline1/dilemmaOne.js2.mp3');
        game.load.audio('dilemmajs2','audio/Storyline1/dilemmaOne.js3.mp3');
        game.load.audio('dilemmajs3','audio/Storyline1/dilemmaOne.js4.mp3');
        game.load.audio('dilemmajs4','audio/Storyline1/dilemmaOne.js5.mp3');
        game.load.audio('dilemmajs5','audio/Storyline1/dilemmaOne.js6.mp3');
        game.load.audio('dilemmajs6','audio/Storyline1/dilemmaTwo.js7.mp3');

        game.load.audio('findanglerfishjs0','audio/Storyline1/findAnglerfish.js1.mp3');
        game.load.audio('findanglerfishjs1','audio/Storyline1/findAnglerfish.js2.mp3');
        game.load.audio('findanglerfishjs2','audio/Storyline1/findAnglerfish.js3.mp3');
        game.load.audio('findanglerfishjs3','audio/Storyline1/findAnglerfish.js4.mp3');
        game.load.audio('findanglerfishjs4','audio/Storyline1/findAnglerfish.js5.mp3');
        game.load.audio('findanglerfishjs5','audio/Storyline1/findAnglerfish.js6.mp3');
        game.load.audio('findanglerfishjs6','audio/Storyline1/findAnglerfish.js7.mp3');
        game.load.audio('findanglerfishjs7','audio/Storyline1/findAnglerfish.js8.mp3');
        game.load.audio('findanglerfishjs8','audio/Storyline1/findAnglerfish.js9.mp3');

        game.load.audio('introjs0','audio/Storyline1/intro.js1.mp3');
        game.load.audio('introjs1','audio/Storyline1/intro.js2.mp3');
        game.load.audio('introjs2','audio/Storyline1/intro.js3.mp3');
        game.load.audio('introjs3','audio/Storyline1/intro.js4.mp3');
        game.load.audio('introjs4','audio/Storyline1/intro.js5.mp3');
        game.load.audio('introjs5','audio/Storyline1/intro.js6.mp3');
        game.load.audio('introjs6','audio/Storyline1/intro.js7.mp3');
        game.load.audio('introjs7','audio/Storyline1/intro.js8.mp3');

        //sound image files
        game.load.image('soundOff','images/background/soundoff.png');
        game.load.image('soundOn','images/background/soundon.png');

        // For crispeePlay state
        game.load.image('noButton','images/text/noButton.png');
        game.load.image('yesButton','images/text/yesButton.png');

        //yes choice images
        game.load.spritesheet('toxinsImg','images/toxins/toxinsCutScene.png',829,600,6);

        //no choice images
        game.load.image('lightLeft','images/toxins/lightLeft.png');
        game.load.image('lightMiddle','images/toxins/lightMiddle.png');
        game.load.image('lightRight','images/toxins/lightRight.png');
        game.load.image('startButton','images/toxins/start.png');
        game.load.image('pollutionCloud','images/toxins/pollutionCloud.png');
        game.load.image('angieSick','images/anglerfish/angieSick.png');

        //loading objects
        Submarine.load();
        SubUnderwater.load();
        GlowingAnglerfish.load();
        Scientist.load();
        Anglerfish.load();
        BlocksToCrispee.load();
        Text.load();
        Text.load('speechBubble','images/text/bubbleNew.png');
        game.load.image('pointer','images/text/pointer.png');
        game.load.image('speechLong','images/text/long.png');
    }
    
    var create = function(){
        // For changing the level
        if(testing) {
            leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT,Phaser.Keyboard.RIGHT]);
        }
        
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
            game.sound.stopAll();
        }

        //callback for first storyline
        var startStoryOne = function(){
            game.state.start('intro');
        }

        //callback for second storyline
        var startStoryTwo = function(){
            game.state.start('socialBiosensor');
        }

        //callback for third storyline
        var startStoryThree = function(){
            //game.state.start('toxins');
            game.state.start('toxins');
        }
        /**
         * Continuously called
         * @memberOf module:BootState
         */
        var updateLevel = function(backState,forwardState) {
            if (leftKey.isDown){
                game.state.start(backState);
            }
            if (rightKey.isDown){
                game.state.start(forwardState);
            }
        }
    
        return {
            load: load,
            create: create,
            updateLevel: updateLevel
        };
}());
