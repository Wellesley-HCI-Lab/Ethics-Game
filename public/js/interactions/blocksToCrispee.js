/**
 * Handles the process of inserting blocks into CRISPEE
 * @exports BlockToCrispee
 */

var BlocksToCrispee = (function() {

    var load = function() {
        game.load.image('crispee', 'images/crispee/crispeeEmpty.png');
        game.load.image('blueBlockOut', 'images/blocks/blueBlockOut.png')
	};

    var create = function() {
        addSprite(0, 0, false, 'crispee', game.width, game.height);
        addSprite(0, 0, false, 'blueBlockOut', game.width, game.height);

    };

    return {
        load: load,
        create: create
    };

}());