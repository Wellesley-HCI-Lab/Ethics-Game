/**
 * Handles the process of inserting blocks into CRISPEE
 * @exports BlockToCrispee
 */

var BlocksToCrispee = (function() {

    var load = function() {
<<<<<<< HEAD
        game.load.image('crispee', 'images/crispee/crispeeEmpty.png');
        game.load.image('crispeeW','images/crispee/crispeeWhite.png');
=======
        game.load.image('crispee', 'images/crispee/crispee.png');
>>>>>>> 39ee356f10c885891bd7895ea99fc95f8eb8532f

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

<<<<<<< HEAD
    var createCrispeeW = function(alpha) {
 
        addSprite(0, 0, false, 'crispee', game.width, game.height);
       
    };

    /** stopDrag code from
     * https://codepen.io/jdnichollsc/pen/WbZgwM?editors=0010
     */
    // var stopDrag = function(currentSprite, endSprite, replaceWith){
    //     if (!game.physics.arcade.overlap(currentSprite, endSprite, 
    //         function() {
    //             currentSprite.input.draggable = false;
    //             currentSprite.destroy();
    //             blockIn = addScaledSprite(380, 460, false, replaceWith, 0.225); 
    //             blockIn.position.copyFrom(endSprite.position); 
    //             blockIn.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
    //   })) { currentSprite.position.copyFrom(currentSprite.originalPosition);
    //   }
    // };

    var putInCrispee = function(currentSprite, endSprite, replaceWith){
        console.log('Click registered')
        currentSprite.inputEnabled= false;
        currentSprite.destroy();
        blockIn = addScaledSprite(380, 460, false, replaceWith, 0.225); 
        blockIn.position.copyFrom(endSprite.position); 
        blockIn.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
        return blockIn;
    };

    //  /** stopDrag code from
    //  * https://codepen.io/jdnichollsc/pen/WbZgwM?editors=0010
    //  */
    // var stopDrag = function(currentSprite, endSprite){
    //     if (!game.physics.arcade.overlap(currentSprite, endSprite, 
    //         function() {
    //             currentSprite.input.draggable = false;
    //             currentSprite.position.copyFrom(endSprite.position); 
    //             currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
    //   })) { currentSprite.position.copyFrom(currentSprite.originalPosition);
    //   }
    // };

=======
>>>>>>> 39ee356f10c885891bd7895ea99fc95f8eb8532f
    return {
        load: load,
        createBlock: createBlock,
        create: create,
        createCrispeeW: createCrispeeW,
        putInCrispee: putInCrispee
    };

}());