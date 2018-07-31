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

var DilemmaOneState = (function() {


    var load = function(){
      Anglerfish.load();
    }

    var create = function(){
     Anglerfish.createTankEnvironment(); 
     Scientist.create();
     speechBubble = Text.create(315, 280, 'speechBubble', 0.15);
     nextButton = Text.createNextButton(640, 522, 0.2, actionOnClick,1); 

     swim = game.add.sprite(280, 200,'swim');
     swim.scale.setTo(0.3,0.3);
     swim.animations.add('walk');
     swim.animations.play('walk', 1.5, true);

     radio = game.add.sprite(380, 100,'radio');
     radio.scale.setTo(0.75,0.75);
     radio.animations.add('walk');
     radio.animations.play('walk', 5, true);
     radio.alpha = 0;

     var content =["We can see that this fish has\n a lure, but it doesn’t seem to\n be glowing.",
     "This fish might not be able to\n light up on its own.",
     "This is a chance to learn more\n about deep sea creatures\n and to help this anglerfish!",
     "We know that this is a \nfemale anglerfish because of\n its size",
     "female anglerfish are\n very large in size.",
     "Maybe we should give this \nanglerfish a name?"
     ];

     index = 0;
     text = game.add.text(390, 420, content[index], 
            {font: "22px Arial",
            fill: "#000000",
            align: "left"});
     text.alpha = 0;
     game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
     index++;

     function actionOnClick(){
            if (index === content.length){
                game.state.start('crispeePlay');
                return;
            } else if (index ==3 || index == 4){
                text.setText(content[index]);
                radio.alpha = 1;  
                index++; 
            } else {
                radio.alpha = 0;
                text.setText(content[index]);
                console.log(index)
                index++;
            }
        }  
    }

    return { 
        load: load,      
        create: create,
    };

}());