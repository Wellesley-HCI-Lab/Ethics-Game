
var create = function(){

// Scales canvas based on screen size
game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
game.add.plugin(PhaserInput.Plugin);
game.physics.startSystem(Phaser.Physics.ARCADE); 
}