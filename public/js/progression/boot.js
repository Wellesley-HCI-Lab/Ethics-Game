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
        game.load.image('porthole', 'images/background/portholeSub.png')
    }
    
    var create = function(){
    // Scales canvas based on screen size
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.add.plugin(PhaserInput.Plugin);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        background = game.add.tileSprite(0, 0, 800, 600, 'background');
        porthole = game.add.sprite(0, 0, 400, 300, 'porthole');
        button = game.add.button(game.world.centerX-95,400, 'button', callLoad, this, 2, 1, 0);
    }
    
    var callLoad = function(){
        game.state.start('load');
        console.log('move state please');
    }

    return {
        load: load,
        create: create
    };
}());
