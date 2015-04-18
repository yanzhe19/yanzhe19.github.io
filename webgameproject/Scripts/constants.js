/*Source  file  name: constants.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,
Date  last  Modified: 2015_3_18,  Program description： This file is the constants.ts file which contains the constant variables used in game.
Revision  History : Version 2.0*/
//constants used in this game
var constants;
(function (constants) {
    // State Machine Constants
    constants.MENU_STATE = 0;
    constants.PLAY_STATE = 1;
    constants.GAME_OVER_STATE = 2;
    constants.INSTRUCTION_STATE = 3;
    constants.LEVEL_TWO_STATE = 4;
    constants.LEVEL_THREE_STATE = 5;
    // Game Constants
    constants.BACKGROUND_MOVING_SPEED = 3;
    constants.GROUND_LEVEL = 330; //temporary set height of ground level
    constants.GHOST_MOVING_SPEED = 6; //the speed of ghost
    constants.UFO_MOVING_SPEED = 1.5; //the speed of UFO
    constants.FIREBSLL_DROPPING_SPEED = 3; //the speed of fire ball dropping
    constants.PLAYER_LIVES = 15;
    //Math.floor(Math.random() * (3) + 3);;//randomly generated stone numbers
    constants.LABEL_FONT = "40px Consolas";
    constants.LABEL_COLOUR = "#FFFF00";
})(constants || (constants = {}));
//# sourceMappingURL=constants.js.map