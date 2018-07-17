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
        game.load.image('background', 'images/background/background.png');
        game.load.image('button', 'images/background/button.png');
        game.load.image('porthole', 'images/background/portholeSub.png');
        game.load.image('underwaterbac', 'images/background/underwater.png');
        game.load.image('ang', 'images/background/ang.png');
        game.load.image('ball', 'images/background/bubble256.png');
    }
    
    var create = function(){
    // Scales canvas based on screen size
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.add.plugin(PhaserInput.Plugin);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //background = game.add.tileSprite(0, 0, 800, 600, 'background');
        
        underwaterbac = game.add.tileSprite(game.world.centerX-180, -150, 400, 600, 'underwaterbac');
        
        
        ang = game.add.sprite(300,200,'ang');
        ang2 = game.add.sprite(250,300,'ang');
        ang3 = game.add.sprite(400,200,'ang');

        ang.scale.setTo(0.1, 0.1);
        ang2.scale.setTo(0.2, 0.2);
        ang2.scale.setTo(0.3, 0.3);

        ang.alpha = 0;
        ang2.alpha = 0;
        ang3.alpha = 0;

        game.add.tween(ang).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        game.add.tween(ang2).to( { alpha: 1 }, 4000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        game.add.tween(ang3).to( { alpha: 1 }, 6000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        ang3.inputEnabled = true;
        ang3.events.onInputDown.add(bubbleBurst);

        console.log(game.world.centerY);
        
        porthole = game.add.tileSprite(0, 0, 800, 600, 'porthole');

       


        button = game.add.button(game.world.centerX-120,400, 'button', callLoad, this, 2, 1, 0);


    }

     
    var bubbleBurst = function(){
        var delay = 0;

        for (var i = 0; i < 5; i++){

        bubbles = game.add.sprite(410 , 300, 'ball');
        //bubbles.anchor.setTo(0.00001, 0.00001);
        bubbles.scale.set(game.rnd.realInRange(0.01, 0.2));
        speed = game.rnd.between(4000, 6000);
        game.add.tween(bubbles).to({ y: 100 }, speed, Phaser.Easing.Sinusoidal.InOut, true, delay, 6000, false);

        delay += 200;
        console.log('fuck me');


        }

    }


    var callLoad = function(){
        game.state.start('load');
        console.log('move state to game');
    }

    



    return {
        load: load,
        create: create
    };
}());
