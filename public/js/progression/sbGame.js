/**
* PROGRESSION OF STATES (updated 7/31)
* boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js -> socialBiosensor.js 
* -> sbGame.js
* The Learn state, where the user gets to explore facts about Anglerfish
* @exports sbGameState
*/

var sbGameState = {
    preload: function() { SBGameState.preload();},
    create: function() { SBGameState.create();}
}

var SBGameState = (function() {

    var preload = function(){
        game.load.image('hiddenAngler1', 'images/anglerfish/hiddenAngler1.png');
        game.load.image('hiddenAngler2', 'images/anglerfish/hiddenAngler2.png');
		game.load.image('hiddenAngler3', 'images/anglerfish/hiddenAngler3.png');
		game.load.image('hiddenAngler4', 'images/anglerfish/hiddenAngler4.png');

    }

    var create = function(){
        SubUnderwater.create();
        hiddenOne = addScaledSprite(100, 100, false, 'hiddenAngler1', 0.12);
        hiddenTwo = addScaledSprite(400, 250, false, 'hiddenAngler2', 0.12);
        hiddenThree = addScaledSprite(600, 100, false, 'hiddenAngler3', 0.12);
        hiddenFour = addScaledSprite(600, 300, false, 'hiddenAngler4', 0.12);


    }


    return {  
        preload: preload,     
        create: create
    };

}());