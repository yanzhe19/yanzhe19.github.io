var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*Source  file  name: levelLabel.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,
Date  last  Modified: 2015_4_17,  Program description： This file is the level label object file, it's the obejct which shows the level label in the game,
Revision  History : Version 2.0*/
var objects;
(function (objects) {
    var LevelLabel = (function (_super) {
        __extends(LevelLabel, _super);
        function LevelLabel(text) {
            this.x = stage.canvas.width * 0.5;
            this.y = stage.canvas.height * 0.5;
            _super.call(this, this.x, this.y, text);
            this.dx = 2;
            this.width = this.getBounds().width;
            game.addChild(this);
        }
        //update method for level label
        LevelLabel.prototype.update = function () {
            this.x -= this.dx;
            if (this.x < (0 - this.width)) {
                this.dx = 0;
            }
        };
        return LevelLabel;
    })(objects.Label);
    objects.LevelLabel = LevelLabel;
})(objects || (objects = {}));
//# sourceMappingURL=levellabel.js.map