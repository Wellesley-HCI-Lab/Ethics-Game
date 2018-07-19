/**
/** 
 * PROGRESSION OF STATES (updated 7/18)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js -> crispeePlay.js
 * The Intro state, where Pam and the submarine crew are 
 * introduced, and their mission is explained
 * The top of submarine is open
 * Introduce tools such as the radio and the map
 * Scientist disappears
 * Lid closes
 * @exports introState
 */

var introState = {
	// preload: function(){ FindAnglerfish.load(); },
    create: function(){ Intro.create();},
    update: function(){ Intro.update();}
	// shutdown: function(){ FindAnglerfish.destroy(); }
}


var Intro = (function() {

    var create = function(){
        Scientist.create();
    }

    var update = function(){
        game.input.onTap.add(onTap, this);
    }

    var onTap = function(){
        game.state.start('findAnglerfish');
    }

    return {       
        create: create,
        update: update,
        onTap: onTap
    };

}());