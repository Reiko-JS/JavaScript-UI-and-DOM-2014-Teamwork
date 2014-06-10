define(function(require) {

    var FruitDrawer = require('./FruitDrawer.js');
    var MouseEventHandler = require('./MouseEventHandler.js');
    var CollisionDispatcher = require('./CollisionDispatcher.js');

    // All works is done here

    // Constructor
    function GameEngine(context) {
        fruitDrawer = new FruitDrawer(context);
        // ...
    }

    function addFruit() {
    }

    function updateCanvas() {
        // FruitDrawer
        // MouseEventHandler
        // CollisionDispatcher
        // etc
    }

    function endGame() {
    }

    // Only this is public
    GameEngine.prototype.startGame = function(speedInMs) {
    };

    return GameEngine;
});