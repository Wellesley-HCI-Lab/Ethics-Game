/**
 * The main game state functions
 * @exports findAnglerfishState
 */

var findAnglerfishState = {
	// preload: function(){ FindAnglerfish.load(); },
	create: function(){ FindAnglerfish.create(); },
	// shutdown: function(){ FindAnglerfish.destroy(); }
}

var FindAnglerfish = (function() {

    var create = function(){
    
        SubUnderwater.create();

    }

    // var update = function(){

    // }

    // var destroy = function(){

    // }

    return {       
        create: create,
    };

}());