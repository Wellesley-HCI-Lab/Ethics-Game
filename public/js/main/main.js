/*
Creating a new game and adding states
*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { create: create });

// Main boot screen / splash screen
game.state.add('boot', bootState);
// Loads all assets 
game.state.add('load', loadState);
// Loads state introducing Pam the scientist
game.state.add('intro', introState);
// Loads state with the findAnglerfish minigame
game.state.add('findAnglerfish', findAnglerfishState);
// Loads state where user gets to learn more about Anglerfish
game.state.add('learn', learnState);
// Loads state where user is presented with first ethical dilemma
game.state.add('dilemmaOne', learnState);
// Loads state with the CRISPEE interaction
game.state.add('crispeePlay', crispeePlayState)


function create() { 
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.state.start('boot'); 
}