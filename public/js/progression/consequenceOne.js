

var consequenceOneState = {
    preload: function() { ConsequenceOneState.preload();},
    create: function() { ConsequenceOneState.create();}
}

var ConsequenceOneState = (function() {

    var preload = function() {
        game.load.image('subSurrounded', 'images/anglerfish/subSurrounded');
    }

    var create = function(){
        subSurrounded = addSprite(0, 0, 'subSurrounded', false, game.height, game.width);
    }

    return {  
        preload: preload,     
        create: create
    };



}());