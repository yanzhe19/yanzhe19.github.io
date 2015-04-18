// Scoreboard Class
/*Source  file  name: scoreboard.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,
Date  last  Modified: 2015_3_18,  Program description： This file is the scoreboard object file, it's the obejct shows player's current score,
Revision  History : Version 2.0*/
//this is the scoreboard object class
var objects;
(function (objects) {
    var Scoreboard = (function () {
        //constructor of scoreboard class
        function Scoreboard(stage, game) {
            this.labelText = "";
            this.stage = stage;
            this.game = game;
            this.lives = constants.PLAYER_LIVES;
            this.score = 0;
            this.label = new createjs.Text(this.labelText, constants.LABEL_FONT, constants.LABEL_COLOUR);
            this.update();
            this.width = this.label.getBounds().width;
            this.height = this.label.getBounds().height;
            //add score board to game container
            game.addChild(this.label);
        }
        //update the scoreboard with the latest score
        Scoreboard.prototype.update = function () {
            //set the score and life to label text
            this.labelText = "Lives: " + this.lives.toString() + " Score: " + this.score.toString();
            this.label.text = this.labelText;
        };
        //destory the score board from game container
        Scoreboard.prototype.destroy = function () {
            game.removeChild(this.label);
        };
        return Scoreboard;
    })();
    objects.Scoreboard = Scoreboard;
})(objects || (objects = {}));
//# sourceMappingURL=scoreboard.js.map