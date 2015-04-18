/// <reference path="../managers/asset.ts" />
// fireball class
/*Source  file  name: ghost.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,  
Date  last  Modified: 2015_4_14,  Program description： This file is the ghost object file, it's the obejct of ghost(obstacle),
Revision  History : Version 2.0*/

//this is the ghost object
module objects {
    export class Ufo {
        //define propereties of ghost
        image: createjs.Sprite;
        stage: createjs.Stage;
        game: createjs.Container;
        width: number;
        height: number;
        ufoXPosition: number;
        ufoYPosition: number;
        dx: number;

        //constructor of ghost class
        constructor(stage: createjs.Stage, game: createjs.Container) {
            this.stage = stage;
            this.game = game;
            //get ghost image from sprite sheet
            this.image = new createjs.Sprite(managers.Assets.projectAtlas, "ufo");
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            // console.log(this.width,this.height);
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            this.reset();

            //add ghost to game container
            game.addChild(this.image);
            this.addFireBall();//call this function to add fireballs related to this ufo object
        }

        //update the ghost objects
        update() {
            this.image.x -= this.dx;
            this.ufoXPosition = this.image.x;
            this.ufoYPosition = this.image.y;

            //update all fireball
            for (var count = 0; count < fireballs.length; count++) {
                fireballs[count].update();
            }

            //ghost move behind scene, reset to initial place
            if (this.image.x < -this.width) {
                //remove it
                this.reset();
            } 
        }

        //add fire ball to the ufo object
        addFireBall() {
        setInterval(
            function () {
                var randomSelection = Math.floor(Math.random() * 2) + 1;
                switch (randomSelection) {
                    case 1:
                        if (fireballs.length < 1) {
                            fireballs.push(new objects.Fireball(this.stage, this.game, ufo.image.x, ufo.image.y));
                        }
                        break;               
                    default: break;
                }
            },
            (Math.floor(Math.random() * 4 + 1) * 300 + 200) //set interval to exetution
            );
    }

        //randomely put ghost on the right side of canvas
        reset() {
            //randomly pur ghost, off screen on the right side
            this.image.x = Math.floor(Math.random() * (800) + this.stage.canvas.width);

            //set dx the same as background speed
            this.dx = constants.UFO_MOVING_SPEED;
            this.image.y = constants.GROUND_LEVEL - 220;
        }
    }

}   