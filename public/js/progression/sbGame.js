/**
* PROGRESSION OF STATES (updated 7/31)
* boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js -> socialBiosensor.js 
* -> sbGame.js
* The Learn state, where the user gets to explore facts about Anglerfish
* @exports sbGameState
*/

var sbGameState = {
    create: function(){ SBGameState.create();},
}

var SBGameState = (function() {

    var create = function(){
        SubUnderwater.create();
    }


    return {       
        create: create
    };

}());