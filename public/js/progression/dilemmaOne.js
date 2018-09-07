/**
 * PROGRESSION OF STATES (updated 7/24)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js -> learn.js ->  dilemmaOne.js -> crispeePlay.js
 * State where user is presented with the first ethical dilemma
 * @exports dilemmaOneState
 */

var dilemmaOneState = {
    load: function(){ DilemmaOneState.load();},
    create: function(){ DilemmaOneState.create(); },
    update: function() {if(testing) BootState.updateLevel('crispeePlay');}
}

var radio;
    /**
     * This player's name (taken from the name input field)
     * @memberOf module:IconSelect - nope 
     * @type {string}
     */
var rename;
var nameEntryBox;
var getFishName;
var index;
var content;
var nameButton;
var name = 'Angie';

//load the Anglerfish
var DilemmaOneState = (function() {
    var load = function(){
     Anglerfish.load();
    }

    var create = function(){
    //create all the objects
     Anglerfish.createTankEnvironment(); 
     Scientist.create(-140, 400);
     speechBubble = Text.create(315, 280, 'speechBubble', 0.15);
     nextButton = Text.createNextButton(640, 522, 0.2, actionOnClick,1); 

     //add the swim sprite
     swim = game.add.sprite(280, 200,'swim');
     swim.scale.setTo(0.3,0.3);
     swim.animations.add('walk');
     swim.animations.play('walk', 1.5, true);

     //add the radio sprite, hide it
     radio = game.add.sprite(380, 100,'radio');
     radio.scale.setTo(0.75,0.75);
     radio.animations.add('walk');
     radio.animations.play('walk', 5, true);
     radio.alpha = 0;

     //add the nameing the fish box,hide it
     rename = game.add.sprite(35, 0, 'rename');
     rename.alpha = 0;

     game.add.plugin(PhaserInput.Plugin);

     content =["We can see that this fish has\n a lure, but it doesn’t seem to\n be glowing.",
     "This fish might not be able to\n light up on its own.",
     "This is a chance to learn more\n about deep sea creatures\n and to help this anglerfish!",
     "We know that this is a \nfemale anglerfish because of\n its size",
     "Female anglerfish are\n very large in size.",
     "Maybe we should give this \nanglerfish a name?",
     name + " is a great name!!",
     "We can use our CRISPEE machine\n to genetically modify " + name + "'s genes\n so that she can light up",
     "Let’s go over to our \nCRISPEE machine and see \nwhat we can do."
     ];

     index = 0;

     //add the text, format it, and hide it
     text = game.add.text(390, 420, content[index], 
            {font: "22px Arial",
            fill: "#000000",
            align: "left"});
     text.alpha = 0;

     //tween for the text
     game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
     index++;

     //callback for next button
     function actionOnClick(){
            //go to crispeePlay at the end of content dialogues
            if (index === content.length){
                game.state.start('crispeePlay');
                return;
            } 
            //name fish box appears in the 4th index
            if (index === 4){
                rename.alpha = 1;
                rename.scale.setTo(0.3, 0.3);
                nameEntryBox = game.add.inputField(412, 112, {
                        font: '32px Arial',
                        fontWeight: 'bold',
                        width: 300,
                        height: 50,
                        borderColor: "#eeeeee",
                        //placeHolder: 'Angie',
                    });
                nameEntryBox.startFocus();
                //name = nameEntryBox.text.text;
                nameButton = Text.createNameButton(200, 75, 0.2, nameHandle,1); 
                text.setText(content[index]);
                index++;
            } if (index == 3 || index == 4){
                text.setText(content[index]);
                radio.alpha = 1;
                index++; 
            } else {
                radio.alpha = 0;
                text.setText(content[index]);
                console.log(index);
                index++;
            }

        }// end of actionOnClick

    //callback function for name box
    //collect children input and make it the name globally
     function nameHandle(){
        //name = nameEntryBox.text.text;
        if (nameEntryBox.text.text == 'Angie'){
           name = "Bob";
            console.log(" name changed " + name);
        }
        else{
            name = nameEntryBox.text.text
            console.log(" unique name " + name);
        }

        console.log("nameHandled " + name);

        destroyBox();

     }

     function destroyBox(){
        nameEntryBox.destroy();
        rename.alpha = 0;
        nameButton.pendingDestroy = true;
     }
    } // end of create function

    return { 
        load: load,      
        create: create,
    };

}());