/// <reference path="../managers/asset.ts" />
/*Source  file  name: fish.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,
Date  last  Modified: 2015_3_18,  Program description： This file is the fish(player Avatar) object file, it's the obejct of the player Avatar,
Revision  History : Version 2.0*/
//this is the fish object class (player's avatar)
var objects;
(function (objects) {
    var Fish = (function () {
        //constructor of fish class
        function Fish(stage, game) {
            this.stage = stage;
            this.game = game;
            this.image = new createjs.Sprite(managers.Assets.atlas, "fish");
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            //add sound to fish object
            game.addChild(this.image);
            this.engineSound = createjs.Sound.play('oceanSound', createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
        }
        //update the fish objects
        Fish.prototype.update = function () {
            //set the x and y corresponding to mouse position
            this.image.x = this.stage.mouseX;
            //y cannot less than 120 since it is over the sea level
            if (this.stage.mouseY <= 120) {
                this.image.y = 120;
            }
            else
                this.image.y = this.stage.mouseY;
        };
        //remove the fish object from game container
        Fish.prototype.destroy = function () {
            //stop the sound first
            this.engineSound.stop();
            game.removeChild(this.image);
        };
        return Fish;
    })();
    objects.Fish = Fish;
})(objects || (objects = {}));
//# sourceMappingURL=fish.js.map