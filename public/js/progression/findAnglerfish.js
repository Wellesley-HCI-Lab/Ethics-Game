/**
 * The main game state functions
 * @exports findAnglerfishState
 */

var findAnglerfishState = {
	// preload: function(){ FindAnglerfish.load(); },
    create: function(){ FindAnglerfish.create(); },
    update: function(){ FindAnglerfish.update()}
	// shutdown: function(){ FindAnglerfish.destroy(); }
}

var FindAnglerfish = (function() {

    var create = function(){
    
        SubUnderwater.create();
        GlowingAnglerfish.create()

    }

    var update = function(){

        GlowingAnglerfish.update();

    }

    // var destroy = function(){

    // }

    return {       
        create: create,
        update: update
    };

}());