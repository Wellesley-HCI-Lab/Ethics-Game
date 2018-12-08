
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
var leftKey;
var upKey;
var downKey;

var toxinsStartState = {
    load: function(){ toxinsStart.load();},
    create: function(){ toxinsStart.create(); },
    update: function(){  toxinsStart.update(); }
}

var toxinsStart = (function() {

    var load = function(){
    }

    var create = function(){
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        //script content variable
        content = ["We’re in a new part of the ocean,\nand the water seems unusually\npolluted here.", //0
        "We have to avoid the pollution\nbecause the pollution could break\nour submarine.", //1
        "But it’s so dark we can’t see where\nthe pollution is!", //2
        "Can we use bioengineering to change\nAngie’s light to help us navigate the\nwater?",//3
        "We can give Angie a new biosensor\nusing the bioengineering. ",//4
        "This biosensor lets Angie know when\nshe is near toxic water or air.",//5
        "That means it is unsafe to live in\nand could hurt the animals in this\nenvironment.",//6
        "Let’s use our toxin biosensor and\nprogram Angie to alert us when she\nfinds polluted water!",//7
        "Wait, this biosensor lets Angie know\nwhen she is near toxic, unhealthy\nwater.",//8
        "But she could get sick if she swims\nin this water.",//9
        "We could also use our ship and\nsave Angie from the toxic water. ",//10
        "But our submarine is not as good as\nAngie at finding pollution.",//11
        "It could get broken while we look\nfor toxins.",//12
        "Should we release Angie in the\nocean even though it may make her\nsick?",//13
        "Or should we use our beam lights\neven though our ship may get\nbroken?",//14
        "What do you think we should do?"//15
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
            case 8:
                tankBackground = addSprite(0, 0, false, 'noScreen', game.width, game.height);

                walkie = game.add.sprite(550,200,'radio');
                walkie.scale.setTo(.3,.3);
                walkie.animations.add('walk');
                walkie.animations.play('walk', 5, true);

                game.world.bringToTop(bubble);
                game.world.bringToTop(next);
                game.world.bringToTop(text);

                text.setText(content[index]);
                index++;
                break;
            //add yes or no button
            case 15:
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

    function update(){
        if (leftKey.isDown){
                game.state.start('sbGame');
            }
        if (upKey.isDown){
                game.state.start('yesStory');
            }
        if (downKey.isDown){
                game.state.start('noStory');
            }
    }

    return {      
        load: load, 
        create: create,
        update: update
    };

}());