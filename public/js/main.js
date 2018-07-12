/*
Creating a new game and adding states
*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { create: create });

// Main boot screen / splash screen
game.state.add('boot', bootState);
// Loads all assets (with a progress bar or something)
game.state.add('load', loadState);


/**
 * Function that runs right after the world is created
 */ 

function create() { 
	game.state.start('boot'); 
}