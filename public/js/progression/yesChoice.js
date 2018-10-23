
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

var yesStartState = {
    load: function(){ yesChoice.load();},
    create: function(){ yesChoice.create();},
    update: function(){  BootState.updateLevel('toxins',''); }
}

var yesChoice = (function() {

    var load = function(){
    }

    var create = function(){
        //script content variable
        content = ["How can we program Angie so that\nwe can also know when she senses\ntoxic water?", //0
        "Click on the blocks to program Angie\nfor toxins.",//1
        "Let's move angie to the water now\nto find pollutants.",//2
        "Angie is out in the open water now,\nlet’s see what she finds.", //3
        "We fully explored all of the toxic\nenvironment! ", //4
        "But what’s this? Angie looks sick.\n",//5
        "We’ll need to bring her on the ship\nand see if we can help her.",//6
        "We have finished our mission. ",//7
        "We were able to use Angie to find all\nof the toxins but angie got sick.",//8
        "Do you think we made the right\ndecision?"//9
        ];

        background = BlocksToCrispee.createCrispeeW();

        index = 0;

       //add border and next button, make them appear
        bubble = Text.create(30, -70, 'speechLong', 0.11);
        next = Text.createNextButton(305, 95, 0.2, function(){
            actionOnClick();
        }, 1);

        addScaledSprite(138, 317, false, 'redBlockIn', 0.226); 
        addScaledSprite(232, 313, false, 'blueBlockIn', 0.226);

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
        console.log(index);
        switch(index){
            case 1:
                text.setText(content[index]);

                block = BlocksToCrispee.createBlock('greenBlockOut', 620, 400, 0.225,'greenBlockIn', 319, 313, 0.225);

                index++;
                break;
            case 3:
                SubUnderwater.create();

                fish = game.add.sprite(280, 145,'angieWhite');
                fish.scale.setTo(0.07,0.07);

                game.world.bringToTop(bubble);
                game.world.bringToTop(next);
                game.world.bringToTop(text);

                text.setText(content[index]);
                index++;

                next.inputEnabled = false;
                toxinsCutscene();

                break;
            //angie being sick
            case 5:
                SubUnderwater.create();

                game.world.bringToTop(bubble);
                game.world.bringToTop(next);
                game.world.bringToTop(text);

                sickFish = game.add.sprite(150, 160,'angieSick');
                sickFish.scale.setTo(0.4,0.4);

                text.setText(content[index]);
                index++;
                break;
            default:
                text.setText(content[index]);
                index++;
        }
    }

    function toxinsCutscene(){
        toxinsSprite = addSprite(0, 0, false, 'toxinsImg', game.width, game.height);
        toxinsSprite.animations.add('cutscene',[0,1,2,3,4,5]);
        toxinsSprite.animations.play('cutscene', 1, false);
        toxinsSprite.scale.set(1);
        toxinsSprite.smoothed = false;

        toxinsSprite.animations.currentAnim.onComplete.add(
            function () {
                next.inputEnabled = true;
                
                game.world.bringToTop(bubble);
                game.world.bringToTop(next);
                game.world.bringToTop(text);

                text.setText(content[index]);
                index++;
            }, this);
    }

    return {      
        load: load, 
        create: create
    };

}());