define(function (require) {
    'use strict';

    var GameEngine = require('scripts/Controllers/GameEngine.js'),
        Background = require('scripts/Models/Background.js');

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

    var gameEngine = null;

    //temporerally disabled start button
    /*function onButtonStart() {
        if (!gameEngine) {
            gameEngine = new GameEngine(stage, gameFieldOptions, fruitLayerOptions);
            gameEngine.startGame();
        }
    }
    document.getElementById("start").addEventListener("click", onButtonStart);*/

    //should be done in onButtonStart
    gameEngine = new GameEngine(stage, gameFieldOptions, fruitLayerOptions);
    gameEngine.startGame();

    var background = new Background(stage, gameFieldOptions);
    background.draw();


});
