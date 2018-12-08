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

        //bioenginerrings color machine buttons
        game.load.image('colorMachine','images/bioengMachine/crispeeNoButtons.png');
        game.load.image('redButton','images/bioengMachine/redButtonTxt.png');
        game.load.image('yellowButton','images/bioengMachine/yellowButtonTxt.png');
        game.load.image('blueButton','images/bioengMachine/blueButtonTxt.png');
        game.load.image('whiteButton','images/bioengMachine/whiteButtonTxt.png');
        game.load.image('cyanButton','images/bioengMachine/cyanButtonTxt.png');
        game.load.image('magentaButton','images/bioengMachine/magentaButtonTxt.png');
        game.load.image('greenButton','images/bioengMachine/greenButtonTxt.png');

        //images for different angie colors
        game.load.image('angiemagenta', 'images/anglerfish/angieMagenta.png');
        game.load.image('angiewhite', 'images/anglerfish/angieWhite.png');
        game.load.image('angieyellow', 'images/anglerfish/angieYellow.png');
        game.load.image('angiecyan', 'images/anglerfish/angieCyan.png');
        game.load.image('angiered', 'images/anglerfish/angieRed.png');
        game.load.image('angieblue', 'images/anglerfish/angieBlue.png');
        game.load.image('angiegreen', 'images/anglerfish/angieGreen.png');

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

        //sound image files
        game.load.image('soundOff','images/background/soundoff.png');
        game.load.image('soundOn','images/background/soundon.png');

        //stopping points question image files
        game.load.image('stop1','images/stops/stop1.png');
        game.load.image('stop2','images/stops/stop2.jpg');
        game.load.image('stop3','images/stops/stop3.jpg');
        game.load.image('stop4','images/stops/stop4.jpg');

        // For crispeePlay state
        game.load.image('noButton','images/text/noButton.png');
        game.load.image('yesButton','images/text/yesButton.png');

        //yes choice images
        game.load.spritesheet('toxinsImg','images/toxins/toxinsCutScene.png',864,625,6);

        //no choice images
        game.load.image('startButton','images/toxins/start.png');
        game.load.image('pollutionCloud','images/toxins/pollutionCloud.png');
        game.load.image('angieSick','images/anglerfish/angieSick.png');
        game.load.image('damagedSub','images/submarine/damagedSub.png');

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
