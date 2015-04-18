/// <reference path="../objects/fence.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/crystal.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/ufo.ts" />
/// <reference path="../objects/sea.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../managers/collision.ts" />
//this is the level two  state for playing game
/*Source  file  name: level3State.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,
Date  last  Modified: 2015_4_14,  Program description： This file is the level three state file, it controls and create the level three state,
Revision  History : Version 2.0*/
//the play state of game
var states;
(function (states) {
    //update the level 3 state
    function level3State() {
        // +++++++++++++++++++++++++++++Update level 3 state scene+++++++++++++++++++++++++++++++++++
        sea.update();
        //updates for player object
        player.update();
        for (var count = 0; count < fences.length; count++) {
            fences[count].update();
        }
        for (var count = 0; count < crystals.length; count++) {
            crystals[count].update();
        }
        for (var count = 0; count < ghosts.length; count++) {
            ghosts[count].update();
        }
        //update all object
        ufo.update();
        //check collision of objects
        //+++ comment temporary
        collision.update();
        //update the score board
        scoreboard.update();
        //level label update
        levelLabel.update();
        // +++++++++++++++++++++++++++++End of Update level 3 state scene+++++++++++++++++++++++++++++++++++
        //check if player dead, if dead, go to game over state
        if (scoreboard.lives <= 0) {
            //remove everything from the stage first
            stage.removeChild(game);
            game.removeAllChildren();
            game.removeAllEventListeners();
            //create the other state screen --> game over state screen
            currentState = constants.GAME_OVER_STATE;
            changeState(currentState);
        }
    }
    states.level3State = level3State;
    // play state Function, show the level 3 scene
    function level3Scene(state) {
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
        fireballs = [];
        //add stone, fence, crystal, ghost and ufo in the scene
        level3AddObj();
        //add ufo to scene
        ufo = new objects.Ufo(stage, game); // change image later
        // Display Scoreboard
        if (scoreboard == null) {
            scoreboard = new objects.Scoreboard(stage, game);
        }
        else
            game.addChild(scoreboard.label);
        //label shows the current level
        levelLabel = new objects.LevelLabel("Level Three");
        // Instantiate Collision Manager
        //+++ comment temporary
        collision = new managers.Collision(player, crystals, fences, ghosts, fireballs, scoreboard);
        game.addChild(player);
        //add game container to stage
        stage.addChild(game);
    }
    states.level3Scene = level3Scene;
    // add object to screen Loop
    function level3AddObj() {
        setInterval(function () {
            var randomSelection = Math.floor(Math.random() * 4) + 1;
            console.log(randomSelection);
            switch (randomSelection) {
                case 1:
                    if (crystals.length < 3) {
                        level3AddCrystal();
                    }
                    else
                        break;
                    break;
                case 2:
                    if (fences.length < 0) {
                        level3AddFence();
                    }
                    else
                        break;
                    break;
                case 3:
                    if (ghosts.length < 1) {
                        level3AddGhost();
                    }
                    else
                        break;
                    break;
                default: level3AddCrystal();
            }
        }, (Math.floor(Math.random() * 4 + 1) * 300 + 2000));
    }
    states.level3AddObj = level3AddObj;
    function level3AddFence() {
        //add one fence 
        fences.push(new objects.Fence(stage, game));
    }
    states.level3AddFence = level3AddFence;
    function level3AddCrystal() {
        //add one crystal 
        crystals.push(new objects.Crystal(stage, game));
    }
    states.level3AddCrystal = level3AddCrystal;
    function level3AddGhost() {
        //add one ghost 
        ghosts.push(new objects.Ghost(stage, game));
    }
    states.level3AddGhost = level3AddGhost;
})(states || (states = {}));
//# sourceMappingURL=level3state.js.map