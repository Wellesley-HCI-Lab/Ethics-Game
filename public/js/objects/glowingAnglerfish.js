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
        angieAppears = addScaledSprite(0, 0, false, 'angieAppears', 0.1);
        angieAppears.alpha = 0.0;
        smallGlow.inputEnabled = true;
        // smallGlow.events.onInputDown.add(showAngie, this);
    }

    var update = function() {

        if (smallGlow.x === 100)
        {
            //	Here you'll notice we are using a relative value for the tween.
            //	You can specify a number as a string with either + or - at the start of it.
            //	When the tween starts it will take the sprites current X value and add +300 to it.

            // TODO: Add an elliptical curve based on the following tutorials
            // https://phaser.io/phaser3/devlog/99 
            // https://www.emanueleferonato.com/2015/08/21/playing-with-phaser-tweens-and-bezier-curves/

            game.add.tween(smallGlow).to( { x: '+500' }, 2000, Phaser.Easing.Linear.None, true);
        }
        else if (smallGlow.x === 600)
        {
            game.add.tween(smallGlow).to( { x: '-500' }, 2000, Phaser.Easing.Linear.None, true);
        }

        smallGlow.events.onInputDown.add(showAngie, this);

    }

    var showAngie = function(){
        smallGlow.destroy();
        // game.add.tween(angieAppears).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        game.add.tween(angieAppears).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);

    }

    

    var destroy = function() {}

    return {
        load: load,
        create: create,
        update: update,
        showAngie: showAngie
    };





}());
