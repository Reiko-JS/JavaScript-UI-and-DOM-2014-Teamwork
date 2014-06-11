define(function(require) {

    var FruitDrawer = require('./FruitDrawer.js');
    var Background = require('../Models/Background.js');
    var MouseEventHandler = require('./MouseEventHandler.js');
    var CollisionDispatcher = require('./CollisionDispatcher.js');

    // All works is done here

    // Constructor
    function GameEngine(stage, gameFieldOptions) {
        var background = new Background(stage, gameFieldOptions);
        background.draw();

        //fruitDrawer = new FruitDrawer(stage);
        // ...
    }

    function addFruit() {

    }

    function generateFruit() {
    }

    function updateCanvas() {
        // FruitDrawer
        // MouseEventHandler
        // CollisionDispatcher
        // etc
    }

    function updateResult(points) {

    }

    function endGame() {
    }

    // Only this is public
    GameEngine.prototype.startGame = function(speedInMs) {
    };

    return GameEngine;
});