/**
 * Handles the process of inserting blocks into CRISPEE
 * @exports BlockToCrispee
 */

 var color;

var BlocksToCrispee = (function() {

    var load = function() {
        game.load.image('crispee', 'images/crispee/crispee.png');
        game.load.image('crispeeW','images/crispee/crispeeWhite.png');

        // Loads images of blocks outside CRISPEE -ON
        game.load.image('blueBlockOut', 'images/blocks/blueBlockOut.png');
        game.load.image('redBlockOut', 'images/blocks/redBlockOut.png');
        game.load.image('greenBlockOut', 'images/blocks/greenBlockOnOut.png');
        //Loads images of blocks outside CRISPEE -OFF
        game.load.image('greenOffBlockOut', 'images/blocks/greenOffBlockOut.png');
        game.load.image('blueBlockOffOut', 'images/blocks/blueBlockOffOut.png');
        game.load.image('redBlockOffOut', 'images/blocks/redBlockOffOut.png');


        // Loads images of blocks placed inside CRISPEE 
        // ON blocks
        game.load.image('blueBlockIn', 'images/blocks/blueBlockOnIn.png');
        game.load.image('redBlockIn', 'images/blocks/redBlockOnIn.png');
        game.load.image('greenBlockIn', 'images/blocks/greenBlockOnIn.png');
        // OFF blocks
        game.load.image('blueBlockOffIn', 'images/blocks/blueBlockOffIn.png');
        game.load.image('redBlockOffIn', 'images/blocks/redBlockOffIn.png');
        game.load.image('greenBlockOffIn', 'images/blocks/greenBlockOffIn.png');

        //combo Outcomes
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


        blockInBlueOnS = addScaledSprite(140, 313, false,'blueBlockIn', 0.225);
        blockInBlueOnS.alpha = 0;

        blockInGreenOnS = addScaledSprite(232, 313, false,'greenBlockIn', 0.225);
        blockInGreenOnS.alpha = 0;

        
        blockInRedOffS = addScaledSprite(321, 313, false,'redBlockOffIn', 0.225);
        blockInRedOffS.alpha = 0;

        blockInBlueOffS = addScaledSprite(140, 313, false,'blueBlockOffIn', 0.225);
        blockInBlueOffS.alpha = 0;

        blockInGreenOffS = addScaledSprite(232, 313, false,'greenBlockOffIn', 0.225);
        blockInGreenOffS.alpha = 0;

        


        //return crispw;
       
    };

    //////////////////////////////// red on ////////////////////////////////////////////

    var blockOutRedOn = function(Image){
        blockOutRedOn = addScaledSprite(720, 400, false,'redBlockOut', 0.225);
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
        game.time.events.add(1000, pText);
        if (blockInRedOffS.alpha == 1){
            //console.log("check2 after: " + blockInBlueOnS.alpha);
            blockInRedOffS.alpha = 0;
            BlocksToCrispee.blockOutRedOff();
        }
        //comboHandler();
       //console.log("confirm: " + BlocksToCrispee.blockOutRedOn().x)
        return blockInRedOn; }

        ///////////////////////////// red OFF /////////////////////////////
    var blockOutRedOff = function(image){
        blockOutRedOff = addScaledSprite(720, 300, false,'redBlockOffOut', 0.225);
        blockOutRedOff.inputEnabled = true;
        blockOutRedOff.events.onInputDown.add(blockInRedOff, this);
        return blockOutRedOff;
    }

    var blockInRedOff = function(image){
        blockOutRedOff.destroy();
        blockInRedOffS.alpha = 1;
        //console.log("d");
        //game.time.events.add(1000, comboHandler);
        //check if other allele is in position
        //console.log("check2 before: " + blockInBlueOnS.alpha);
        if (blockInRedOnS.alpha == 1){
            //console.log("check2 after: " + blockInBlueOnS.alpha);
            blockInRedOnS.alpha = 0;
            BlocksToCrispee.blockOutRedOn();
        }
        return blockInRedOff;
    }

        ///////////////////////////// blue on ///////////////////////////////////////////

    var blockOutBlueOn = function(Image){
        blockOutBlueOn = addScaledSprite(620, 400, false,'blueBlockOut', 0.225);
        blockOutBlueOn.inputEnabled = true;
        blockOutBlueOn.events.onInputDown.add(blockInBlueOn, this);
        return blockOutBlueOn;
    };

    var blockInBlueOn = function (image){
        blockOutBlueOn.destroy();
        //blockInBlueOn = addScaledSprite(400, 150, false,'blueBlockIn', 0.225);
        blockInBlueOnS.alpha = 1;
        console.log("b");
        //comboHandler();
        console.log("check2 before: " + blockInBlueOffS.alpha);
        if (blockInBlueOffS.alpha == 1){
            console.log("check2 after: " + blockInBlueOffS.alpha);
            blockInBlueOffS.alpha = 0;
            BlocksToCrispee.blockOutBlueOff();
        }
        game.time.events.add(1000, pText);
        return blockInBlueOn; }

        ///////////////////////////// blue OFF /////////////////////////////////////////////

    var blockOutBlueOff = function(image){
        blockOutBlueOff = addScaledSprite(620, 300, false,'blueBlockOffOut', 0.225);
        blockOutBlueOff.inputEnabled = true;
        blockOutBlueOff.events.onInputDown.add(blockInBlueOff, this);
        return blockOutBlueOff;
    }

    var blockInBlueOff = function(image){
        blockOutBlueOff.destroy();
        blockInBlueOffS.alpha = 1;
        console.log("d");
        //game.time.events.add(1000, comboHandler);
        //check if other allele is in position
        console.log("check2 before: " + blockInBlueOnS.alpha);
        if (blockInBlueOnS.alpha == 1){
            console.log("check2 after: " + blockInBlueOnS.alpha);
            blockInBlueOnS.alpha = 0;
            BlocksToCrispee.blockOutBlueOn();
        }
        return blockInBlueOff;
    }
        /////////////////////////////// green on //////////////////////////////////////////
    var blockOutGreenOn = function(Image){
        blockOutGreenOn = addScaledSprite(520, 300, false,'greenBlockOut', 0.225);
        blockOutGreenOn.inputEnabled = true;
        blockOutGreenOn.events.onInputDown.add(blockInGreenOn, this);
        return blockOutGreenOn;
    };

    var blockInGreenOn = function (image){
        blockOutGreenOn.destroy();
        console.log(" before blockInRedOnS al " + blockInRedOnS.alpha);
        //blockInRedOn = addScaledSprite(350, 320, false,'redBlockIn', 0.225)
        blockInGreenOnS.alpha = 1;
        console.log("a");
        console.log(" after blockInRedOnS al " + blockInRedOnS.alpha);
        //game.time.events.add(1000, comboHandler);
        if (blockInGreenOffS.alpha == 1){
            //console.log("check2 after: " + blockInBlueOnS.alpha);
            blockInGreenOffS.alpha = 0;
            BlocksToCrispee.blockOutGreenOff();
        }
        //comboHandler();
       //console.log("confirm: " + BlocksToCrispee.blockOutRedOn().x)
        return blockInGreenOn; }

        /////////////////////////////// green OFF /////////////////////////////////////////

    var blockOutGreenOff = function(Image){
        blockOutGreenOff = addScaledSprite(520, 400, false,'greenOffBlockOut', 0.225);
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
        game.time.events.add(1000, pText);
        if (blockInGreenOnS.alpha == 1){
            //console.log("check2 after: " + blockInBlueOnS.alpha);
            blockInGreenOnS.alpha = 0;
            BlocksToCrispee.blockOutGreenOn();
        }
        return blockInGreenOff; };
        ////////////////////////////////////////////////////////////////////////

    pText = function(){
        //bubble = Text.create(30, -60, 'speechLong', 0.11);
        
        // text = game.add.text(65, 30, content[index], 
        //             {font: "22px Arial",
        //             fill: "#000000",
        //             align: "left"});
        mixButton = Text.createNextButton(200, 500, 0.2, comboHandler,1);
    }

     comboHandler = function(){

        comboHandlerText = function(){
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

        } // End of comboHandlerText

        //console.log("wot bIRO " + blockInRedOn.alpha + "blockInRedOnS al " + blockInRedOnS.alpha );

        //FIRST COMBO - RED == ON// BLUE == ON// GREEN == OFF --> MAGENTA
        if (blockInRedOnS.alpha == 1 && blockInBlueOnS.alpha == 1 && blockInGreenOffS.alpha == 1){ 
            tank = Anglerfish.createTankEnvironment();
            color = "Magenta";
            angie = addScaledSprite(300, 150, false, 'angie'+ color, 0.1);

            comboHandlerText();
        } //END OF 1ST COMBO - RED == ON// BLUE == OFF// GREEN == OFF


        ////2nd COMBO - RED == Off// BLUE == ON// GREEN == ON --> CYAN
         if (blockInRedOffS.alpha == 1 && blockInBlueOnS.alpha == 1 && blockInGreenOnS.alpha == 1){
            tank = Anglerfish.createTankEnvironment();
            color = "Cyan";
            angie = addScaledSprite(300, 150, false, 'angie'+ color, 0.1);

            comboHandlerText();
         } // END OF 2ND COMBO


         ////3Rd COMBO - RED == ON// BLUE == ON// GREEN == OFF
         if (blockInRedOnS.alpha == 1 && blockInBlueOffS.alpha == 1 && blockInGreenOnS.alpha == 1){
            tank = Anglerfish.createTankEnvironment();
            color = "Yellow";
            angie = addScaledSprite(300, 150, false, 'angie'+ color, 0.1);

            comboHandlerText();
         } // END OF 3RD COMBO


         ////4TH COMBO - RED == ON// BLUE == ON// GREEN == ON --> WHITE
         if (blockInRedOnS.alpha == 1 && blockInBlueOnS.alpha == 1 && blockInGreenOnS.alpha == 1){
            tank = Anglerfish.createTankEnvironment();
            color = "White";
            angie = addScaledSprite(300, 150, false, 'angie'+ color, 0.1);

            comboHandlerText();
         }// END OF 4TH COMBO

         //ToDo: MISSING ART: angieRed, angieBlue, and angieGreen

    }

                



    return {
        load: load,
        createBlock: createBlock,
        create: create,
        createCrispeeW: createCrispeeW,
        putInCrispee: putInCrispee,
        blockOutRedOn: blockOutRedOn,
        blockInRedOn: blockInRedOn,
        blockOutRedOff: blockOutRedOff,
        blockInRedOff: blockInRedOff,
        blockOutBlueOn: blockOutBlueOn,
        blockInBlueOn: blockInBlueOn,
        blockOutBlueOff: blockOutBlueOff,
        blockInBlueOff: blockInBlueOff,
        blockOutGreenOn: blockOutGreenOn,
        blockInGreenOn: blockInGreenOn,
        blockOutGreenOff: blockOutGreenOff,
        blockInGreenOff: blockInGreenOff,
        pText: pText,
        comboHandler: comboHandler



    };

}());