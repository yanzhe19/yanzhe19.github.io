/// <reference path="../managers/playerasset.ts" />
// player Class
/*Source  file  name: player.ts, Author's  name: Andrew Mackle (300603655),  Last  Modified  by: Andrew Mackle,
Date  last  Modified: 2015_04_14,  Program description： This is to crate the player object for the player to controll*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    var Player = (function (_super) {
        __extends(Player, _super);
        //the constructor of player class
        function Player(stateNumber) {
            _super.call(this, managers.PlayerAssets.playerAtlas);
            this.walking = false;
            this.sprinting = false;
            this.spells = [];
            switch (stateNumber) {
                case constants.MENU_STATE:
                    this.defaultState = "idle";
                    this.grounded = true;
                    this.flying = false;
                    break;
                case constants.PLAY_STATE:
                    this.defaultState = "run";
                    this.grounded = true;
                    this.flying = false;
                    break;
                case constants.GAME_OVER_STATE:
                    this.defaultState = "idle";
                    this.grounded = true;
                    this.flying = false;
                    break;
                case constants.INSTRUCTION_STATE:
                    this.defaultState = "idle";
                    this.grounded = true;
                    this.flying = false;
                    break;
                case constants.LEVEL_TWO_STATE:
                    this.defaultState = "run";
                    this.grounded = true;
                    this.flying = false;
                    break;
                case constants.LEVEL_THREE_STATE:
                    this.defaultState = "run";
                    this.grounded = true;
                    this.flying = false;
                    break;
            }
            this.gotoAndPlay(this.defaultState);
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.pauseDuration = 0;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this.y = constants.GROUND_LEVEL;
            this.x = constants.GROUND_LEVEL * 0.5;
            onkeydown = this.keyDownEvent;
            onkeyup = this.keyupEvent;
            //this.addEventListener("key down", this.handleClick);
            this.player = this;
        }
        //event
        Player.prototype.keyDownEvent = function (event) {
            console.log(event.keyCode);
            player.e = event;
            if (player.e.type == "keydown") {
                switch (player.e.keyCode) {
                    case 87:
                        //jump event
                        console.log("jump event");
                        player.jump();
                        break;
                    case 83:
                        //land event
                        if (player.grounded == true) {
                            console.log("land event");
                            player.land();
                        }
                        break;
                    case 68:
                        //sprint event
                        if (player.grounded == true) {
                            console.log("sprint event");
                            player.sprint();
                        }
                        break;
                    case 65:
                        //walk event
                        if (player.grounded == true) {
                            console.log("walk event");
                            player.walk();
                        }
                        break;
                    case 38:
                        //up arrow: volume up
                        backgroundSound.setVolume(backgroundSound.getVolume() + 0.01);
                        break;
                    case 40:
                        //down arrow: volume down
                        backgroundSound.setVolume(backgroundSound.getVolume() - 0.01);
                        break;
                }
            }
        };
        //++++++++++++++++++++++++++++++++++++++++++++++++key event section++++++++++++++++++++++++++++++++++++++++++++++
        Player.prototype.keyupEvent = function (event) {
            console.log(event.keyCode);
            console.log(event.type);
            player.e = event;
            if (player.e.type == "keyup") {
                switch (player.e.keyCode) {
                    case 68:
                        //end sprint event
                        if (player.grounded == true) {
                            player.sprinting = false;
                            player.defaultAnimation();
                        }
                        break;
                    case 65:
                        //end walk event
                        if (player.grounded == true) {
                            player.walking = false;
                            player.defaultAnimation();
                        }
                        break;
                    case 77:
                        //M: Mute or unmute music
                        backgroundSound.setMute(!backgroundSound.getMute());
                        break;
                    case 69:
                        //E: cast spell
                        player.spells.push(new objects.Spell(player.x, player.y, player));
                        break;
                }
            }
        };
        //Public methods
        Player.prototype.update = function () {
            for (var count = 0; count < player.spells.length; count++) {
                player.spells[count].update();
            }
            switch (player.state) {
                case "idle":
                    break;
                case "jump":
                    //jump animation
                    console.log(player.y);
                    if (player.flying == true && player.jumpNumber == 1) {
                        player.pauseDuration = Date.now() - player.pauseStart;
                        if (player.pauseDuration >= 1000) {
                            player.flying = false;
                        }
                    }
                    player.y = constants.GROUND_LEVEL - (Math.sin((Date.now() - (player.timerStart + player.pauseDuration)) * 0.0025) * 150);
                    console.log(player.y);
                    if (player.y > constants.GROUND_LEVEL + 15) {
                        //player.pauseDuration = 0;
                        player.land();
                    }
                    break;
                case "land":
                    //land animation
                    player.y = constants.GROUND_LEVEL + 15;
                    if (Date.now() - player.timerStart >= 250) {
                        player.y = constants.GROUND_LEVEL;
                        player.defaultAnimation();
                    }
                    if (player.x <= 20) {
                        player.y = constants.GROUND_LEVEL;
                        player.defaultAnimation();
                    }
                    else {
                        player.x -= constants.BACKGROUND_MOVING_SPEED;
                    }
                    break;
                case "sprint":
                    //sprint animation
                    player.x += constants.BACKGROUND_MOVING_SPEED;
                    break;
                case "walk":
                    //walk animation
                    if (player.x > 20) {
                        player.x -= constants.BACKGROUND_MOVING_SPEED * 1.5;
                    }
                    break;
                case "run":
                    break;
                default:
                    break;
            }
        };
        //function for player's different status
        Player.prototype.land = function () {
            player.grounded = true;
            player.timerStart = Date.now();
            player.state = "land";
            player.gotoAndPlay(player.state);
            player.pauseDuration = 0;
        };
        Player.prototype.idle = function () {
            player.state = "idle";
            player.gotoAndPlay(player.state);
            player.grounded = true;
        };
        Player.prototype.walk = function () {
            player.y = constants.GROUND_LEVEL;
            player.state = "walk";
            //this.gotoAndPlay(this.state);
            if (player.walking == false) {
                player.walking = true;
                player.gotoAndPlay(player.state);
            }
            player.grounded = true;
        };
        Player.prototype.run = function () {
            player.state = "run";
            player.gotoAndPlay(player.state);
            player.grounded = true;
        };
        Player.prototype.sprint = function () {
            player.y = constants.GROUND_LEVEL;
            player.state = "sprint";
            //this.gotoAndPlay(this.state);
            if (player.sprinting == false) {
                player.sprinting = true;
                player.gotoAndPlay(player.state);
            }
            player.grounded = true;
        };
        Player.prototype.jump = function () {
            console.log(player.grounded);
            if (player.grounded == false && player.flying == false && player.jumpNumber == 0) {
                player.pauseStart = Date.now();
                player.flying = true;
                player.jumpNumber++;
            }
            if (player.grounded == true) {
                player.timerStart = Date.now();
                player.state = "jump";
                player.gotoAndPlay(player.state);
                player.grounded = false;
                player.jumpNumber = 0;
            }
        };
        Player.prototype.defaultAnimation = function () {
            player.state = player.defaultState;
            player.gotoAndPlay(player.state);
        };
        return Player;
    })(createjs.Sprite);
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map