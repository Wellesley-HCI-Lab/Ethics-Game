/**
 * PROGRESSION OF STATES (updated 7/24)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js
 * The crispeePlay state, where the user gets to input blocks into CRISPEE
 * in order to change the color of Angie's lure.
 * @exports findAnglerfishState
 */

var crispeePlayState = {
    load: function(){ CrispeePlay.load();},
    create: function(){CrispeePlay.create(); },
    update: function(){if(testing) BootState.updateLevel('socialBiosensor');}
    
}

var CrispeePlay = (function() {

    var load = function(){
        BlocksToCrispee.load();
        Text.load();
    }

    var create = function(){
        blocks = BlocksToCrispee.create(1);
        bubble = Text.create(10, -60, 'bubble', 0.1);

    }

    return {      
        load: load, 
        create: create
    };

}());