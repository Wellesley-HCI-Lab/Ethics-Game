/**
 * Exports GlowingAnglerfish object
 * @exports GlowingAnglerfish
 */


var GlowingAnglerfish = ( function () {
    /**
     * Loads images for the glow animation and Angie's 
     * appearance when glow is clicked
     * @memberOf module:GlowingAnglerfish
     */
    var load = function() {
        game.load.image('smallGlow', 'images/anglerfish/yellow-glow.png')
        game.load.image('angieAppears', 'images/anglerfish/angieAppears-transparent.png')


    }

    var create = function() {
        // addSprite(0, 0, false, 'smallGlow', game.width, game.height);
        smallGlow = addSprite(600, 200, false, 'smallGlow', 100, 100);
        angieAppears = addScaledSprite(200, 100, false, 'angieAppears', 0.1);
        angieAppears.alpha = 0.0;
        smallGlow.inputEnabled = true;
        // smallGlow.events.onInputDown.add(showAngie, this);
    }

    var update = function() {

    // Adds a small glowing ball to the screen and tweens it to move from back and forth
    // Shows the image of Angie when clicked
        if (smallGlow.x === 100)
        {
            // TODO: Add an elliptical curve based on the following tutorials
            // https://phaser.io/phaser3/devlog/99 
            // https://www.emanueleferonato.com/2015/08/21/playing-with-phaser-tweens-and-bezier-curves/

            game.add.tween(smallGlow).to( { x: '+500' }, 2500, Phaser.Easing.Linear.None, true);
        }
        else if (smallGlow.x === 600)
        {
            game.add.tween(smallGlow).to( { x: '-500' }, 2500, Phaser.Easing.Linear.None, true);
        }

        smallGlow.events.onInputDown.add(showAngie, this);

    }

    var showAngie = function(){
        smallGlow.destroy();
        game.add.tween(angieAppears).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true, 0);

    }

    

    var destroy = function() {}

    return {
        load: load,
        create: create,
        update: update,
        showAngie: showAngie
    };





}());
