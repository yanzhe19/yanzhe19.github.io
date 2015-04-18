/// <reference path="../managers/asset.ts" />
// fence class
/*Source  file  name: fence.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,
Date  last  Modified: 2015_3_30,  Program description： This file is the stone object file, it's the obejct of fence(obstacle),
Revision  History : Version 3.0*/
//this is the fence object
var objects;
(function (objects) {
    var Fence = (function () {
        //constructor of fence class
        function Fence(stage, game) {
            this.stage = stage;
            this.game = game;
            //get fence image from sprite sheet
            this.image = new createjs.Sprite(managers.Assets.projectAtlas, "stone");
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            this.reset();
            //add fence to game container
            game.addChild(this.image);
        }
        //update the fence objects
        Fence.prototype.update = function () {
            this.image.x -= this.dx;
            //stone move behind scene, remove it
            if (this.image.x < -this.width) {
                //remove it
                this.destroy();
            }
        };
        //randomely put fence on the right side of canvas
        Fence.prototype.reset = function () {
            //randomly pur fence, off screen on the right side
            this.image.x = Math.floor(Math.random() * (700) + this.stage.canvas.width);
            //set dx the same as background speed
            this.dx = constants.BACKGROUND_MOVING_SPEED;
            this.image.y = constants.GROUND_LEVEL;
        };
        //define function to destroy the current fence
        Fence.prototype.destroy = function () {
            //remove this fence from game container
            game.removeChild(this.image);
            //remove it from the array
            fences.splice(fences.indexOf(this), 1);
        };
        return Fence;
    })();
    objects.Fence = Fence;
})(objects || (objects = {}));
//# sourceMappingURL=fence.js.map