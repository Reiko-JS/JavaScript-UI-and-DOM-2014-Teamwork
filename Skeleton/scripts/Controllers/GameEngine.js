define(function (require) {
    'use strict';
    /*global window */
    var FruitDrawer = require('./FruitDrawer.js'),
        Background = require('../Models/Background.js'),
        MouseEventHandler = require('./MouseEventHandler.js'),
        CollisionDispatcher = require('./CollisionDispatcher.js');

    // All works is done here

    // Constructor
    function GameEngine(stage, gameFieldOptions) {
        var background = new Background(stage, gameFieldOptions),
            mouseEvents = new MouseEventHandler(),
            fruitsContainer = [];
        background.draw();

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
        window.onmouseup = function (event) {
            mouseEvents.mouseUp(event, mouseEvents);
        };
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
    GameEngine.prototype.startGame = function (speedInMs) {
    };

    return GameEngine;
});