/**
 * Replaces a character at a particular index in a string
 * 
 * @param {string} string String in which to do the replacement
 * @param {number} index Character's index in the string
 * @param {string} replacement Character that will take string[index]'s place
 * @return {string} Copy of the string with the appropriate replacement
 */
function copyWithReplacedCharAt(string, index, replacement) {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}

/**
 * Fisher-Yates Shuffle
 * 
 * @param {Array} array Array to shuffle
 * @return {Array} Shuffled array
 */
function shuffle(array) {
  var curIndex = array.length;
  var tempValue;
  var randIndex;

  // While there remain elements to shuffle...
  while (0 !== curIndex) {

    // Pick a remaining element...
    //randIndex = Math.floor(Math.random() * curIndex);
    randIndex = Math.floor(syncRand() * curIndex);
    curIndex--;

    // And swap it with the current element.
    tempValue = array[curIndex];
    array[curIndex] = array[randIndex];
    array[randIndex] = tempValue;
  }

  return array;
}

/** 
 * Seed used for syncronized randomization
 * @constant
 * @type {number}
 * @default
 */
var syncRandz = 3;
/**
 * A simple Linear Congruential Generator; Use this instead of built-in random for syncing purposes
 * @return {number} Syncronized random number
 */
function syncRand() {
    // Establish the parameters of the generator
    var m = 25;
    // a - 1 should be divisible by m's prime factors
    var a = 11;
    // c and m should be co-prime
    var c = 17;
    // define the recurrence relationship
    syncRandz = (a * syncRandz + c) % m;
    // return an integer
    return syncRandz/m;
};

/**
 * Reset the seed used for randomization
 */
function resetSyncRand() {
    suffleRandz = 3;
}

/**
 * Helper function for sprite creation. This is only ever called by addSprite and addScaledSprite.
 * 
 * @param {number} x Sprite's x position
 * @param {number} y Sprite's y position
 * @param {string} img Resource name of image
 * @param {Group} [group] Group to which this sprite should be added
 * @param {boolean} [isAnchorAtCenter] Is the sprite anchored at it's center (vs it's upper left corner)?
 * @return {Sprite} New sprite
 */
function addSpriteHelper(x, y, img, group, isAnchorAtCenter) {
    var ans;
    if(group == undefined || group == game) {
        ans = game.add.sprite(x, y, img);
    } else {
        ans = group.create(x, y, img);
    }
    if(isAnchorAtCenter) ans.anchor.setTo(0.5, 0.5);
    return ans;
}

/**
 * Adds a sprite of particular width/height
 * 
 * @param {number} x Sprite's x position
 * @param {number} y Sprite's y position
 * @param {boolean} isPositionBasedOnWorldSize Are x and y scales to be multiplied by the world size (vs absolute values)?
 * @param {string} img Resource name of image
 * @param {number} [w] Width of sprite
 * @param {number} [h] Height of sprite
 * @param {Group} [group] Group to which this sprite should be added
 * @param {boolean} [isAnchorAtCenter] Is the sprite anchored at it's center (vs it's upper left corner)?
 * @return {Sprite} New sprite
 */
function addSprite(x, y, isPositionBasedOnWorldSize, img, w, h, group, isAnchorAtCenter) {
  // group - if undefined - then will add to game world, the isAnchorAtCenter is also optional
    if(isPositionBasedOnWorldSize) {
        x *= game.world.width;
        y *= game.world.height;
    }
    var ans = addSpriteHelper(x, y, img, group, isAnchorAtCenter)
    if(w != undefined) {
        ans.width = w;
        ans.height = h;
    }
    return ans;
}

/**
 * Adds a sprite scaled a particular amount from its default size
 * 
 * @param {number} x Sprite's x position
 * @param {number} y Sprite's y position
 * @param {boolean} isPositionBasedOnWorldSize Are x and y scales to be multiplied by the world size (vs absolute values)?
 * @param {string} img Resource name of image
 * @param {number} scale Sprite's scale
 * @param {Group} [group] Group to which this sprite should be added
 * @param {boolean} [isAnchorAtCenter] Is the sprite anchored at it's center (vs it's upper left corner)?
 * @return {Sprite} New sprite
 */
function addScaledSprite(x, y, isPositionBasedOnWorldSize, img, scale, group, isAnchorAtCenter) {
    if(isPositionBasedOnWorldSize) {
        x *= game.world.width;
        y *= game.world.height;
    }
    var ans = addSpriteHelper(x, y, img, group, isAnchorAtCenter)
    ans.scale.setTo(scale, scale);
    return ans;
}

// Unfortunately, copying a sprite is not built in to Phaser.IO
/**
 * Adds a copy of a sprite
 *
 * @param {Sprite} origSprite Original sprite
 * @param {number} x New sprite's x position
 * @param {number} y New sprite's y position
 * @param {Group} [group] Group to which the new sprite should be added
 * @return {Sprite} Copy of the original sprite
 */
function addSpriteCopy(origSprite, x, y, group) {
    var ans = addSpriteHelper(x, y, origSprite.key, group);
    ans.anchor.setTo(origSprite.anchor.x, origSprite.anchor.y);
    ans.scale.setTo(origSprite.scale.x, origSprite.scale.y);
    return ans;
}

/**
 * Adds a transparent sprite, which is useful for collision detection
 * 
 * @param {number} x Sprite's x position
 * @param {number} y Sprite's y position
 * @param {number} [w] Width of sprite
 * @param {number} [h] Height of sprite
 * @param {string} [img] Resource name of image
 * @param {Group} [group] Group to which this sprite should be added
 * @param {boolean} [isAnchorAtCenter] Is the sprite anchored at it's center (vs it's upper left corner)?
 * @return {Sprite} Sprite with a transparent image
 */
function addTransparentSprite(x, y, w, h, img, group, isAnchorAtCenter) {
    if(isAnchorAtCenter == undefined) isAnchorAtCenter = true;
    if(img == undefined) img = 'transparent';
    var ans = addSprite(x, y, false, img, w, h, group, isAnchorAtCenter);
    // Hide visibility of transparent sprites, but maintains coordinates to be used for collision detection
    //ans.renderable = false;
    return ans;
}

/**
 * Adds a group to the world or another group
 * 
 * @param {Group} [parent] Parent group of the new group
 * @param {number} [x] Group's x position
 * @param {number} [y] Group's y position
 * @param {boolean} isPositionBasedOnWorldSize Are x and y scales to be multiplied by the world size (vs absolute values)?
 * @return {Group} New group
 */
function addGroup(parent, x, y, isPositionBasedOnWorldSize) {
    var ans = game.add.group();
    if (parent != undefined) parent.add(ans);
    if(isPositionBasedOnWorldSize) {
        if(x != undefined) ans.x = x * game.world.width;
        if(y != undefined) ans.y = y * game.world.height;
    } else {
        if(x != undefined) ans.x = x;
        if(y != undefined) ans.y = y;
    }
    return ans;
}

/**
 * Adds text to the world
 * 
 * @param {number} x Text object's x position
 * @param {number} y text object's y position
 * @param {boolean} isPositionBasedOnWorldSize Are x and y scales to be multiplied by the world size (vs absolute values)?
 * @param {string} txt Text content of the text object
 * @param {Style} style Text style
 * @param {Group} [group] Group to which the text object should be added
 * @return {Text} New Text
 */
function addText(x, y, isPositionBasedOnWorldSize, txt, style, group) {
    if(isPositionBasedOnWorldSize) {
        x *= game.world.width;
        y *= game.world.height;
    }
    var ans = game.add.text(x, y, txt, style);
    if(group != undefined) group.add(ans);
    ans.lineSpacing = -5;
    ans.anchor.setTo(0.5, 0.5);
    return ans;
}

/**
 * Adds a white arrow to the world
 * 
 * @param {number} x Arrow's x position
 * @param {number} y Arrow's y position
 * @param {boolean} isPositionBasedOnWorldSize Are x and y scales to be multiplied by the world size (vs absolute values)?
 * @param {number} [angle] Angle at which the arrow should be rotated
 * @return {Sprite} New arrow
 */
function addWhiteArrow(x, y, isPositionBasedOnWorldSize, angle) {
    if(isPositionBasedOnWorldSize) {
        x *= game.world.width;
        y *= game.world.height;
    }
    var ans = layers[LAYER.instructions].create(x, y, 'arrow', '01.png');
    const arrowScale = 0.8;
    ans.scale.setTo(arrowScale,arrowScale);
    if(angle != undefined) ans.angle += angle;
    ans.animations.add('shake', Phaser.Animation.generateFrameNames('', 0, 23, '.png', 2), 10, true, false);
    ans.animations.play('shake');
    return ans;
}

/**
 * Enables physics for a large number of objects at once
 * 
 * @param {Physics} type Type of Phaser physics
 * @param {Array<Sprite>} sprites Sprites to which physics should be added
 */
function enablePhysicsHelper(type, sprites) {
    for (var i = 0; i < sprites.length; i++) {
        game.physics.enable(sprites[i], type);
    }
}

// draws rounded rectangle is radius is included
/**
 * Adds rectangle to the world
 * 
 * @param {number} x Rectangle's x position
 * @param {number} y Rectangle's y position
 * @param {boolean} isPositionBasedOnWorldSize Are x and y scales to be multiplied by the world size (vs absolute values)?
 * @param {number} w Width of sprite
 * @param {number} h Height of sprite
 * @param {boolean} isSizeBasedOnWorldSize Are w and h scales to be multiplied by the world size (vs absolute values)?
 * @param {string} [fillColor] Color of rectangle
 * @param {Group} [group] Group to which the text object should be added
 * @param {string} [borderColor] Color of rectangle's border
 * @param {number} [borderWidth] Width of rectangle's border
 * @param {boolean} [isBorderWidthBasedOnObjectSize] Is the border width to be multiplied by the rectangle's size (vs absolute values)?
 * @param {number} [radius] Radius of rectangle's corner curviture
 * @return {Graphics} New rectangle
 */
function addRectangle(x, y, isPositionBasedOnWorldSize, 
                        w, h, isSizeBasedOnWorldSize, 
                        fillColor, group, 
                        borderColor, borderWidth, isBorderWidthBasedOnObjectSize,
                        radius) {

    if(isPositionBasedOnWorldSize) {
        x *= game.world.width;
        y *= game.world.height;
    }
    if(isSizeBasedOnWorldSize) {
        w *= game.world.width;
        h *= game.world.height;
    }

    var rect = game.add.graphics(x,y);

    if(borderWidth != undefined && borderWidth != null && borderWidth > 0) {
        if(isBorderWidthBasedOnObjectSize) borderWidth *= w;
        rect.lineStyle(borderWidth, borderColor, 1);
    }

    if(fillColor != undefined) rect.beginFill(fillColor, 1);

    if(radius == undefined) {
        rect.drawRect(0,0,w,h);
    } else {
        rect.drawRoundedRect(0, 0, w, h, radius);
    }

    rect.endFill();
    if(group != undefined && group != null) group.add(rect);

    return rect;
}

/**
 * Returns a copy of a string with the first letter capitalized and the rest lower case
 * 
 * @param {string} s String to capitalize / lower case
 * @return {string} Capitalized / Lower cased string
 */
function capitalizedFirstLetter(s, keepRestSame) {
    if(keepRestSame) {
        return (s.charAt(0).toUpperCase() + s.slice(1));
    } else {
        return (s.charAt(0).toUpperCase() + s.slice(1).toLowerCase());
    }
}

//-------------------- More Specific Helper Functions --------------------//

/**
 * Returns a string corresponding to the framename of product icons with level amount of produce
 * 
 * @param {number} level Amount of produce there should be
 * @return {string} Name of the frame that represents this amount of the produce
 */
function levelToFrameName(level) {
    return '0' + level + '.png';
}

/**
 * Returns the amount of a product corresponding to the given framename of product icons
 * 
 * @param {string} frameName Name of the produce icon frame
 * @return {number} Corresponding amount of the product
 */
function frameNameToLevel(frameName) {
    return parseInt(frameName.charAt(1));
}

/**
 * Loads multiple images for when the image file names match the names of the assets
 * 
 * @param {string} path Path to the images
 * @param {Array<string>} names Names of images in the path folder that should be loaded
 */
function loadSimpleImgs(path, names) {
    for(var i = 0; i < names.length; i++) {
        game.load.image(names[i], path + names[i] + '.png');
    }
}

/**
 * Creates an icon of a player based on the passed sprite info (useful for the peer view and the join screen)
 * @param {String} face File reference for avatar face
 * @param {String} hair File reference for avatar hair
 * @param {String} color File reference for avatar's background
 * @param {Number} scale The scale of the final icon
 * @return {object} { group: [avatar sprite group], bg: [background sprite], face: [face sprite], hair: [hair sprite] }
 */
function createPlayerIcon(face, hair, color, scale) {
    var icon = {};
    icon.group = game.add.group();

    icon.bg = addScaledSprite(0, 0, false, color, scale*0.25, icon.group, true);
    icon.face = addScaledSprite(0, 0, false, face, scale, icon.group, true);
    icon.hair = addScaledSprite(0, 0, false, hair, scale, icon.group, true);

    return icon;
}