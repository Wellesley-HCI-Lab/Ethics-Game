/**
 * PROGRESSION OF STATES (updated 7/18)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js -> crispeePlay.js
 * The crispeePlay state, where the user gets to input blocks into CRISPEE
 * in order to change the color of Angie's lure.
 * @exports findAnglerfishState
 */

var crispeePlayState = {
    create: function(){ CrispeePlay.create(); },
    // update: function(){ CrispeePlay.update()}
}

var CrispeePlay = (function() {

    var create = function(){
    
        Crispee.create();

    }


    // var destroy = function(){

    // }

    return {       
        create: create,
        // update: update
    };

}());