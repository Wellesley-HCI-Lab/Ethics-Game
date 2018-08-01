/**
 * PROGRESSION OF STATES (updated 7/24)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js
 * The crispeePlay state, where the user gets to input blocks into CRISPEE
 * in order to change the color of Angie's lure.
 * @exports findAnglerfishState
 */

var content;
var blocks;
var trialIndex = 0;

var crispeePlayState = {
    load: function(){ CrispeePlay.load();},
    create: function(){CrispeePlay.create(); },
    update: function(){if(testing) BootState.updateLevel('socialBiosensor');}
    
}

var CrispeePlay = (function() {

    var load = function(){
        game.load.image('tank', 'images/anglerfish/tank.png');
        BlocksToCrispee.load();
    }

    var create = function(){
        BlocksToCrispee.create();
        trials = [['greenBlockOut', 'greenBlockIn', ["This is our CRISPEE machine!", 
        "Each of these blocks represents \na gene.",
        "We can arrange genes in \ndifferent ways to bioengineer \nliving things!",
        "We can use it to bioengineer \nAngie",
        "Click on the green block to \nadd it to CRISPEE" ], 
        'angieWhite', 'white', 'redBlockIn', 'blueBlockIn'],
        ['greenBlockOut', 'greenBlockIn', [
        "Click on the green block to \nadd it to CRISPEE" ], 
        'angieCyan', 'cyan', 'redBlockOffIn', 'blueBlockIn'],
        ['greenBlockOut', 'greenBlockIn', [
        "Click on the green block to \nadd it to CRISPEE" ], 
        'angieYellow', 'yellow', 'redBlockIn', 'blueBlockOffIn']];
        intro(trials[trialIndex]);

        // content = ["This is our CRISPEE \nmachine!", 
        // "Each of these blocks represents a gene.",
        // "We can arrange genes\n in different ways to \nbioengineer living things!",
        // "Let's see what happens\n we bioengineer Angie.",
        // "Click on the green \nblock to add it to \nCRISPEE.", 
        // "You created a program that would light up Angie’s lure a beautiful white",
        // "Angie has been successfully bioengineered to light up!",
        // "Do you want to try to reprogram her genes and make a different light?"]
    }

    function intro(trials){
        console.log(trials[5]);
        addScaledSprite(138, 317, false, trials[6], 0.226); // one
        addScaledSprite(232, 313, false, trials[5], 0.226); // two
        block = BlocksToCrispee.createBlock(trials[0], 620, 400, 0.225, trials[1], 319, 313, 0.225);
        if (trialIndex === 0) {block.inputEnabled = false;}

        bubble = Text.create(40, -60, 'speechLong', 0.1);
        next = Text.createNextButton(280, 85, 0.2, function(){
            actionOnClick(block, trials[3], trials[4]);
        }, 1);
    
        content = trials[2];
        index = 0;
        text = game.add.text(65, 30, content[index], 
            {font: "22px Arial",
            fill: "#000000",
            align: "left"});
        text.alpha = 0;
        game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
        index++;
    }

    function results(colorImg, color){
        if (testing) {console.log("Creating the results screen.")};
        // resultScreen = game.add.group();
        tank = addSprite(0, 0, false, 'tank', game.width, game.height);
        angie = addScaledSprite(300, 150, false, colorImg, 0.1);
        bubble = Text.create(80, 315, 'speechLong', 0.12);
        no = game.add.button(270, 500, 'noButton', noHandler);
        no.scale.setTo(0.2, 0.2);
        yes = game.add.button(390, 500, 'yesButton', yesHandler);
        yes.scale.setTo(0.2, 0.2);

        text = game.add.text(105, 420, "You made the color " + color + 
                            "! \nDo you want to make another color?", 
            {font: "22px Arial",
            fill: "#000000",
            align: "left"});
        text.alpha = 0;
        game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
    }

    function yesHandler(){
        create();
    }

    function noHandler(){
        game.state.start('socialBiosensor');
    }


    function actionOnClick(block, colorImg, color){
        console.log(index);
        if (index === content.length){
                trialIndex++;
                results(colorImg, color);
                if (trialIndex===3){
                    trialIndex = 0;
                }
        } else {
            text.setText(content[index]);
            if (index === (1)){
                block.inputEnabled=true;
            };
            index++;
        }
    }

    return {      
        load: load, 
        create: create
    };

}());