/**
 * PROGRESSION OF STATES (updated 9/21)
 * boot.js -> load.js -> intro.js -> findAnglerfish.js ->  dilemmaOne.js -> crispeePlay.js -> socialBiosensor.js -> sbGame.js
 * State where user is presented with the first ethical dilemma
 * @exports dilemmaOneState
 */

var dilemmaOneState = {
    load: function(){ DilemmaOneState.load();},
    create: function(){ DilemmaOneState.create(); },
    update: function(){ BootState.updateLevel('findAnglerfish','crispeePlay'); }
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

     //add the nameing the fish box,hide it
     //rename = game.add.sprite(35, 0, 'rename');
     //rename.alpha = 0;

     game.add.plugin(PhaserInput.Plugin);

     content =["We can see that this fish has\na lure, but it doesn’t seem to\nbe glowing.",//0
     "This fish might not be able to\nlight up on its own.",//1
     "This is a chance to learn more\nabout deep sea creatures\nand to help this anglerfish!",//2
     "Maybe we should give this anglerfish\na name?",//3
     name + " is a great name!",//4
     "We can use a tool to help Angie by\nchanging her genes to let her lure\nlight up.",
     "Let’s go over to our lab and see what\nwe can do."
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
            switch(index){
                //fish box appears
                case 3:
                    //name not working right now
                    /*
                    rename.alpha = 1;
                    rename.scale.setTo(0.3, 0.3);
                    nameEntryBox = game.add.inputField(412, 112, {
                            font: '32px Arial',
                            fontWeight: 'bold',
                            width: 300,
                            height: 50,
                            borderColor: "#eeeeee"
                        });
                    nameEntryBox.startFocus();
                    //name = nameEntryBox.text.text;
                    nameButton = Text.createNameButton(200, 75, 0.2, nameHandle,1); 
                    */
                    text.setText(content[index]);
                    index++;
                    break;
                case (content.length):
                    addSprite(0, 0, false, 'stop1', game.width, game.height);
                    next = Text.createNextButton(350, 400, 0.2, function(){
                        game.state.start('crispeePlay');
                     }, 1);
                    break;
                default:
                    text.setText(content[index]);
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
        create: create
    };

}());