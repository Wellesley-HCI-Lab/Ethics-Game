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
        if (rightKey.isDown){
            game.state.start('crispeePlay');
        }

    }

    // var onTap = function(){
    // }

    // var shutdown = function(){
    //     game.input.onTap.add(onTap, this);

    // }





    return {       
        create: create,
        update: update,
        // shutdown: shutdown
    };

}());