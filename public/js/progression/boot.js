/**
 * State that boots up the game
 * @type {State}
 * @property {Function} preload Before the state loads
 * @property {Function} create On creation
 * @property {Function} update Main loop
 */

var bootState = {

    preload: function() { BootState.load(); },
    create: function() { BootState.create(); },
}

/**
 * Level on which the player should start
 * @type {number}
 */
var startLevelID = 0;

var background;
var startButton;

var BootState = (function() {

    var load = function(){ 
        game.load.image('button', 'images/background/button.png');
        game.load.image('porthole', 'images/background/portholeSub.png');
        game.load.image('underwaterbac', 'images/background/underwater.png');
        game.load.image('ang', 'images/background/ang.png');
        game.load.image('ball', 'images/background/bubble256.png');
        game.load.audio('bubAudio', 'images/background/cuteBubbling.mp3');
        game.load.image('title', 'images/background/title.png');
        game.load.atlasJSONHash('radio', 'images/radio/walkietalkie.png', 'images/radio/walkietalkie.json');
    }
    
    var create = function(){


        //underwater sounds - 100% for fun
        music = game.add.audio('bubAudio');
        music.loop = true;
        music.play();
        

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

        walkie = game.add.sprite(200,200,'radio');
        walkie.scale.setTo(1,1);
        walkie.animations.add('walk');
        walkie.animations.play('walk', 50, true);

      


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

    



    return {
        load: load,
        create: create
    };
}());
