/**
 * PROGRESSION OF STATES (updated 7/24)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js
 * State where user is presented with the first ethical dilemma
 * @exports dilemmaOne
 */

var DilemmaOneState = {
    load: function(){ DilemmaOneState.load();},
    create: function(){ DilemmaOneState.create(); },
    // update: function(){ CrispeePlay.update()}
}

var DilemmaOneState = (function() {

    var load = function(){

    }

    var create = function(){
    
    }

    return { 
        load: load,      
        create: create,
    };

}());