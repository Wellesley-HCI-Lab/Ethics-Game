/**
 * PROGRESSION OF STATES (updated 9/21)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js -> socialBiosensor.js -> sbGame.js
 * The crispeePlay state, where the user gets to input blocks into CRISPEE
 * in order to change the color of Angie's lure.
 * @exports findAnglerfishState
 */
var content;
var block;
var index = 0;

var crispeePlayState = {
    load: function(){ CrispeePlay.load();},
    create: function(){CrispeePlay.create(); },
    update: function(){if(testing) BootState.updateLevel('socialBiosensor');}
}

var CrispeePlay = (function() {

    var load = function(){
        game.load.image('crispee', 'images/crispee/crispee.png');
        BlocksToCrispee.load();
    }

    var create = function(){
        //create the blocks to Cripee for the machine
        BlocksToCrispee.create();

        //script content variable
        content = ["This is our CRISPEE \nmachine!", 
        "Each of these blocks represents \na gene.",
        "We can arrange genes to\nbioengineer living things!",
        "Let's see what happens\nwe bioengineer Angie.",
        "Click on the green \nblock to add it to \nCRISPEE."]//, 
        //"You created a program that would \nlight up Angie’s lure.",
        //"Angie has been successfully \nbioengineered to light up!"]

        crispee = addSprite(0, 0, false, 'crispee', game.width, game.height);

        addScaledSprite(138, 317, false, 'redBlockIn', 0.226); 
        addScaledSprite(232, 313, false, 'blueBlockIn', 0.226);

       //add border and next button, make them appear
        bubble = Text.create(40, -60, 'speechLong', 0.1);
        next = Text.createNextButton(280, 85, 0.2, function(){
            actionOnClick();
        }, 1);

        //format and hide text
        text = game.add.text(65, 30, content[index], 
            {font: "22px Arial",
            fill: "#000000",
            align: "left"});
        text.alpha = 0;

       //show text and add animation
        game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);

        index++;
    }

    //callback for next button to change trigger various events
    function actionOnClick(){
        //when the user is prompted to put in the green block
        if (index == 4){
            text.setText(content[index]);
            block = BlocksToCrispee.createBlock('greenBlockOut', 620, 400, 0.225,'greenBlockIn', 319, 313, 0.225);
        }
        //change to angie being lit up after block is placed at the end of the dialogue
        if (index == content.length){
            //if the block is placed in CRISPEE
            showAngieLight();
        }
        //
        //else change the text content always
        else {
            text.setText(content[index]);
        }
        index++;
    }

    //show users a demo for the CRISPEE blocks
    function showAngieLight(){
        //change the background
        tank = addSprite(0, 0, false, 'tank', game.width, game.height);
        angie = addScaledSprite(300, 150, false, 'angieWhite', 0.1);
        bubble = Text.create(80, 315, 'speechLong', 0.12);

        //add the text
        text = game.add.text(105, 420, "You made the color white!"+
                            "\nDo you want to do that again?", 
            {font: "22px Arial",
            fill: "#000000",
            align: "left"});
        text.alpha = 0;

        //add animation for the text
        game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);

        no = game.add.button(270, 500, 'noButton', continueGame);
        no.scale.setTo(0.2, 0.2);
        
        yes = game.add.button(390, 500, 'yesButton', replayCrispee);
        yes.scale.setTo(0.2, 0.2);
    }

    function replayCrispee(){
        text.setText('');

        //reset the index to where they are asked to click on the CRISPEE block
        index = 4;

        //reset all the sprites here
        crispee = addSprite(0, 0, false, 'crispee', game.width, game.height);

        block = BlocksToCrispee.createBlock('greenBlockOut', 620, 400, 0.225,'greenBlockIn', 319, 313, 0.225);

        addScaledSprite(138, 317, false, 'redBlockIn', 0.226); 
        addScaledSprite(232, 313, false, 'blueBlockIn', 0.226);

       //add border and next button, make them appear
        bubble = Text.create(40, -60, 'speechLong', 0.1);
        next = Text.createNextButton(280, 85, 0.2, function(){
            actionOnClick();
        }, 1);

        //format and hide text
        text = game.add.text(65, 30, content[index], 
            {font: "22px Arial",
            fill: "#000000",
            align: "left"});
        text.alpha = 0;

       //show text and add animation
        game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);

        index++;

    }

    function continueGame(){
        text.setText('');
        game.state.start('socialBiosensor');
    }

    return {      
        load: load, 
        create: create
    };

}());