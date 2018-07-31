/**
 * PROGRESSION OF STATES (updated 7/24)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js
 * State that loads game assets
 * @type {State}
 * @property {Function} preload Before the state loads
 * @property {Function} create On creation
 */
var loadState = {
	preload: function(){ LoadState.load(); },
    create: function() { game.state.start('intro'); },
    update: function() { if(testing) BootState.updateLevel('intro'); },

}

/**
 * Load state functions
 * @exports LoadState
 */
var LoadState = (function() {
    /**
     * Loads all main game assets
     * @memberOf module:LoadState
     */
    var load = function() {
        Submarine.load();
        SubUnderwater.load();
        GlowingAnglerfish.load();
        Scientist.load();
        Anglerfish.load();
        BlocksToCrispee.load();
    }

    // var update = function() {
    //     if(testing) {
    //         BootState.updateLevel('intro')
    //     }
    // }
    
    return {
        load: load,
        // update: update
    };
}());
