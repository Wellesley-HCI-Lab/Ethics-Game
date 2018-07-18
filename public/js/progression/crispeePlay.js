/**
 * The crispeePlay state
 * @exports findAnglerfishState
 */

var crispeePlayState = {
    create: function(){ CrispeePlay.create(); },
    // update: function(){ CrispeePlay.update()}
}

var CrispeePlay = (function() {

    var create = function(){
    
        Crispee.create();

    }


    // var destroy = function(){

    // }

    return {       
        create: create,
        // update: update
    };

}());