/// <reference path="../managers/asset.ts" />
// submarine class
/*Source  file  name: submarine.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,
Date  last  Modified: 2015_3_18,  Program description： This file is the submarine object file, it's the obejct of submarine(enemy),
Revision  History : Version 2.0*/
//this is the submarine object
var objects;
(function (objects) {
    var Submarine = (function () {
        //constructor of submarine class
        function Submarine(stage, game) {
            this.stage = stage;
            this.game = game;
            //get submarine image from sprite sheet
            this.image = new createjs.Sprite(managers.Assets.atlas, "submarine");
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            // console.log(this.width,this.height);
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            this.reset();
            //add submarine to game container
            game.addChild(this.image);
        }
        //update the submarine objects
        Submarine.prototype.update = function () {
            this.image.x -= this.dx;
            //submarine move behind scene, reset to initial place
            if (this.image.x < -this.width) {
                this.reset();
            }
            //submarine object y axis higher than 120, submarine cannot leave water, so increase y of submarine to go back to water
            if (this.image.y <= 120) {
                this.dy = Math.abs(this.dy);
            }
            //if submarine is ok, move according to the regular dy
            this.image.y += this.dy;
        };
        //reset the submarine position to a random place on the right side of canvas
        Submarine.prototype.reset = function () {
            this.image.y = Math.floor(Math.random() * (this.stage.canvas.height - 100) + 100);
            //set the dy and dx to random
            this.dx = Math.floor(Math.random() * 5 + 3);
            this.dy = Math.floor(Math.random() * -5) + Math.floor(Math.random() * 5);
            //set the x of submarine to the right margin of canvas
            this.image.x = this.stage.canvas.width + this.width;
        };
        //define function to destroy the current submarine
        Submarine.prototype.destroy = function () {
            //remove this submarine from game container
            game.removeChild(this.image);
        };
        return Submarine;
    })();
    objects.Submarine = Submarine;
})(objects || (objects = {}));
//# sourceMappingURL=submarine.js.map