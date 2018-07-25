/**
 * Handles the process of inserting blocks into CRISPEE
 * @exports BlockToCrispee
 */

var BlocksToCrispee = (function() {

    var load = function() {
        game.load.image('crispee', 'images/crispee/crispeeEmpty.png');
        game.load.image('blueBlockOut', 'images/blocks/blueBlockOutResized.png')
        game.load.image('transBlue', 'images/blocks/transparent-blueBlockOut.png')
        game.load.image('blueBlockIn', 'images/blocks/blueBlockIn.png')

	};

    var create = function() {
        crispee = addSprite(0, 0, false, 'crispee', game.width, game.height);

        // transparent blue block representing where the block is supposed to go
        transBlue = addScaledSprite(385, 438, false, 'blueBlockIn', 0.1);
        transBlue.alpha = 0.1; 
        transBlue.anchor.setTo(0.5, 1);
        game.physics.arcade.enable(transBlue);
        // actual blue block that the user moves
        blueBlockOut = addScaledSprite(800, 400, false, 'blueBlockOut', 0.225);
        blueBlockOut.anchor.x = 0.5;
        game.physics.arcade.enable(blueBlockOut);
        blueBlockOut.inputEnabled = true;
        blueBlockOut.input.enableDrag();
        blueBlockOut.originalPosition = blueBlockOut.position.clone();
        blueBlockOut.events.onDragStop.add(function(currentSprite){
            stopDrag(currentSprite, transBlue, 'blueBlockIn');
          }, this);
    };

    /** stopDrag code from
     * https://codepen.io/jdnichollsc/pen/WbZgwM?editors=0010
     */
    var stopDrag = function(currentSprite, endSprite, replaceWith){
        if (!game.physics.arcade.overlap(currentSprite, endSprite, 
            function() {
                currentSprite.input.draggable = false;
                currentSprite.destroy();
                blockIn = addScaledSprite(380, 460, false, 'blueBlockIn', 0.225); 
                blockIn.position.copyFrom(endSprite.position); 
                blockIn.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
      })) { currentSprite.position.copyFrom(currentSprite.originalPosition);
      }
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

    return {
        load: load,
        create: create,
        stopDrag: stopDrag
    };

}());