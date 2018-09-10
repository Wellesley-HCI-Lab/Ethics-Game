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
    update: function(){ Intro.update();}
}


var Intro = (function() {

    var load = function(){
        Text.load('speechBubble', 'images/text/bubbleNew.png');
        game.load.image('pointer', 'images/text/pointer.png');
    }

    var create = function(){
        // Creates Submarine and Scientist
        Submarine.create();
        Scientist.create(-140, 400);
        speechBubble = Text.create(315, 280, 'speechBubble', 0.15);
        nextButton = Text.createNextButton(640, 522, 0.2, actionOnClick,1);
        
        // Intro dialogue broken into individual sentences
        var content = ["Hi and welcome! ", 
        "It’s so good to meet the \nfinal member of our deep sea crew! ", 
        "I’m Pam and this is my crew of \nbioengineers.",
        "We want to study the deep sea and \nits mysterious creatures!",
        "This is our submarine!",
        "It will keep us alive in depths up \nto 13000 feet where sunlight\ncan’t reach!", 
        "It will also serve as our lab space to\nuse CRISPEE, a machine we can \nuse to bioengineer genes.",
        "Pretty handy, huh?",
        "As part of our research team, we \nalso have a scientist who is an \nexpert on deep sea \ncreatures helping us!",
        "She’s still on land, so we will use a \nradio to contact her.", 
        "If we ever want to talk to her, \nshe can tell us lots of helpful facts \nabout deep sea animals.", 
        "Well now that you’re here to help us, \nit’s time for us to board the \nsubmarine!"];

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
        
        //increment the index
        index++;

        //event loop that goes through each line of the content when next is clicked
        function actionOnClick(){
            //
            if (index === content.length){
                game.state.start('findAnglerfish');
                return;
            } 
            //at the 5th line, bring out the pointer sprite
            else if (index === 4){
                text.setText(content[index]);
                pointer = game.add.sprite(500, 200, 'pointer');
                pointer.scale.setTo(0.1, 0.1);
                index++;
            } 
            //at the 11th line, bring out the radio
            else if (index === 10){
                text.setText(content[index]);
                radio = game.add.sprite(180, 100,'radio');
                radio.scale.setTo(0.75,0.75);
                radio.animations.add('walk');
                radio.animations.play('walk', 5, true); 
                index++;
            } 
            //increase the index otherwise
            else {
                if (typeof pointer !== "undefined"){pointer.destroy();}
                if (typeof radio !== "undefined"){radio.destroy();}
                text.setText(content[index]);
                console.log(index)
                index++;
            }
        }  
    }

    var update = function(){
        Submarine.move();
        //if for debugging purposes
        if(testing) {
            BootState.updateLevel('socialBiosensor'); 
        }
    }

    return {   
        load: load,    
        create: create,
        update: update
    };

}());