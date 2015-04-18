/*Source  file  name: constants.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,  
Date  last  Modified: 2015_3_18,  Program description： This file is the constants.ts file which contains the constant variables used in game.
Revision  History : Version 2.0*/
//constants used in this game
module constants {
    // State Machine Constants
    export var MENU_STATE: number = 0;
    export var PLAY_STATE: number = 1;
    export var GAME_OVER_STATE: number = 2;
    export var INSTRUCTION_STATE: number = 3;
    export var LEVEL_TWO_STATE: number = 4;
    export var LEVEL_THREE_STATE: number = 5;

    // Game Constants
    export var BACKGROUND_MOVING_SPEED = 3;
    export var GROUND_LEVEL = 330;//temporary set height of ground level
    export var GHOST_MOVING_SPEED = 6; //the speed of ghost
    export var UFO_MOVING_SPEED = 1.5; //the speed of UFO
    export var FIREBSLL_DROPPING_SPEED = 3; //the speed of fire ball dropping
    export var PLAYER_LIVES = 15;
    //Math.floor(Math.random() * (3) + 3);;//randomly generated stone numbers

    export var LABEL_FONT = "40px Consolas";
    export var LABEL_COLOUR = "#FFFF00";
}