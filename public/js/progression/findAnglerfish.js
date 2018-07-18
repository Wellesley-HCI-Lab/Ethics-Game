/**
 * The findAnglerfishState, appears after Intro state
 * @exports findAnglerfishState
 */

var findAnglerfishState = {
	// preload: function(){ FindAnglerfish.load(); },
    create: function(){ FindAnglerfish.create(); },
    update: function(){ FindAnglerfish.update();},
	// shutdown: function(){ FindAnglerfish.shutdown(); }
}

var FindAnglerfish = (function() {

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
        game.state.start('crispeePlay');

    }

    return {       
        create: create,
        update: update,
        onTap: onTap
    };

}());