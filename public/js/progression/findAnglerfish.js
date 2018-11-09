/**
 * PROGRESSION OF STATES (updated 9/21)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js ->  dilemmaOne.js -> crispeePlay.js -> socialBiosensor.js -> sbGame.js
 * The findAnglerfishState, where the submarine sees the glow in the water
 * and discovers an anglerfish
 * @exports findAnglerfishState
 */

var findAnglerfishState = {
	preload: function(){ FindAnglerfishState.load(); },
    create: function(){ FindAnglerfishState.create(); },
    update: function(){ FindAnglerfishState.update();},
    destroy: function(){ if(testing) BootState.updateLevel('learn'); }
}

var introText;
var text;
var content;
var index;
var newIndex;
var signalCrossed;
var speechBubble;
var nextButton;
var retrieve = false;
var retrieveButton;

var FindAnglerfishState = (function() {
    var load = function(){
        game.load.image('zoom', 'images/anglerfish/angieZoomIn3.png');
    }

    var create = function(){
        SubUnderwater.create();
        GlowingAnglerfish.create();

        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        //format and add the speechBubble, hiding the text with alpha = 0
        speechBubble = Text.create(-30, 250, 'speechBubble', 0.15);
        text = game.add.text(45, 380, 'Wow it sure is dark down here!\nClick on the submarine’s light beam\nto see what we can find.', 
            {font: "22px Arial",
            fill: "#000000",
            align: "left"});
        text.alpha = 0;
        game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
        music0 = game.add.audio('findanglerfishjs0');
        music0.play();
        //add the zoom sprite and scale it, hiding it with alpha = 0
        zoom = game.add.sprite(300, 85, 'zoom');
        zoom.scale.setTo(0.7, 0.7);
        zoom.alpha = 0;

        //add the walkie talkie and scale it, plus animate it, hiding it with alpha = 0
        walkie = game.add.sprite(550,200,'radio');
        walkie.scale.setTo(.3,.3);
        walkie.animations.add('walk');
        walkie.animations.play('walk', 5, true);
        walkie.alpha = 0;

        content = ["Wow, what’s that!\nDo you know what it is?", //0
        "What do you see?",//1 radio
        "We see a fish with a very big jaw\nand some sort of bulb hanging off\nof the front!",//2
        "Wow! This is exciting news! You’ve\nencountered a live angler fish!",//3 radio
        "Anglerfish are deep sea creatures\nthat live in solitude. This means\nthey prefer to be alone.",//4 radio
        "That bulb hanging from their head\nis called a lure and it can light\nup! They use it to hunt for food.",//5 radio
        "If the fish is bigger than your hand,\nthis is a female anglerfish."//6 radio
        ];
        
        index = 0;
    }

    //event loop for this progression
    var update = function(){
        BootState.updateLevel('intro','dilemmaOne');//for debugging
        GlowingAnglerfish.update();
        //if angie appears and retrieve isn't true, create the next and make it appear
        if (angieAppears.alpha === 1 && !(retrieve)){
            //create and add the callback function for the nextButton
            nextButton = Text.createNextButton(300, 490, 0.2, actionOnClick, 0);
            nextButton.alpha = 1;
            //when index is initialied to 0, make the text appear and increase index
            if (index === 0){
                text.setText(content[index]);
                text.setText(content[0]);
                music0.destroy();
                music1 = game.add.audio('findanglerfishjs1');
                music1.play();
                index++;
            }
        };
    }

    //callback function for nextButton
    function actionOnClick(){
        switch(index){
            //go to the next progression when we have gone through the content
            case (content.length):
                //retrieve is iniated, so next button is destroyed
                retrieve = true;
                nextButton.kill();

                //start retrieve angie cutscene
                retrieveAngie();

                //game.state.start('dilemmaOne');
                break;
            //index trigger for when zoom and walkie talkie should appear
            case 1:
                music1.destroy();
                text.setText(content[index]);
                music2 = game.add.audio('findanglerfishjs2');
                music2.play();
                index++;
                break;
            case 2:
                music2.destroy();
                text.setText(content[index]);
                music3 = game.add.audio('findanglerfishjs3');
                music3.play();
                index++;
                break;
            case 3:
                music3.destroy();
                text.setText(content[index]);
                music4 = game.add.audio('findanglerfishjs4');
                music4.play();
                text.setText(content[index]);
                zoom.alpha = 1;
                index++;
            case 4:
                music4.destroy();
                text.setText(content[index]);
                music5 = game.add.audio('findanglerfishjs5');
                music5.play();
                index++;
                break;
            case 5:
                music5.destroy();
                text.setText(content[index]);
                music6 = game.add.audio('findanglerfishjs6');
                music6.play();
                index++;
                break;
            case 6:
                music6.destroy();
                text.setText(content[index]);
                music7 = game.add.audio('findanglerfishjs7');
                music7.play();
                index++;
                break;
            default:
                text.setText(content[index]);
                zoom.alpha = 0;

                //make the walkie talkie appear when it is talking
                if (index >= 3 || index === 1){
                    walkie.alpha = 1;
                }
                else{
                    walkie.alpha = 0;
                }
                index++;
        }
    }

    function retrieveAngie(){
        //hide the zoom and walkie talkie
        zoom.alpha = 0;
        walkie.alpha = 0;
        
        //make the retrieve button appear, all callback for the animation
        retrieveButton = game.add.button(550,150,'retrieveButtonZoom',retrieveBttnCallback,this);
        retrieveButton.alpha = 1;
        retrieveButton.scale.setTo(.07,.07);
        music7.destroy();
        music8 = game.add.audio('findanglerfishjs8');
        music8.play();
        text.setText("Click on the button to catch\nthe fish.");
            }

    function retrieveBttnCallback(){
        //tween for angie being taken onto the ship
        retrieveTween = game.add.tween(angieAppears).to( { y: 0, alpha: 0}, 2000, Phaser.Easing.Circular.InOut, true);
        
        //callback for going to the next level when the tween
        retrieveTween.onComplete.add(function(){
            game.state.start('dilemmaOne');
        }, this);
    }
    
    var onTap = function(){
        Anglerfish.create();
    }

    return {
        load: load,       
        create: create,
        update: update,
        onTap: onTap
    };

}());
