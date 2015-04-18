/// <reference path="../constants.ts" />
/// <reference path="../managers/asset.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/*Source  file  name: button.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,
Date  last  Modified: 2015_3_18,  Program description： This file is the button object file, it's the obejct which defines all buttons in the game,
Revision  History : Version 2.0*/
//button class
var objects;
(function (objects) {
    //extends from createjs.Sprite
    var Button = (function (_super) {
        __extends(Button, _super);
        //constructor of the button class
        function Button(x, y, buttonIDString) {
            _super.call(this, managers.Assets.atlas, buttonIDString);
            this.regX = this.getBounds().width / 2;
            this.regY = this.getBounds().height / 2;
            this.x = x;
            this.y = y;
            this.setButtonListeners();
        }
        //set button listeners
        Button.prototype.setButtonListeners = function () {
            this.cursor = 'pointer';
            this.on('rollover', this.onButtonOver);
            this.on('rollout', this.onButtonOut);
        };
        //button over listener
        Button.prototype.onButtonOver = function () {
            this.alpha = 0.8;
        };
        //button out listener
        Button.prototype.onButtonOut = function () {
            this.alpha = 1;
        };
        return Button;
    })(createjs.Sprite);
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map