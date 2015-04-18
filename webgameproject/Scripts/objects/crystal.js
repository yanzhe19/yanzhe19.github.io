/// <reference path="../managers/asset.ts" />
// crystal Class
/*Source  file  name: crystal.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,
Date  last  Modified: 2015_3_30,  Program description： This file is the crystal object file, it's the obejct of crystal(bonus point),
Revision  History : Version 3.0*/
//this is the crystal object --> which is the object for player avatar to collect points
var objects;
(function (objects) {
    var Crystal = (function () {
        //the constructor of crystal class
        function Crystal(stage, game) {
            this.stage = stage;
            this.game = game;
            //get crystal image from sprite sheet
            this.image = new createjs.Sprite(managers.Assets.projectAtlas, "crystal");
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            this.reset();
            //add the current crystal to game container
            game.addChild(this.image);
        }
        //function to update crystal class
        Crystal.prototype.update = function () {
            //crystal move beyond scene, remove it 
            if (this.image.x < (-this.width)) {
                //remove it
                this.destroy();
            }
            //change crystal position according to dx
            this.image.x -= this.dx;
        };
        //reset the crystal position
        Crystal.prototype.reset = function () {
            //randomly pur fence, off screen on the right side
            this.image.x = Math.floor(Math.random() * (1000) + this.stage.canvas.width);
            //set dx the same as background speed
            this.dx = constants.BACKGROUND_MOVING_SPEED;
            this.image.y = constants.GROUND_LEVEL - 100;
        };
        //function to destroy crystal
        Crystal.prototype.destroy = function () {
            //remove crystal from game container
            game.removeChild(this.image);
            //remove it from the array
            crystals.splice(crystals.indexOf(this), 1);
        };
        return Crystal;
    })();
    objects.Crystal = Crystal;
})(objects || (objects = {}));
//# sourceMappingURL=crystal.js.map