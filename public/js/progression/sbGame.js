/**
* PROGRESSION OF STATES (updated 7/31)
* boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js -> socialBiosensor.js 
* -> sbGame.js
* The Learn state, where the user gets to explore facts about Anglerfish
* @exports sbGameState
*/

var sbGameState = {
    preload: function() { SBGameState.preload();},
    create: function() { SBGameState.create();},
    update: function() {SBGameState.update();}
}

var SBGameState = (function() {

    var preload = function(){
        game.load.image('hiddenAngler1', 'images/anglerfish/hiddenAngler1.png');
        game.load.image('hiddenAngler2', 'images/anglerfish/hiddenAngler2.png');
		game.load.image('hiddenAngler3', 'images/anglerfish/hiddenAngler3.png');
        game.load.image('hiddenAngler4', 'images/anglerfish/hiddenAngler4.png');
        game.load.image('angieBlackCrop', 'images/anglerfish/angieBlackCrop.png');
        game.load.image('angieMagentaCrop', 'images/anglerfish/angieMagentaCrop.png');
        game.load.image('findInstructions', 'images/text/findInstructions.png');


    }

    var create = function(){
        SubUnderwater.create();
        instructions = addScaledSprite(0, 0, false, 'findInstructions', 0.2);

        hiddenAnglerfish = game.add.physicsGroup();
        hiddenOne = addScaledSprite(100, 100, false, 'hiddenAngler1', 0.1);
        hiddenTwo = addScaledSprite(400, 250, false, 'hiddenAngler2', 0.1);
        hiddenThree = addScaledSprite(600, 100, false, 'hiddenAngler3', 0.1);
        hiddenFour = addScaledSprite(600, 300, false, 'hiddenAngler4', 0.1);
        hiddenAnglerfish.add(hiddenOne); hiddenAnglerfish.add(hiddenTwo); 
        hiddenAnglerfish.add(hiddenThree); hiddenAnglerfish.add(hiddenFour);
        hiddenAnglerfish.setAll('alpha', 0);

        transFish = game.add.physicsGroup();
        transOne = addScaledSprite(100, 100, false, 'hiddenAngler1', 0.3);
        transTwo = addScaledSprite(400, 250, false, 'hiddenAngler2', 0.3);
        transThree = addScaledSprite(600, 100, false, 'hiddenAngler3', 0.3);
        transFour = addScaledSprite(600, 300, false, 'hiddenAngler4', 0.3);
        transFish.add(transOne); transFish.add(transTwo);
        transFish.add(transThree);transFish.add(transFour);
        transFish.setAll('alpha', 0);

        anglerfish = addScaledSprite(350, 100, false, 'angieBlackCrop', 0.04);
        game.physics.enable(anglerfish, Phaser.Physics.ARCADE);
        anglerfish.inputEnabled = true;
        anglerfish.input.enableDrag();

        // bubble = Text.create(40, -60, 'bubble', 0.1);
        // next = Text.createNextButton(280, 85, 0.2, function(){
        //     bubble.destroy();
        //     text.destroy();
        //     next.destroy();
        // }, 1);
    
        // text = game.add.text(65, 30, "Move Angie around and see \nif we can use her biosensor \nto detect other anglerfish!", 
        //     {font: "22px Arial",
        //     fill: "#000000",
        //     align: "left"});
        // text.alpha = 0;
        // game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
    }

    var update = function(){
        game.physics.arcade.overlap(anglerfish, hiddenAnglerfish, nearHandler, null, this);
        game.physics.arcade.overlap(anglerfish, transFish, transHandler, null, this);
        if (!game.physics.arcade.overlap(anglerfish, hiddenAnglerfish) && 
            !game.physics.arcade.overlap(anglerfish, transFish)){
            anglerfish.loadTexture('angieBlackCrop');
        }

    }

    function nearHandler(fish, hiddenFish){
        console.log('boom');
        hiddenFish.alpha = 1;
    }  
    
    function transHandler(fish, transFish){
        console.log('Overlap with transparent sprite');
        fish.loadTexture('angieMagentaCrop');
    }

return {  
        preload: preload,     
        create: create,
        update: update
    };

}());