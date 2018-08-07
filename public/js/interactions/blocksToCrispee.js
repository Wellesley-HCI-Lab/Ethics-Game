/**
 * Handles the process of inserting blocks into CRISPEE
 * @exports BlockToCrispee
 */

var BlocksToCrispee = (function() {

    var load = function() {
        game.load.image('crispee', 'images/crispee/crispee.png');
        game.load.image('crispeeW','images/crispee/crispeeWhite.png');

        // Loads images of blocks outside CRISPEE (ON blocks only right now)
        game.load.image('blueBlockOut', 'images/blocks/blueBlockOut.png');
        game.load.image('redBlockOut', 'images/blocks/redBlockOut.png');
        game.load.image('greenBlockOut', 'images/blocks/greenBlockOnOut.png');
        game.load.image('greenOffBlockOut', 'images/blocks/greenOffBlockOut.png');

        // Loads images of blocks placed inside CRISPEE 
        // ON blocks
        game.load.image('blueBlockIn', 'images/blocks/blueBlockOnIn.png');
        game.load.image('redBlockIn', 'images/blocks/redBlockOnIn.png');
        game.load.image('greenBlockIn', 'images/blocks/greenBlockOnIn.png');
        // OFF blocks
        game.load.image('blueBlockOffIn', 'images/blocks/blueBlockOffIn.png');
        game.load.image('redBlockOffIn', 'images/blocks/redBlockOffIn.png');
        game.load.image('greenBlockOffIn', 'images/blocks/greenBlockOffIn.png');

        game.load.image('angieMagenta', 'images/anglerfish/angieMagenta.png');


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

        // blockInRedOnS = addScaledSprite(321, 313, false,'redBlockIn', 0.225)
        // blockInRedOnS.alpha =0;

        // blockInBlueOnS = addScaledSprite(232, 313, false,'blueBlockIn', 0.225);
        // blockInBlueOnS.alpha = 0;

        // blockInGreenOffS = addScaledSprite(139, 315, false,'greenBlockOffIn', 0.225);
        // blockInGreenOffS.alpha = 0;

    };

    var createCrispeeW = function(alpha) {
 
        crispw = addSprite(0, 0, false, 'crispeeW', game.width, game.height);

        blockInRedOnS = addScaledSprite(321, 313, false,'redBlockIn', 0.225)
        blockInRedOnS.alpha =0;

        blockInBlueOnS = addScaledSprite(232, 313, false,'blueBlockIn', 0.225);
        blockInBlueOnS.alpha = 0;

        blockInGreenOffS = addScaledSprite(139, 315, false,'greenBlockOffIn', 0.225);
        blockInGreenOffS.alpha = 0;
        //return crispw;
       
    };

    ////////////////////////////////////////////////////////////////////////////

    var blockOutRedOn = function(Image){
        blockOutRedOn = addScaledSprite(620, 400, false,'redBlockOut', 0.225);
        blockOutRedOn.inputEnabled = true;
        blockOutRedOn.events.onInputDown.add(blockInRedOn, this);
        return blockOutRedOn;
    };

    var blockInRedOn = function (image){
        blockOutRedOn.destroy();
        console.log(" before blockInRedOnS al " + blockInRedOnS.alpha);
        //blockInRedOn = addScaledSprite(350, 320, false,'redBlockIn', 0.225)
        blockInRedOnS.alpha = 1;
        console.log("a");
        console.log(" after blockInRedOnS al " + blockInRedOnS.alpha);
        game.time.events.add(1000, comboHandler);
        //comboHandler();
       //console.log("confirm: " + BlocksToCrispee.blockOutRedOn().x)
        return blockInRedOn; }

        ///////////////////////////// blue on ///////////////////////////////////////////

    var blockOutBlueOn = function(Image){
        blockOutBlueOn = addScaledSprite(520, 400, false,'blueBlockOut', 0.225);
        blockOutBlueOn.inputEnabled = true;
        blockOutBlueOn.events.onInputDown.add(blockInBlueOn, this);
        return blockOutRedOn;
    };

    var blockInBlueOn = function (image){
        blockOutBlueOn.destroy();
        //blockInBlueOn = addScaledSprite(400, 150, false,'blueBlockIn', 0.225);
        blockInBlueOnS.alpha = 1;
        console.log("b");
        //comboHandler();
        game.time.events.add(1000, comboHandler);
        return blockInBlueOn; }

        /////////////////////////////// green off /////////////////////////////////////////

    var blockOutGreenOff = function(Image){
        blockOutGreenOff = addScaledSprite(420, 400, false,'greenOffBlockOut', 0.225);
        blockOutGreenOff.inputEnabled = true;
        blockOutGreenOff.events.onInputDown.add(blockInGreenOff);
        return blockOutGreenOff;
    };

     var blockInGreenOff = function (image){
        blockOutGreenOff.destroy();
        //blockInGreenOff = addScaledSprite(200, 150, false,'greenBlockOffIn', 0.225);
        blockInGreenOffS.alpha = 1;
        console.log("c");
        //comboHandler();
        game.time.events.add(1000, comboHandler);
        return blockInGreenOff; };
        ////////////////////////////////////////////////////////////////////////

     comboHandler = function(){

        console.log("wot bIRO " + blockInRedOn.alpha + "blockInRedOnS al " + blockInRedOnS.alpha );

        //FIRST COMBO - RED == ON// BLUE == ON// GREEN == OFF
        if (blockInRedOnS.alpha == 1 && blockInBlueOnS.alpha == 1 && blockInGreenOffS.alpha == 1){ 
            tank = Anglerfish.createTankEnvironment();
            color = "Magenta";
            angie = addScaledSprite(300, 150, false, 'angie'+ color, 0.1);

            speechBubble = Text.create(315, 280, 'speechBubble', 0.15);
            nextButton = Text.createNextButton(640, 522, 0.2, actionOnClick,1);

            content = ["Great, you did it!", 
            "Now Angie has a biosensor\n that lights up "  + color + " \nwhen other anglerfish are near.",
            "Let’s put Angie back in the ocean,\n and see if the other fish come\n near her."];

            index = 0;
            text = game.add.text(390, 420, content[index], 
                {font: "22px Arial",
                fill: "#000000",
                align: "left"});
            text.alpha = 0;
            game.add.tween(text).to( {alpha: 1 }, 1500, Phaser.Easing.Linear.In, true);
            index++;

            console.log("get registered ");
            
            function actionOnClick(){
                if (index === content.length){
                    game.state.start('sbGame');
                    return;
                }
                text.setText(content[index]);
                index++;
            }

        } //END OF 1ST COMBO - RED == ON// BLUE == ON// GREEN == OFF

    }
                



    return {
        load: load,
        createBlock: createBlock,
        create: create,
        createCrispeeW: createCrispeeW,
        putInCrispee: putInCrispee,
        blockOutRedOn: blockOutRedOn,
        blockInRedOn: blockInRedOn,
        blockOutBlueOn: blockOutBlueOn,
        blockInBlueOn: blockInBlueOn,
        blockOutGreenOff: blockOutGreenOff,
        blockInGreenOff: blockInGreenOff,
        comboHandler: comboHandler



    };

}());