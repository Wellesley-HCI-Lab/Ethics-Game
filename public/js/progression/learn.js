/**
 * The Learn state, where the user gets explore facts about Anglerfish
 * @exports learnState
 */

var learnState = {
    create: function(){ LearnState.create();},
    update: function(){ LearnState.update();}
}

var LearnState = (function() {

    var create = function(){
        Anglerfish.create();
    }

    var update = function(){
        game.input.onTap.add(onTap, this);
    }

    var onTap = function(){
        game.state.start('crispeePlay');
    }

    return {       
        create: create,
        update: update,
        onTap: onTap
    };

}());