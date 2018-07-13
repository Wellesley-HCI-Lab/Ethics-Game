/*
Creating a new game and adding states
*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { create: create });

// Main boot screen / splash screen
game.state.add('boot', bootState);
// Loads all assets 
game.state.add('load', loadState);
// Loads state with the main game loop
// game.state.add('game', mainGameState);


function create() { 
	game.state.start('boot'); 
}