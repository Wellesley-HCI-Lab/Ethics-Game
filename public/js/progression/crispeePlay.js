/**
 * PROGRESSION OF STATES (updated 7/24)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js
 * The crispeePlay state, where the user gets to input blocks into CRISPEE
 * in order to change the color of Angie's lure.
 * @exports findAnglerfishState
 */

var content;
var blocks;

var crispeePlayState = {
    load: function(){ CrispeePlay.load();},
    create: function(){CrispeePlay.create(); },
    update: function(){if(testing) BootState.updateLevel('socialBiosensor');}
    
}

var CrispeePlay = (function() {

    var load = function(){
        BlocksToCrispee.load();
        Text.load('speechBubble', 'images/text/bubbleNew.png');
    }

    var create = function(){
        ret = BlocksToCrispee.create(0);
        blocks = ret[0]; transBlocks = ret[1];
        blocks.setAll("alpha", 1);
        green = blocks.children[2];
        green.inputEnabled = false;
        bubble = Text.create(10, -60, 'speechBubble', 0.1);
        redBlockIn = BlocksToCrispee.putInCrispee(blocks.children[1], transBlocks.children[1], "redBlockIn");
        blueBlockIn = BlocksToCrispee.putInCrispee(blocks.children[0], transBlocks.children[0], "blueBlockIn");
        redBlockIn.alpha = 1;
        blueBlockIn.alpha = 1;
        
        next = Text.createNextButton(190, 90, 0.2, actionOnClick, 1);
        content = ["This is our CRISPEE \nmachine",
        "We can use it to \nbioengineer Angie",
        "Click on the green \nblock to add it to \nCRISPEE" ]

        index = 0;
        text = game.add.text(60, 25, content[index], 
            {font: "22px Arial",
            fill: "#000000",
            align: "left"});
        text.alpha = 0;
        game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
        index++;

    }

    function actionOnClick(){
        if (index === content.length){
            game.state.start('socialBiosensor');
        } else {
            text.setText(content[index]);
            if (index === 1){
                green.inputEnabled=true;
            }
            index++;
        }
    }

    return {      
        load: load, 
        create: create
    };

}());