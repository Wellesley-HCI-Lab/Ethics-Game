/*
Creating a new game and adding states
*/

var game = new Phaser.Game(2048, 1536, Phaser.AUTO, '', { create: create });

// Main boot screen / splash screen
game.state.add('boot', bootState);
// Loads all assets (with a progress bar or something)
game.state.add('load', loadState);

function create() { 
	game.state.start('boot'); 
}