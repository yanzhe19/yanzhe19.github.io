/// <reference path="../objects/fence.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/crystal.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/sea.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/player.ts" />
/// <reference path="../managers/collision.ts" />

//this is the level one  state for playing game
/*Source  file  name: menu.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,  
Date  last  Modified: 2015_3_18,  Program description： This file is the menu state file, it controls and create the menus state,
Revision  History : Version 2.0*/

//the play state of game
module states {

    //update the play state
    export function playState() {
        // +++++++++++++++++++++++++++++Update play state scene+++++++++++++++++++++++++++++++++++
        sea.update();
        player.update();

        //update all fences
        for (var count = 0; count < fences.length; count++) {
            fences[count].update();
        }

        //update all crystals
        for (var count = 0; count < crystals.length; count++) {
            crystals[count].update();
        }

        //check collision of objects
        //+++ comment temporary
        collision.update();

        //update the score board
        scoreboard.update();

        //level label update
        levelLabel.update();

        // +++++++++++++++++++++++++++++End of Update play state scene+++++++++++++++++++++++++++++++++++

        //check if player dead, if dead, go to game over state
        if (scoreboard.lives <= 0) {
            //remove everything from the stage first
            stage.removeChild(game);
            game.removeAllChildren();
            game.removeAllEventListeners();
            //create the other state screen --> game over state screen
            currentState = constants.GAME_OVER_STATE;
            changeState(currentState);
        } else if (scoreboard.score >= 1000) {//go to level two state when got 1000 points
            //remove everything from the stage first
            stage.removeChild(game);
            game.removeAllChildren();
            game.removeAllEventListeners();
            //create the other state screen --> LEVEL TWO state screen
            currentState = constants.LEVEL_TWO_STATE;
            changeState(currentState);
        }
    }

    // play state Function, show the paly scene
    export function play( state ): void {
        // Declare new Game Container
        game = new createjs.Container();

        // Instantiate Game Objects
        sea = new objects.Sea(stage, game);
        player = new objects.Player( state );

        // Show Cursor
        stage.cursor = "none";

        //set all fence and crystal to empty,clean the object
        fences = [];
        crystals = [];
        ghosts = [];
        fireballs = [];

        //add stone, fence and crystal in the scene
        addObj();

        // Display Scoreboard
        scoreboard = new objects.Scoreboard(stage, game);

        //label shows the current level
        levelLabel = new objects.LevelLabel("Level One");

        // Instantiate Collision Manager
        //in level one, no ghost and fire ball, so pass empty array to collison 
        collision = new managers.Collision(player, crystals, fences,[],[], scoreboard);

        game.addChild(player);

        //add game container to stage
        stage.addChild(game);
    }

    // add object to screen Loop
    export function addObj(): void {
        setInterval(
            function () {
                var randomSelection = Math.floor(Math.random() * 2) + 1;
                //console.log(randomSelection);
                switch (randomSelection) {
                    case 1:
                        if (crystals.length < 3) {//limit the number of crystal
                            addCrystal();
                        } else break;
                        break;
                    case 2:
                        if (fences.length < 3) {//limit the number of fence
                            addFence();
                        } else break;
                        break;
                    default: break;
                }
            },
            (Math.floor(Math.random() * 4 + 1) * 300 + 2000) //set interval to exetution
            );
    }

    export function addFence() {
        //add one fence 
        fences.push(new objects.Fence(stage, game));
    }
    export function addCrystal() {
        //add one crystal 
        crystals.push(new objects.Crystal(stage, game));
    }
}