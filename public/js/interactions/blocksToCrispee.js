/**
 * Handles the process of inserting blocks into CRISPEE
 * @exports BlockToCrispee
 */

var BlocksToCrispee = (function() {

    var load = function() {
        game.load.image('crispee', 'images/crispee/crispeeEmpty.png');
        game.load.image('crispeeW','images/crispee/crispeeWhite.png');

        // Loads images of blocks outside CRISPEE (ON blocks only right now)
        game.load.image('blueBlockOut', 'images/blocks/blueBlockOut.png');
        game.load.image('redBlockOut', 'images/blocks/redBlockOut.png');
        game.load.image('greenBlockOut', 'images/blocks/greenBlockOnOut.png');

        // Loads images of blocks placed inside CRISPEE 
        // ON blocks
        game.load.image('blueBlockIn', 'images/blocks/blueBlockOnIn.png');
        game.load.image('redBlockIn', 'images/blocks/redBlockOnIn.png');
        game.load.image('greenBlockIn', 'images/blocks/greenBlockOnIn.png');
        // OFF blocks
        game.load.image('blueBlockOffIn', 'images/blocks/blueBlockOffIn.png');
        game.load.image('redBlockOffIn', 'images/blocks/redBlockOffIn.png');


    };

    var createBlock = function(blockImg, X, Y, scale, blockInImg, blockInX, blockInY, blockInScale) {
        blockOut = addScaledSprite(X, Y, false, blockImg, scale);
        blockOut.inputEnabled = true;
        blockOut.events.onInputDown.add(function(){
            putInCrispee(blockOut, blockInImg, blockInX, blockInY, blockInScale);
        }, this);
        return blockOut;
    }

    var putInCrispee= function (blockOut, img, X, Y, scale){
        console.log('Click registered on blockOut.');
        blockOut.destroy();
        blockIn = addScaledSprite(X, Y, false, img, scale);
        return blockIn;
    }

    var create = function(alpha) {
        
        crispee = addSprite(0, 0, false, 'crispee', game.width, game.height);
    };

    var createCrispeeW = function(alpha) {
 
        crispw = addSprite(0, 0, false, 'crispee', game.width, game.height);
       
    };



    return {
        load: load,
        createBlock: createBlock,
        create: create,
        createCrispeeW: createCrispeeW,
        putInCrispee: putInCrispee
    };

}());