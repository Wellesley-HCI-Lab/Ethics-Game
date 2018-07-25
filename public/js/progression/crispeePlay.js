/**
 * PROGRESSION OF STATES (updated 7/24)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js
 * The crispeePlay state, where the user gets to input blocks into CRISPEE
 * in order to change the color of Angie's lure.
 * @exports findAnglerfishState
 */

var crispeePlayState = {
    load: function(){ CrispeePlay.load();},
    create: function(){ CrispeePlay.create(); },
    // update: function(){ CrispeePlay.update()}
}

var CrispeePlay = (function() {

    var load = function(){
        Crispee.load();
    }

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