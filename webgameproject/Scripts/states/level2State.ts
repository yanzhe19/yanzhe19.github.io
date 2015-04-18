/// <reference path="../objects/fence.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/crystal.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/sea.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../managers/collision.ts" />

//this is the level two  state for playing game
/*Source  file  name: level2State.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,  
Date  last  Modified: 2015_4_14,  Program description： This file is the level two state file, it controls and create the level two state,
Revision  History : Version 2.0*/

//the play state of game
module states {

    //update the level 2 state
    export function level2State() {
        // +++++++++++++++++++++++++++++Update level 2 state scene+++++++++++++++++++++++++++++++++++
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

        //update all ghost
        for (var count = 0; count < ghosts.length; count++) {
            ghosts[count].update();
        }

        //check collision of objects
        collision.update();

        //update the score board
        scoreboard.update();

        //level label update
        levelLabel.update();

        // +++++++++++++++++++++++++++++End of Update level 2 state scene+++++++++++++++++++++++++++++++++++

        //check if player dead, if dead, go to game over state
        if (scoreboard.lives <= 0) {
            //remove everything from the stage first
            stage.removeChild(game);
            game.removeAllChildren();
            game.removeAllEventListeners();
            //create the other state screen --> game over state screen
            currentState = constants.GAME_OVER_STATE;
            changeState(currentState);
        } else if (scoreboard.score >= 2000) {//go to level three state when got 2000 points
            //remove everything from the stage first
            stage.removeChild(game);
            game.removeAllChildren();
            game.removeAllEventListeners();
            //create the other state screen --> LEVEL Three state screen
            currentState = constants.LEVEL_THREE_STATE;
            changeState(currentState);
        }
    }

    // play state Function, show the level 2 scene
    export function level2Scene( state ): void {
        // Declare new Game Container
        game = new createjs.Container();

        // Instantiate Game Objects
        sea = new objects.Sea(stage, game);
        player = new objects.Player(state);

        // Show Cursor
        stage.cursor = "none";

        //set all fence and crystal to empty,clean the object
        fences = [];
        crystals = [];
        ghosts = [];

        //add stone, fence, crystal and ghost in the scene
        level2AddObj();

        // Display Scoreboard
        //scoreboard = new objects.Scoreboard(stage, game);
        if (scoreboard == null) {
            scoreboard = new objects.Scoreboard(stage, game);
        }else game.addChild(scoreboard.label);

        //label shows the current level
        levelLabel = new objects.LevelLabel("Level Two");

        // Instantiate Collision Manager
        //in level two, no fireball exists, so pass empty array to collision manager
        collision = new managers.Collision(player, crystals, fences, ghosts, [], scoreboard);

        game.addChild(player);

        //add game container to stage
        stage.addChild(game);
    }

    // add object to screen Loop
    export function level2AddObj(): void {
        setInterval(
            function () {
                var randomSelection = Math.floor(Math.random() * 3) + 1;
                //console.log(randomSelection);
                switch (randomSelection) {
                    case 1:
                        if (crystals.length < 3) {//limit the number of crystal
                            level2AddCrystal();
                        } else break;
                        break;
                    case 2:
                        if (fences.length < 2) {//limit the number of fence
                            level2AddFence();
                        } else break;
                        break;
                    case 3:
                        if (ghosts.length < 2) {//limit the number of ghost
                            level2AddGhost();
                        } else break;
                        break;
                    default: break;
                }
            },
            (Math.floor(Math.random() * 4 + 1) * 300 + 2000) //set interval to exetution
            );
    }

    export function level2AddFence() {
        //add one fence 
        fences.push(new objects.Fence(stage, game));
    }
    export function level2AddCrystal() {
        //add one crystal 
        crystals.push(new objects.Crystal(stage, game));
    }
    export function level2AddGhost() {
        //add one ghost 
        ghosts.push(new objects.Ghost(stage, game));
    }
} 