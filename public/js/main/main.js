/*
Creating a new game and adding states
*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { create: create });

// Main boot screen / splash screen
game.state.add('boot', bootState);
// Loads state introducing Pam the scientist
game.state.add('intro', introState);
// Loads state with the findAnglerfish minigame
game.state.add('findAnglerfish', findAnglerfishState);
// Loads state where user is presented with first ethical dilemma
game.state.add('dilemmaOne', dilemmaOneState);
// Loads state with the CRISPEE interaction
game.state.add('crispeePlay', crispeePlayState);
// Loads state with the CRISPEE used to make a social biosensor
game.state.add('socialBiosensor', socialBiosensorState);
// Loads state with the state where user finds other anglerfish using the social biosensor
game.state.add('sbGame', sbGameState);
// Loads state with the conquences of storyline 2
game.state.add('consequence',consequenceState);
// Loads start of toxins storyline
game.state.add('toxins',toxinsState);

function create() { 
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.state.start('boot'); 
}