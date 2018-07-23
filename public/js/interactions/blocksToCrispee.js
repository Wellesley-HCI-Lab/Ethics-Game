/**
 * Handles the process of inserting blocks into CRISPEE
 * @exports BlockToCrispee
 */

var BlocksToCrispee = (function() {

    var load = function() {
        game.load.image('crispee', 'images/crispee/crispeeEmpty.png');
        game.load.image('blueBlockOut', 'images/blocks/blueBlockOutResized.png')
        game.load.image('transBlue', 'images/blocks/transparent-blueBlockOut.png')

	};

    var create = function() {
        crispee = addSprite(0, 0, false, 'crispee', game.width, game.height);
        blueBlockOut = addScaledSprite(800, 400, false, 'blueBlockOut', 0.225);
        transBlue = addScaledSprite(380, 315, false, 'transBlue', 0.225);

        blueBlockOut.anchor.x = 0.5;
        blueBlockOut.anchor.x = 1;

        game.physics.arcade.enable(blueBlockOut);
        game.physics.arcade.enable(transBlue);

        blueBlockOut.inputEnabled = true;
        blueBlockOut.input.enableDrag();
        // blueBlockOut.anchor.setTo(0.5, 1);

        // blueBlockOut.input.enableSnap(100, 100, true, true);
        transBlue.inputEnabled = true;
        transBlue.anchor.x = 0.5;
        transBlue.originalPosition = transBlue.position.clone();
        // console.log(transBlue.originalPosition);
        transBlue.events.onDragStop.add(function(transBlue){
            stopDrag(transBlue, blueBlockOut);
          });

        // transBlue.input.enableDrag();

        
    };

    // stopDrag code from
    // https://codepen.io/jdnichollsc/pen/WbZgwM?editors=0010

    var stopDrag = function(currentSprite, endSprite){
        if (!game.physics.arcade.overlap(currentSprite, endSprite, 
            function() {
                currentSprite.input.draggable = false;
                currentSprite.position.copyFrom(endSprite.position); 
                currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
      })) { currentSprite.position.copyFrom(currentSprite.originalPosition);
      }
    };

    return {
        load: load,
        create: create,
        stopDrag: stopDrag
    };

}());