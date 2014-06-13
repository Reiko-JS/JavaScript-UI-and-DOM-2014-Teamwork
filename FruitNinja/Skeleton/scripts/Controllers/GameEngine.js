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
            boundingBox = {
                x: gameFieldOptions.width,
                y: gameFieldOptions.height
            },
            mouseEvents = new MouseEventHandler(),
            fruitsContainer = [];

        addFruit(boundingBox, fruitsContainer);

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

    function addFruit(boundingBox, fruitsContainer) {
        var fruit = getRandomFruit(boundingBox);
        fruitsContainer.push(fruit);
        setTimeout(addFruit, 10000);
    }

    //This is redundant
    /*function generateFruit() {

    }*/

    function updateCanvas() {
        // FruitDrawer
        // MouseEventHandler
        // CollisionDispatcher
        // etc
    }

    function updateResult(points) {

    }

    function endGame() {}

    // Only this is public
    GameEngine.prototype.startGame = function (speedInMs) {};

    return GameEngine;
});
