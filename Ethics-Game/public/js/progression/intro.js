/**
 * The Intro state, where Pam and the submarine crew are 
 * introduced, and their mission is explained
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