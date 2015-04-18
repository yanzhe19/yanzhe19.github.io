/*Source  file  name: levelLabel.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,  
Date  last  Modified: 2015_4_17,  Program description： This file is the level label object file, it's the obejct which shows the level label in the game,
Revision  History : Version 2.0*/
module objects {
    export class LevelLabel extends objects.Label {
         dx: number;
         width: number;
        constructor(text: string) {
            this.x = stage.canvas.width * 0.5;
            this.y = stage.canvas.height * 0.5;
            super(this.x, this.y, text);
            this.dx = 2;
            this.width = this.getBounds().width;
            game.addChild(this);
        }

        //update method for level label
        update() {
            this.x -= this.dx
            if (this.x < (0- this.width)) {
                this.dx = 0;
            }
        }
    }
}  