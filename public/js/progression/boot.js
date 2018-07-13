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
    }


    var create = function(){
    // Scales canvas based on screen size
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        game.add.plugin(PhaserInput.Plugin);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        addSprite(0, 0, false, 'background', game.width, game.height);
        button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
        button.onInputOver.add(over, this);
        button.onInputOut.add(out, this);
        button.onInputUp.add(up, this);

    }

    var up = function(){
        console.log('button up', arguments);
    }

    var over = function(){
        console.log('button over');
    }   

    var out = function() {
        console.log('button out');
    }

    var actionOnClick = function () {
        background.visible =! background.visible;
    }

    return {
        load: load,
        create: create
    };
}());
