/**
 * PROGRESSION OF STATES (updated 7/18)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js -> crispeePlay.js
 * The findAnglerfishState, where the submarine sees the glow in the water
 * and discovers an anglerfish
 * @exports findAnglerfishState
 */

var findAnglerfishState = {
	// preload: function(){ FindAnglerfish.load(); },
    create: function(){ FindAnglerfishState.create(); },
    update: function(){ FindAnglerfishState.update();},
	// shutdown: function(){ FindAnglerfish.shutdown(); }
}

var FindAnglerfishState = (function() {

    var create = function(){
        SubUnderwater.create();
        GlowingAnglerfish.create()
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    }

    var update = function(){
        GlowingAnglerfish.update();
        if (angieAppears.alpha === 1){
            game.input.onTap.add(onTap, this);
        }
    }

    var onTap = function(){
        game.state.start('learn');

    }

    return {       
        create: create,
        update: update,
        onTap: onTap
    };

}());