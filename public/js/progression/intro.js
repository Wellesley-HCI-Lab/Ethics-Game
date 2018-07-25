/**
 * PROGRESSION OF STATES (updated 7/24)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js
 * The Intro state, where Pam and the submarine crew are 
 * introduced, and their mission is explained
 * The top of submarine is open
 * Introduce tools such as the radio and the map
 * Scientist disappears
 * Lid closes
 * @exports introState
 */

var introState = {
	preload: function(){ Intro.load(); },
    create: function(){ Intro.create();},
    // update: function() { if(testing) BootState.updateLevel('findAnglerfish'); },
    update: function(){ Intro.update();}
}


var Intro = (function() {

    var load = function(){
        // game.load.image('textBubble', 'images/text/bubbleLong.png');
        // game.load.image('next', 'images/background/nextButton.png');
        Text.load('textBubble', 'images/text/bubbleLong.png')
        Text.load('next', 'images/background/nextButton.png');

    }

    var create = function(){
        // Creates Submarine and Scientist
        Submarine.create();
        Scientist.create();
        Text.create(360, 240, 'textBubble', 0.13, 0.16);
        index = Text.createNextButton(660, 520, 'next', 0.1, 0.1);
        console.log(index);
        // Adds text bubble and next button for speech
        // textBubble = game.add.sprite(360, 240, 'textBubble');
        // textBubble.scale.setTo(0.13, 0.16);
        // textBubble.alpha = 0;
        // game.add.tween(textBubble).to( {alpha: 1 }, 1000, Phaser.Easing.Back.Out, true);

        // nextButton = game.add.button(660, 520, 'next', actionOnClick, this, 1, 0, 2);
        // nextButton.scale.setTo(0.1, 0.1);
        // nextButton.alpha = 0;
        // game.add.tween(nextButton).to( {alpha: 1 }, 1000, Phaser.Easing.Back.Out, true);
        

        // Intro dialogue broken into individual sentences
        var content = ["Hi, and welcome! ", 
        "It’s so good to meet the \nfinal member of our deep sea crew! ", 
        "I’m Pam and this is my crew of \nbioengineers.",
        "We want to study the deep sea and \nits mysterious creatures!",
        "This is our submarine!",
        "It will keep us alive in depths up \nto 13000 ft where sunlight\ncan’t reach!", 
        "It will also serve as our lab space to\nuse CRISPEE, a machine we can \nuse to bioengineer genes.",
        "Pretty handy, huh?",
        "As part of our research team, we \nalso have a scientist who is an \nexpert on deep creatures \nhelping us!",
        "She’s still on land, so we use a radio\nto contact her.", 
        "If we ever want to talk to her, \nshe can tell us lots of helpful facts \nabout deep sea animals.", 
        "Well now that you’re here to help us, \nit’s time for us to board the \nsubmarine!"];

        Text.addContent(content, 390, 450, 'findAnglerfish')
        index = Text.actionOnClick();
        console.log('index: ' + index);

        // // Index set to first sentence
        // var index = 0;
        // console.log(' initial dialogue ' + content[index]);
        // text = game.add.text(390, 450, content[index], 
        //     {font: "22px Arial",
        //     fill: "#000000",
        //     align: "left"});
        // text.alpha = 0;
        // game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
        // index++;

        // function actionOnClick(){
        //     if (index === content.length){
        //          nextButton = game.add.button(660, 520, 'next', onTap, this, 1, 0, 2);
        //          nextButton.scale.setTo(0.1, 0.1);
        //          return;
        //     } else {
        //         text.setText(content[index]);
        //         console.log(index)
        //         index++;
        //     }

        //     // Handles radio animation
        //     if (index != 10){
        //         if (typeof radio !== "undefined"){
        //             radio.destroy();
        //         }
        //     } else {
        //         radio = game.add.sprite(150, 50,'radio');
        //         radio.scale.setTo(1,1);
        //         radio.animations.add('walk');
        //         radio.animations.play('walk', 5, true); 
        //     }
            
            // text.destroy(); // Destroy the old text before the new one shows
        
            // console.log('index before ' + index);
            // console.log('original dialogue ' + content[index]);
            // //New text appears 
            // game.add.tween(tween).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            // //take note of index of the new word
            // var newIndex = index++ ;
            // console.log('after ' + index);
            // console.log(' new dialogue ' + content[index]);
            // //index = (index + 1) % content.length

            // // Show that new text on world
            // text = game.add.text(70,400, content[index]);
            // tween = game.add.tween(text);
            // console.log('dialogue length ' + content.length);

            // //CONTROLS DIRECTIONAL POINTER//
            // if (content[index] !='This is our submarine!'){
            //     pointer.destroy();

            //     } else {
            //         pointer = game.add.sprite(400, 200, 'pointer');
            //         pointer.scale.setTo(0.1, 0.1);
            //     }
            // //CONTROLS DIRECTIONAL POINTER/ end/

            ///////////////////////NEXT STEPS///////////////////


            // SOMETHING TO CONTROL INTRODUCTION OF MAP (JUST LIKE THE WALKIE TALKIE) -
            //CHANGE DIALOGUE TO ACCOUNT FOR THIS 

            // SOMETHING TO CONTROL ANIMATION OF LID OPENING  - CURRENT BAKGROUND PIC 
            //DOESNT SUPPORT THIS

            //MAKE SCIENTIST DISAPPER -- CURRENT BACKGROUND PIC 

            //DOESNT SUPPORT THIS
            //MAKE LID CLOSE
            //MAKE SUBMARINE DESCEND??

            // MAKE NEXT BUTTON/TRIGGER ONTAP

            //CHANGE IMAGE OF TEXTBUBBLE


            //after dialogue is complete -
        }
    

    // var onTap = function (){
    //     game.state.start('findAnglerfish')
    // }

    var update = function(){
        Submarine.move();
    }


    return {   
        load: load,    
        create: create,
        update: update
    };

}());