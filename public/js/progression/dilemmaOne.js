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

var DilemmaOneState = (function() {

    var load = function(){
      Anglerfish.load();
    }

    var create = function(){
     Anglerfish.createTankEnvironment();  

     swim = game.add.sprite(280, 200,'swim');
     swim.scale.setTo(0.3,0.3);
     swim.animations.add('walk');
     swim.animations.play('walk', 1.5, true);  
    }

    return { 
        load: load,      
        create: create,
    };

}());