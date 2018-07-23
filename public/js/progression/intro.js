/**
/** 
 * PROGRESSION OF STATES (updated 7/18)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js -> crispeePlay.js
 * The Intro state, where Pam and the submarine crew are 
 * introduced, and their mission is explained
 * The top of submarine is open
 * Introduce tools such as the radio and the map
 * Scientist disappears
 * Lid closes
 * @exports introState
 */

var introState = {
	// preload: function(){ FindAnglerfish.load(); },
    create: function(){ Intro.create();},
    update: function() { if(testing) BootState.updateLevel('findAnglerfish'); },
    //update: function(){ Intro.update();}
	// shutdown: function(){ FindAnglerfish.destroy(); }
}


var Intro = (function() {

    var create = function(){
        // background
        Scientist.create();
        // text Bubble - game.add.sprite(x pos, y pos);
        textBubble = game.add.sprite(-200, 170, 'textBubble');
        textBubble.scale.setTo(1.3, 1);



        ////////CONTROLS CHANGING TEXT THAT WILL BE OVERLAYED ON TEXT BUBBLE/////
        speechButton = game.add.button(500, 500, 'next', actionOnClick, this, 1, 0, 2);
        speechButton.scale.setTo(0.1, 0.1);


        // input text into chunks as you wish
        //ACTION REQUIRED: have arrow pointing to submarine, WHEN SHE SAYS 'THIS IS OUR...'
        var content = ["Hi, and welcome! ", "It’s so good to meet the final member of\n our deep sea crew! ", 
        " I’m Pam and this is my crew of bioengineers.",'We want to study the deep sea and its\n mysterious creatures!',
        'This is our submarine!', 'It will keep us alive in depths up to 13000 ft\n where sunlight can’t reach!', 
        'It will also serve as our lab space to use \nCRISPEE, a machine we can use \nto bioengineer genes.', 'Pretty handy, huh?',
        'As part of our research team, we also have\n a scientist who is an expert on\n deep creatures helping us!',
        'She’s still on land, so we use a radio\n to contact her.', 'If we ever want to talk to her, \nshe can tell us lots of helpful facts\n about deep sea animals.'
        , 'Well now that you’re here to help us,\n it’s time for us to board the submarine!'];
        // first word shown is set to the first index
        var index = 0;

        console.log(' initial dialogue ' + content[index]);

        text = game.add.text(70,400, content[index]);
        tween = game.add.tween(text);




        function actionOnClick(){
            text.destroy(); // Destroy the old text before the new one shows
        
            console.log('index before ' + index);
            console.log('original dialogue ' + content[index]);
            //text = game.add.text(20,20, content[index]);
            //tween = game.add.tween(text);
            
            //New text appears 
            game.add.tween(tween).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            //take note of index of the new word
            var newIndex = index++ ;
            console.log('after ' + index);
            console.log(' new dialogue ' + content[index]);
            //index = (index + 1) % content.length

            // Show that new text on world
            text = game.add.text(70,400, content[index]);
            tween = game.add.tween(text);
            console.log('dialogue length ' + content.length);

            //CONTROLS DIRECTIONAL POINTER//
            if (content[index] !='This is our submarine!'){
                pointer.destroy();

                } else {
                    pointer = game.add.sprite(400, 200, 'pointer');
                    pointer.scale.setTo(0.1, 0.1);
                }
            //CONTROLS DIRECTIONAL POINTER/ end/

            //CONTROLS WALKIE TALKIE ANIMATION//
            if (content[index] !='She’s still on land, so we use a radio\n to contact her.'){
                walkie.destroy();

                } else {
                    walkie = game.add.sprite(400,200,'radio');
                    walkie.scale.setTo(1,1);
                    walkie.animations.add('walk');
                    walkie.animations.play('walk', 5, true);
                }
            //CONTROLS WALKIE TALKIE ANIMATION/ end/

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
            if (index == content.length){
                 text.destroy(); //text is destroyed
                 speechButton.pendingDestroy = true; // button for text is destroyed
                 textBubble.destroy();

                 //JUST FOR NOW TO INTEGRATE ONTAP
                 speechButton = game.add.button(500, 500, 'next', onTap, this, 1, 0, 2);
                 speechButton.scale.setTo(0.1, 0.1);

                 return;
            }

        }

        ////////CONTROLS CHANGING TEXT THAT WILL BE OVERLAYED ON TEXT BUBBLE end/////




    }

    //var update = function(){
        //game.input.onTap.add(onTap, this);
    //}

    var onTap = function(){
        game.state.start('findAnglerfish');
    }



    return {       
        create: create,
        //update: update,
        onTap: onTap
    };

}());