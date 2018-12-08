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

var crispeePlayState = {
    load: function(){ CrispeePlay.load();},
    create: function(){ CrispeePlay.create(); },
    update: function(){ BootState.updateLevel('dilemmaOne','socialBiosensor'); }
}

var CrispeePlay = (function() {

    var load = function(){
    }

    var create = function(){
        //script content variable
        content = ["This is our bioengineering\nlab!", //0
        "We will be using it to change\nAngie's light genes.",//1
        "Genes are part of our DNA,\nwhich is inside our bodies.",//2
        "There are genes for the color of your\neyes,the length of a dog’s fur, and all\nsorts of other traits.", //3
        "Many genes together make a\nprogram to build our bodies. ", //4
        "Angie glows because she has\na gene that tells her body to glow. ", //5
        "Can you think of any other\nanimals that have genes for glowing\nlike Angie? ",//6
        "Click on the color you would\nlike Angie’s light to be.",//7
        ] 

        //add color machine
        crispee = addSprite(0, 0, false, 'colorMachine', game.width, game.height);

        //add buttons
        redBttn = game.add.button(270, 500, 'redButton',);
        yellowBttn = game.add.button(270, 500, 'yellowButton',);
        blueBttn = game.add.button(270, 500, 'blueButton',);
        whiteBttn = game.add.button(270, 500, 'whiteButton',);
        cyanBttn = game.add.button(270, 500, 'cyanButton',);
        magentaBttn = game.add.button(270, 500, 'magentaButton',);
        greenBttn = game.add.button(270, 500, 'greenButton',);

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
            case 7:
                text.setText(content[index]);
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

    //show users a demo for the CRISPEE blocks
    function showAngieLight(){
        //change the background
        tank = addSprite(0, 0, false, 'tank', game.width, game.height);
        angie = addScaledSprite(300, 150, false, 'angieWhite', 0.1);
        bubble = Text.create(80, 315, 'speechLong', 0.12);

        //add the text
        text = game.add.text(105, 420, "You changed Angie’s genes!\nTry again?", 
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

    function continueGame(){
        game.state.start('socialBiosensor');
    }

    return {      
        load: load, 
        create: create
    };

}());