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
		var mouseEvents = new MouseEventHandler();

        attachEvents(mouseEvents);
        //fruitDrawer = new FruitDrawer(stage);
        // ...
    }
	
	function attachEvents(mouseEvents) {
        window.onmousemove = function (event) {
            mouseEvents.updateCoords(event, mouseEvents, 500);
        };
        window.onmousedown = function (event) {
            mouseEvents.mouseDown(event, mouseEvents);
        };
        window.onmouseup = function (event) { mouseEvents.mouseUp(event, mouseEvents); };
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