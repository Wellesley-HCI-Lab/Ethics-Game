
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

var toxinsStartState = {
    load: function(){ toxinsStart.load();},
    create: function(){ toxinsStart.create(); }
}

var toxinsStart = (function() {

    var load = function(){
    }

    var create = function(){
        //script content variable
        content = ["We’re in a new part of the ocean,\nand the water seems unusually\npolluted here.", //0
        "We have to avoid the pollution\nbecause the pollution could break\nour submarine.", //1
        "But it’s so dark we can’t see where\nthe pollution is!", //2
        "Remember how some genes let\nanimals use special senses, called\nbiosensor genes?",//3
        "Here is another biosensor\nthat we can give to Angie.",//4
        "This biosensor lets Angie know\nwhen she is near toxic, unhealthy\nwater.",//5
        "But she could get sick if she swims\nin this water.",//6
        "Should we bioengineer Angie\neven though it may make her sick?",//7
        "Or should we use our beam lights\neven though our ship may get stuck?",//8
        "I think our submarine could\nget stuck and we are so far away\nfrom the shore.",//9
        "We need Angie’s help to bring us\nto safe water.",//10
        "I think this water is really\ndangerous for us, and for Angie.",//11
        "We should find our own way out\nand keep Angie from harm.",//12
        "What do you think we should\ndo? "//13
        ];

        background = addSprite(0, 0, false, 'pollution', game.width, game.height);

        index = 0;

       //add border and next button, make them appear
        bubble = Text.create(400, 375, 'speechLong', 0.11);
        next = Text.createNextButton(675, 535, 0.2, function(){
            actionOnClick();
        }, 1);

        //format and hide text
        text = game.add.text(425, 475, content[index], 
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
            //change to tank background
            case 3:
                tankBackground = addSprite(0, 0, false, 'yesScreen', game.width, game.height);

                game.world.bringToTop(bubble);
                game.world.bringToTop(next);
                game.world.bringToTop(text);

                text.setText(content[index]);
                index++;
                break;
            //radio makes it's case
            case 11:
                tankBackground = addSprite(0, 0, false, 'noScreen', game.width, game.height);

                walkie = game.add.sprite(400,100,'radio');
                walkie.scale.setTo(1,1);
                walkie.animations.add('walk');
                walkie.animations.play('walk', 5, true);

                game.world.bringToTop(bubble);
                game.world.bringToTop(next);
                game.world.bringToTop(text);

                text.setText(content[index]);
                index++;
                break;
            //add yes or no button
            case 13:
                next.destroy();
                yes = game.add.button(500, 535, 'yesButton', function(){
                        console.log("yes");
                        game.state.start('yesStory');
                    }
                );
                yes.scale.setTo(0.2, 0.2);
                
                no = game.add.button(630, 535, 'noButton', function(){
                        console.log("no");
                        game.state.start('noStory');
                    }
                );
                no.scale.setTo(0.2, 0.2);

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