/**
 * PROGRESSION OF STATES (updated 9/21)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js ->  dilemmaOne.js -> crispeePlay.js -> socialBiosensor.js -> sbGame.js
 * consequenceOne state for the consequence of user's choice in dilemmaOne
 *
 */

var consequenceOneState = {
    preload: function() { ConsequenceOneState.preload();},
    create: function() { ConsequenceOneState.create();}
}

var ConsequenceOneState = (function() {

    var preload = function() {
        game.load.image('subSurrounded', 'images/anglerfish/subSurrounded');
    }

    var create = function(){
        subSurrounded = addSprite(0, 0, 'subSurrounded', false, game.height, game.width);
    }

    return {  
        preload: preload,     
        create: create
    };



}());