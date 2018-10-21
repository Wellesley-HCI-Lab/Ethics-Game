/**
 * PROGRESSION OF STATES (updated 9/21)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js ->  dilemmaOne.js -> crispeePlay.js -> socialBiosensor.js -> sbGame.js
 * The crispeePlay state, where the user gets to input blocks into CRISPEE
 * in order to change the color of Angie's lure.
 * @exports findAnglerfishState
 */
var content;
var block;
var index;
var text;

var toxinsState = {
    load: function(){ toxins.load();},
    create: function(){ toxins.create(); }
}

var toxins = (function() {

    var load = function(){
        game.load.image('crispee', 'images/crispee/crispee.png');
        BlocksToCrispee.load();
    }

    var create = function(){
        //create the blocks to Cripee for the machine
        BlocksToCrispee.create();

        //script content variable
        content = ["This is our CRISPEE \nmachine!", //0
        "Each block represents a gene\nfrom other animals that allows\nthose animals to light up.", //1
        "Using CRISPEE, we can arrange\nthese genes in a program to\nbioengineer Angie!", //2
        "A program is a list of instructions\nthat makes something else happen.", //3
        "Click on the green gene to finish\nAngie’s gene program."//4
        ] 

        crispee = addSprite(0, 0, false, 'crispee', game.width, game.height);

        addScaledSprite(138, 317, false, 'redBlockIn', 0.226); 
        addScaledSprite(232, 313, false, 'blueBlockIn', 0.226);

        index = 0;

       //add border and next button, make them appear
        bubble = Text.create(30, -70, 'speechLong', 0.11);
        next = Text.createNextButton(305, 95, 0.2, function(){
            actionOnClick();
        }, 1);

        //format and hide text
        text = game.add.text(55, 30, content[index], 
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
        switch(index){
            //when the user is prompted to put in the green block
            case 4:
                text.setText(content[index]);
                block = BlocksToCrispee.createBlock('greenBlockOut', 620, 400, 0.225,'greenBlockIn', 319, 313, 0.225);
                index++;
                break;   
            //change to angie being lit up after block is placed at the end of the dialogue
            case (content.length):
                showAngieLight();
            default:
                text.setText(content[index]);
                index++;
        }
    }


    return {      
        load: load, 
        create: create
    };

}());