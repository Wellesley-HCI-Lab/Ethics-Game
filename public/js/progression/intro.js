/**
 * PROGRESSION OF STATES (updated 9/21)
 * boot.js -> intro.js -> findAnglerfish.js ->  dilemmaOne.js -> crispeePlay.js -> socialBiosensor.js -> sbGame.js
 * The Intro state, where Pam and the submarine crew are 
 * introduced, and their mission is explained
 * The top of submarine is open
 * Introduce tools such as the radio and the map
 * Scientist disappears
 * Lid closes
 * @exports introState
 */

var subSprite0;
var subSprite1;
var subSprite2;

var introState = {
	preload: function(){ Intro.load(); },
    create: function(){ Intro.create();},
    update: function(){ Intro.update();}
}

var Intro = (function() {

    var load = function(){
        Text.load('speechBubble', 'images/text/bubbleNew.png');
        game.load.image('pointer', 'images/text/pointer.png');

        //descending submarine images
        game.load.image('sub','images/submarine/subAboveWater.png');
    }

    var create = function(){
        // Creates Submarine and Scientist
        Submarine.create();
        Scientist.create(-140, 400);
        speechBubble = Text.create(315, 280, 'speechBubble', 0.15);
        nextButton = Text.createNextButton(640, 522, 0.2, actionOnClick,1);
        
        //intro dialogue broken into individual sentences and index number
        var content = ["Hi and welcome!", //0
        "I’m Pam, a bioengineer.\nThat means I am an engineer who\nuses genes of living things to solve\nproblems.", //1
        "Today you’re going to be\npart of a deep sea dive with me!", //2
        "We are going to study\nmysterious deep sea creatures in\nour submarine.", //3
        "The submarine is a research lab\nand it can take us to the\ndeepest part of the ocean.", //4
        "We’re going to explore things\nmost people have never\nseen.", //5
        "If we have questions we\ncan ask our friends above the\nwater with a walkie-talkie.",//6
        "Let’s go!" //7
        ];

        //index for the content loop
        index = 0;

        //text stylizations
        text = game.add.text(390, 420, content[index], 
            {font: "22px Arial",
            fill: "#000000",
            align: "left"});
        text.alpha = 0;

        //tween to make the text appear
        game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
        
        //add music then increment the index after first dialogue
        text.setText(content[index]);
        music0 = game.add.audio('introjs0');
        music0.play();
        index++;


        //event loop that goes through each line of the content when next is clicked
        function actionOnClick(){
            //go to the cutscene for the submarine descending
            switch(index){
                // case 1:
                //     text.setText(content[index]);
                //     music = game.add.audio('01');
                //     music.play();
                //     index++;
                //     break;
                // case 2:
                //     music.destroy();
                //     text.setText(content[index]);
                //     music1 = game.add.audio('02');
                //     music1.play();
                //     index++;
                //     break;
                case 1:
                    music0.destroy();
                    text.setText(content[index]);
                    music1 = game.add.audio('introjs1');
                    music1.play();
                    index++;
                    break;
                case 2:
                    music1.destroy();
                    text.setText(content[index]);
                    music2 = game.add.audio('introjs2');
                    music2.play();
                    index++;
                    break;
                case 3:
                    music2.destroy();
                    text.setText(content[index]);
                    music3 = game.add.audio('introjs3');
                    music3.play();
                    index++;
                    break;
                case 4:
                    music3.destroy();
                    text.setText(content[index]);
                    music4 = game.add.audio('introjs4');
                    music4.play();
                    text.setText(content[index]);
                    pointer = game.add.sprite(500, 200, 'pointer');
                    pointer.scale.setTo(0.1, 0.1);
                    index++;
                    break;
                case 5:
                    music4.destroy();
                    text.setText(content[index]);
                    music5 = game.add.audio('introjs5');
                    music5.play();
                    index++;
                    break;
                case 6:
                    music5.destroy();
                    text.setText(content[index]);
                    music6 = game.add.audio('introjs6');
                    music6.play();
                    text.setText(content[index]);
                    radio = game.add.sprite(280, 100,'radio');
                    radio.scale.setTo(0.3,0.3);
                    radio.animations.add('walk');
                    radio.animations.play('walk', 5, true); 
                    index++;
                    break;
                case 7:
                    music6.destroy();
                    text.setText(content[index]);
                    music7 = game.add.audio('introjs7');
                    music7.play();
                    index++;
                    break;
                case (content.length):
                    subCutscene();
                    break;
                default:
                    if (typeof pointer !== "undefined"){pointer.destroy();}
                    if (typeof radio !== "undefined"){radio.destroy();}
                    text.setText(content[index]);
                    index++;
            }
        }  
    }

    //first section of cutscene for submarine
    function subCutscene() {
        nextButton.inputEnabled = false;
        subSprite0 = game.add.sprite(-1, -1, 'subSpritesImg0');
        subSprite0.animations.add('cutscene',[0,1,2,3,4,5]);
        subSprite0.animations.play('cutscene', 1, false);
        subSprite0.scale.set(1);
        subSprite0.smoothed = false;

        //call the second animation when the first one is complete
        subSprite0.animations.currentAnim.onComplete.add(
            function () {
                subCutSceneOne();
            }, this);
    }

    //second section of cutscene for submarine
    function subCutSceneOne(){
        subSprite1 = game.add.sprite(-1, -1, 'subSpritesImg1');
        subSprite1.animations.add('cutscene',[0,1,2,3,4,5]);
        subSprite1.animations.play('cutscene', 1, false);
        subSprite1.scale.set(1);
        subSprite1.smoothed = false;

        //call the next phase when the second animation is complete
        subSprite1.animations.currentAnim.onComplete.add(
            function () {
                subCutSceneTwo();
            }, this);
    }

    //third section of cutscene for submarines

    function subCutSceneTwo(){
        subSprite2 = game.add.sprite(-1, -1, 'subSpritesImg2');
        subSprite2.animations.add('cutscene',[0,1]);
        subSprite2.animations.play('cutscene', 1, false);
        subSprite2.scale.set(1);
        subSprite2.smoothed = false;

        //call the next phase when the second animation is complete
        subSprite2.animations.currentAnim.onComplete.add(
            function () {
                game.state.start('findAnglerfish');
            }, this);
    }


    var update = function(){
        BootState.updateLevel('boot','findAnglerfish'); 
    }

    return {   
        load: load,    
        create: create,
        update: update
    };

}());