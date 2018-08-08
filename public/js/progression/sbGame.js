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
    update: function() {SBGameState.update();},
    onKeyDown: function() {SBGameState.onKeyDown();}
}

var num = 0;


var SBGameState = (function() {

    var preload = function(){
        game.load.image('hiddenAngler1', 'images/anglerfish/hiddenAngler1.png');
        game.load.image('hiddenAngler2', 'images/anglerfish/hiddenAngler2.png');
		game.load.image('hiddenAngler3', 'images/anglerfish/hiddenAngler3.png');
        game.load.image('hiddenAngler4', 'images/anglerfish/hiddenAngler4.png');
        game.load.image('angieYellowSmall', 'images/anglerfish/angieYellowSmall.png');
        game.load.image('angieMagentaSmall', 'images/anglerfish/angieMagentaSmall.png');
        game.load.image('findInstructions', 'images/text/findInstructions.png');
        game.load.image('dragWord', 'images/text/dragWord.png');
        game.load.image('draggingFinger', 'images/text/draggingFinger.png');

    }

    var create = function(){
        SubUnderwater.create();
        anglerfish = addScaledSprite(350, 100, false, 'angieYellowSmall', 0.12);
        game.physics.enable(anglerfish, Phaser.Physics.ARCADE);
        anglerfish.inputEnabled = true;
        anglerfish.input.enableDrag();

        instructions = addScaledSprite(0, 0, false, 'findInstructions', 0.2);
        dragWord = addScaledSprite(380, 200, false, 'dragWord', 0.15);
        draggingFinger = addScaledSprite(400, 170, false, 'draggingFinger', 0.1);
        anglerfish.events.onInputDown.add(function(){
            instructions.destroy();
            dragWord.destroy();
            draggingFinger.destroy();
        }
        , this);




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
    }

    var update = function(){
        game.physics.arcade.overlap(anglerfish, hiddenAnglerfish, overlapHandler, null, this);
        game.physics.arcade.overlap(anglerfish, transFish, transHandler, null, this);
        if (!game.physics.arcade.overlap(anglerfish, hiddenAnglerfish) && 
            !game.physics.arcade.overlap(anglerfish, transFish)){
            anglerfish.loadTexture('angieYellowSmall');
        }



        if (hiddenAnglerfish.checkAll('alpha', 1)){
            num++; // VERY HACKY
            nextState();
        }
    }

    function nextState(){
        if (num === 1){
            bubble = Text.create(420, 350, 'bubble', 0.12);
            next = Text.createNextButton(650, 540, 0.2, function(){
                console.log(game.state.start('consequenceOne'));
            }, 1);
            text = game.add.text(480, 460, "I can't believe it! I've never \nseen so many anglerfishes \nin one place!", 
                {font: "22px Arial",
                fill: "#000000",
                align: "left"});
            text.alpha = 0;
            game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
        }
    }

    function overlapHandler(fish, hiddenFish){
        // console.log('boom');
        hiddenFish.alpha = 1;
    }  
    
    function transHandler(fish, transFish){
        // console.log('Overlap with transparent sprite');
        fish.loadTexture('angieMagentaSmall');
    }

    var onKeyDown = function() {
        if(testing) BootState.updateLevel('consequenceOne')
    }

return {  
        preload: preload,     
        create: create,
        update: update,
        onKeyDown: onKeyDown
    };

}());