/**
 * State that loads game assets
 * @type {State}
 * @property {Function} preload Before the state loads
 * @property {Function} create On creation
 */
var loadState = {
	preload: function(){ LoadState.load(); },
    create: function() { game.state.start('intro'); }
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
        SubUnderwater.load();
    }

        GlowingAnglerfish.load();
        Scientist.load();
        Anglerfish.load();
    }
    
    return {
        load: load
    };
}());
