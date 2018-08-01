/**
 * Handles the process of inserting blocks into CRISPEE
 * @exports BlockToCrispee
 */

var BlocksToCrispee = (function() {

    var load = function() {
        game.load.image('crispee', 'images/crispee/crispee.png');

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


    // var putInCrispee = function(currentSprite, endSprite, replaceWith){
    //     console.log('Click registered')
    //     currentSprite.inputEnabled= false;
    //     currentSprite.destroy();
    //     blockIn = addScaledSprite(380, 460, false, replaceWith, 0.225); 
    //     blockIn.position.copyFrom(endSprite.position); 
    //     blockIn.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
    //     return blockIn;
    // };
    
    
    // function createBlocks(blockImg, X, Y, scale, isNotTransparent, transBlock, blockIn){
    //     sprite = addScaledSprite(X, Y, false, blockImg, scale);
    //     sprite.anchor.setTo(0.5, 1);
    //     game.physics.arcade.enable(sprite);
    //     if (isNotTransparent){
    //         sprite.alpha = 1;
    //         sprite.inputEnabled = true;
    //         sprite.input.enableDrag();
    //         sprite.originalPosition = sprite.position.clone();
    //         sprite.events.onDragStop.add(function(currentSprite){
    //             stopDrag(currentSprite, transBlock, blockIn);
    //           }, this);
    //     } else {
    //         sprite.alpha = 0; 
    //     }
    //     return sprite;

    // }

    // function createBlocks(blockImg, X, Y, scale, isNotTransparent, transBlock, blockIn){
    //     sprite = addScaledSprite(X, Y, false, blockImg, scale);
    //     sprite.anchor.setTo(0.5, 1);
    //     game.physics.arcade.enable(sprite);
    //     if (isNotTransparent){
    //         sprite.alpha = 1;
    //         sprite.inputEnabled = true;
    //         // sprite.input.enableDrag();
    //         sprite.originalPosition = sprite.position.clone();
    //         // sprite.events.onDragStop.add(function(currentSprite){
    //         //     stopDrag(currentSprite, transBlock, blockIn);
    //         //   }, this);
    //         sprite.events.onInputDown.add(function(currentSprite){
    //             putInCrispee(currentSprite, transBlock, blockIn);
    //         }, this);
    //     } else {
    //         sprite.alpha = 0; 
    //     }
    //     return sprite;
    // }

    var create = function(alpha) {
        
        crispee = addSprite(0, 0, false, 'crispee', game.width, game.height);
        // blocks = game.add.group();
        // transBlocks = game.add.group();

        // // creates transparent block representing where the block is supposed to go
        // transBlue = createBlocks('blueBlockIn', 385, 438, 0.1, false);
        // transRed = createBlocks('redBlockIn', 293, 442, 0.1, false);
        // transGreen = createBlocks('greenBlockIn', 201, 452, 0.1, false );

        // // actual blocks that the user moves
        // blueBlockOut = createBlocks('blueBlockOut', 720, 550, 0.225, true, transBlue, 'blueBlockIn');
        // redBlockOut = createBlocks('redBlockOut', 620, 550, 0.225, true, transRed, 'redBlockIn');
        // greenBlockOut = createBlocks('greenBlockOut', 520, 550, 0.225, true, transGreen, 'greenBlockIn');
        // blocks.add(blueBlockOut); blocks.add(redBlockOut); blocks.add(greenBlockOut);
        // transBlocks.add(transBlue); transBlocks.add(transRed); transBlocks.add(transGreen);
        // blocks.setAll("alpha", alpha); transBlocks.setAll("alpha", 0);
        // return [blocks, transBlocks];
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

    return {
        load: load,
        createBlock: createBlock,
        create: create,
        putInCrispee: putInCrispee
        // stopDrag: stopDrag
    };

}());