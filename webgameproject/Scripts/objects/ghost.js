/// <reference path="../managers/asset.ts" />
// ghost class
/*Source  file  name: ghost.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,
Date  last  Modified: 2015_4_14,  Program description： This file is the ghost object file, it's the obejct of ghost(obstacle),
Revision  History : Version 2.0*/
//this is the ghost object
var objects;
(function (objects) {
    var Ghost = (function () {
        //constructor of ghost class
        function Ghost(stage, game) {
            this.stage = stage;
            this.game = game;
            //get ghost image from sprite sheet
            this.image = new createjs.Sprite(managers.Assets.projectAtlas, "ghost");
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            // console.log(this.width,this.height);
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            this.reset();
            //add ghost to game container
            game.addChild(this.image);
        }
        //update the ghost objects
        Ghost.prototype.update = function () {
            this.image.x -= this.dx;
            //ghost move behind scene, reset to initial place
            if (this.image.x < -this.width) {
                //remove it
                this.destroy();
            }
        };
        //randomely put ghost on the right side of canvas
        Ghost.prototype.reset = function () {
            //randomly pur ghost, off screen on the right side
            this.image.x = Math.floor(Math.random() * (800) + this.stage.canvas.width);
            //set dx the same as background speed
            this.dx = constants.GHOST_MOVING_SPEED;
            this.image.y = constants.GROUND_LEVEL;
        };
        //define function to destroy the current ghost
        Ghost.prototype.destroy = function () {
            //remove this ghost from game container
            game.removeChild(this.image);
            //remove it from the array
            ghosts.splice(ghosts.indexOf(this), 1);
            //console.log(stones.length);
        };
        return Ghost;
    })();
    objects.Ghost = Ghost;
})(objects || (objects = {}));
//# sourceMappingURL=ghost.js.map