/// <reference path="../managers/asset.ts" />
// fireball class
/*Source  file  name: ghost.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,  
Date  last  Modified: 2015_4_14,  Program description： This file is the ghost object file, it's the obejct of ghost(obstacle),
Revision  History : Version 2.0*/

//this is the ghost object
module objects {
    export class Fireball {
        //define propereties of ghost
        image: createjs.Sprite;
        stage: createjs.Stage;
        game: createjs.Container;
        width: number;
        height: number;
        dy: number;
        dx: number;

        //constructor of ghost class
        constructor(stage: createjs.Stage, game: createjs.Container, xPosition,yPosition) {
            this.stage = stage;
            this.game = game;
            //get ghost image from sprite sheet
            this.image = new createjs.Sprite(managers.Assets.projectAtlas, "fireball");
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            // console.log(this.width,this.height);
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            this.reset(xPosition, yPosition);

            //add ghost to game container
            game.addChild(this.image);
        }

        //update the ghost objects
        update() {
            this.image.y += this.dy;
            this.image.x -= this.dx;
            //fireball move behind ground, destroy it
            if (this.image.y > (constants.GROUND_LEVEL +this.height)) {
                //remove it
                this.destroy();
            }
        }

        //randomely put ghost on the right side of canvas
        reset(fireBallXPosition,fireBallYPosition) {
            //randomly pur ghost, off screen on the right side
            this.image.x = fireBallXPosition;
            this.image.y = fireBallYPosition;

            //set dy to fire ball dropping speed
            this.dy = constants.FIREBSLL_DROPPING_SPEED;
            this.dx = 2;//this is the speed of fire ball
        }

        //define function to destroy the current ghost
        destroy() {
            //remove this fireball from game container
            game.removeChild(this.image);

            //remove it from the array
            fireballs.splice(fireballs.indexOf(this), 1);
        }
    }

}    