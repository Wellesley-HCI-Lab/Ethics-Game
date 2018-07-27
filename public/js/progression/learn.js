/**
* PROGRESSION OF STATES (updated 7/24)
* boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js
* The Learn state, where the user gets to explore facts about Anglerfish
* @exports learnState
*/

var learnState = {
    create: function(){ LearnState.create();},
    update: function(){ if(testing) BootState.updateLevel('dilemmaOne');}
}

var LearnState = (function() {

    var create = function(){
        Anglerfish.create();
    }

    // var update = function(){
    //     game.input.onTap.add(onTap, this);
        
    // }



    return {       
        create: create
    };

}());