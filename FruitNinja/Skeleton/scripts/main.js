define(function (require) {
    'use strict';

    var GameEngine = require('scripts/Controllers/GameEngine.js');

    var gameFieldOptions = {
        containerId: 'game-field',
        width: 1000,
        height: 500,
        colors: {
            brown: '#673720',
            darkBrown: '#401c10'
        },
        imgSrc: 'images/nin.png'
    };

    var fruitLayerOptions = {
        containerId: 'game-field',
        canvasId: 'fruit-layer',
        width: 1000,
        height: 500,
    };

    var stage = new Kinetic.Stage({
        container: 'game-field',
        width: gameFieldOptions.width,
        height: gameFieldOptions.height
    });

    var gameEngine = new GameEngine(stage, gameFieldOptions, fruitLayerOptions);
    gameEngine.startGame();
    
    /* ----------------------------------------------------------------------------- */

    //function onButtonStart() {
    //    if (gameEngine === undefined) {
    //        var gameEngine = new GameEngine(stage, gameFieldOptions);
    //        gameEngine.startGame();
    //    }
    //}

    //var background = new Background(stage, gameFieldOptions);
    //background.draw();

    //document.getElementById("start").addEventListener("click", onButtonStart);
});
