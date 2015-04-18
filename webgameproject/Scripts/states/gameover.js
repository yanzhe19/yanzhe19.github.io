/// <reference path="../constants.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/sea.ts" />
/// <reference path="../objects/scoreboard.ts" />
//this is the game over state function, sea background update for game over state
/*Source  file  name: gameover.ts, Author's  name: Zhe Yan (300706310),  Last  Modified  by: Zhe Yan,
Date  last  Modified: 2015_3_18,  Program description： This file is the game over state file, it controls and create the game over state and scene,
Revision  History : Version 2.0*/
//this is the game state
var states;
(function (states) {
    //update the game over state
    function gameOverState() {
        //update the sea background
        sea.update();
    }
    states.gameOverState = gameOverState;
    // Restart Game when Try Again Button is clicked
    function tryAgainClicked(event) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        //change to play state
        currentState = constants.PLAY_STATE;
        changeState(currentState);
    }
    states.tryAgainClicked = tryAgainClicked;
    // Restart Game when Back to Menu Button is clicked
    function backToMenuClicked(event) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        //change to play state
        currentState = constants.MENU_STATE;
        changeState(currentState);
    }
    states.backToMenuClicked = backToMenuClicked;
    // Game Over Scene
    function gameOver(state) {
        //labels in game over interface
        var gameOverLabel;
        var finalScoreLabel;
        var finalScore;
        // Declare new Game Container
        game = new createjs.Container();
        // Instantiate Game Objects
        sea = new objects.Sea(stage, game);
        // Show Cursor
        stage.cursor = "default";
        // Display Game Over
        gameOverLabel = new objects.Label(stage.canvas.width / 2, 40, "Oh! GAME OVER");
        game.addChild(gameOverLabel);
        // Display Final Score Label
        finalScoreLabel = new objects.Label(stage.canvas.width / 2, 120, "The Final Score you got is:");
        game.addChild(finalScoreLabel);
        // Display Final Score
        finalScore = new objects.Label(stage.canvas.width / 2, 160, scoreboard.score.toString());
        game.addChild(finalScore);
        // Display Try Again Button
        tryAgain = new objects.Button(stage.canvas.width * 3 / 4, 300, "btnTryAgain");
        game.addChild(tryAgain);
        tryAgain.addEventListener("click", tryAgainClicked);
        // Display Back to Menu Button
        backToMenuBtn = new objects.Button(stage.canvas.width / 4, 300, "btnBackMenu");
        game.addChild(backToMenuBtn);
        backToMenuBtn.addEventListener("click", backToMenuClicked);
        //add the game container to stage
        stage.addChild(game);
    }
    states.gameOver = gameOver;
})(states || (states = {}));
//# sourceMappingURL=gameover.js.map