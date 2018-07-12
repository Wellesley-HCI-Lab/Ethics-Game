/**
 * State that boots up the game
 * @type {State}
 * @property {Function} preload Before the state loads
 * @property {Function} create On creation
 * @property {Function} update Main loop
 */

var bootState = {
    preload: function(){ BootState.load(); },
    create: function() { BootState.create(); },
    update: function() { if(testing) BootState.updateLevel(); },
}

/**
 * Level on which the player should start
 * @type {number}
 */
var startLevelID = 0;

var background;
var startButton;

var create = function(){
// Scales canvas based on screen size
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

	background = game.add.tileSprite(0, 0, 800, 600, 'background');

	button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);

	button.onInputOver.add(over, this);
    button.onInputOut.add(out, this);
    button.onInputUp.add(up, this);

}

function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function actionOnClick () {

    background.visible =! background.visible;

}

game.add.plugin(PhaserInput.Plugin);

game.physics.startSystem(Phaser.Physics.ARCADE);