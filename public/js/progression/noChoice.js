
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
var startBttn;
var timer;
var counterNum = 0;

var noStartState = {
    load: function(){ noChoice.load();},
    create: function(){ noChoice.create(); },
    update: function(){  BootState.updateLevel('toxins',''); }
}

var noChoice = (function() {

    var load = function(){
    }

    var create = function(){
        SubUnderwater.create();

        //script content variable
        content = ["Since we’re not going to be using\nAngie, we’re going to have to find the",//0
        "patches of pollutants using the\nsubmarines lights.", //1
        "Without Angie’s help, we may not be\nable to find them all.", //2
        "Remember, the ship can’t stay here\ntoo long!", //3
        "Click on the pollutants when the\nsubmarine light shines on them!",//4
        "We’ve explored half of the toxic\nenvironment!",//5
        "But our ship became damaged, so\nwe need to return to the surface so\nwe stay safe.",//6
        "We have finished our mission.",//7
        "We were able to keep angie safe\nfrom the toxins but we didn’t find all\nof the toxins.",//8
        "Do you think we made the right\ndecision?"//9
        ];

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

        //text for timer
        timerText = game.add.text(55, 30, "Timer: 30", 
            {font: "22px Arial",
            fill: "#FFFFFF",
            align: "left"});
        timerText.alpha = 0;

        pollutionText = game.add.text(55, 60, "Pollution Found: 0", 
            {font: "22px Arial",
            fill: "#FFFFFF",
            align: "left"});
        pollutionText.alpha = 0;

        //create start button, hide and disable input
        startBttn = game.add.button(200, 100, 'startButton', findPollution, this, 2, 1, 0);
        startBttn.alpha = 0;
        startBttn.inputEnabled = false;

        //create timer for the mini game

       //show text and add animation
        game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
        index++;
    }

    //callback for next button to change trigger various events
    function actionOnClick(){
        console.log(index);
        switch(index){
            //start the mini game for finding pollutans
            case 5:
                //hide all the buttons
                bubble.alpha = 0;
                text.alpha = 0;
                next.alpha = 0;
                next.inputEnabled = false;

                //show start button
                startBttn.inputEnabled = true;
                startBttn.alpha = 1;

                text.setText(content[index]);
                index++;
                break;
            //go to the surface
            case 7:
                text.setText(content[index]);

                Submarine.create();
                Scientist.create(-140, 400);

                game.world.bringToTop(bubble);
                game.world.bringToTop(next);
                game.world.bringToTop(text);
                

                index++;
                break;
            default:
                text.setText(content[index]);
                index++;
        }
    }

    //callback for starting finding the pollution game
    function findPollution(){
        text.alpha = 0

        //disable start button input
        startBttn.alpha = 0;
        startBttn.inputEnabled = false;

        //start the actual event timer
        game.time.events.add(Phaser.Timer.SECOND * 3, endGame, this);

        //start the display timer to update every second
        timer = game.time.create(false);
        timer.loop(1000, function(){
            timerText.setText("Timer: " + Math.round(game.time.events.duration/1000));
            pollutionText.setText("Pollution Found: "+counterNum);
        }, this);
        timer.start();

        //timer to make sprites appear every second
        timerSprites = game.time.create(false);
        timerSprites.loop(1000, function(){
            createPollution();
        }, this);
        timerSprites.start();

        destroySprites = game.time.create(false);
        destroySprites.loop(1200, function(){
            pollution.destroy();
        }, this);
        destroySprites.start();

        timerText.alpha = 1;
        pollutionText.alpha = 1;
        
    }

    function createPollution(){
        pollution = game.add.sprite( Math.floor((Math.random() * 500) + 100),  Math.floor((Math.random() * 150) + 100), 'pollutionCloud');
        pollution.scale.setTo(.3,.3);
        pollution.inputEnabled = true;
        pollution.input.useHandCursor = true;
        pollution.events.onInputDown.add(counter, this);
    }

    function counter(){
        pollution.destroy();
        counterNum++;
    }

    //callback for timer, end the pollution game
    function endGame(){
        pollution.destroy();
        destroySprites.stop();
        timerSprites.stop();

        bubble.alpha = 1;
        text.alpha = 1;
        next.alpha = 1;
        next.inputEnabled = true;

        timerText.alpha = 0;
        pollutionText.alpha = 0;

    }

    return {      
        load: load, 
        create: create
    };

}());