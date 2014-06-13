define(function (require) {
    'use strict';

    var FruitDrawer = require('./FruitDrawer.js'),
        Background = require('../Models/Background.js'),
        MouseEventHandler = require('./MouseEventHandler.js'),
        CollisionDispatcher = require('./CollisionDispatcher.js'),
        FruitFactory = require('../Models/FruitFactory.js');

    var _boundingBox = null;
    var _fruitsCollection = null;

    // Constructor
    function GameEngine(stage, gameFieldOptions) {
        var background = new Background(stage, gameFieldOptions),
            mouseEventHandler = new MouseEventHandler(),
            collisionDispather = new CollisionDispatcher(),
            fruitDrawer = new FruitDrawer(stage);

        _fruitsCollection = [];
        _boundingBox = {
            x: {
                min: 0,
                max: gameFieldOptions.width
            },
            y: {
                min: 0,
                max: gameFieldOptions.height
            }
        };

        //TODO fix the function
        addFruit(_boundingBox, _fruitsCollection);

        background.draw();
        attachMouseEvents(mouseEventHandler);
    }
    
    function addFruit() {
        var fruit = FruitFactory.getRandomFruit(_boundingBox);
        console.log(fruit) // TODO
        _fruitsCollection.push(fruit);

        setTimeout(function () {
            addFruit();
        }, 5000); //10s (I think...)
    }

    function attachMouseEvents(mouseEvents) {
        // OnMouseMove
        window.onmousemove = function (event) {
            mouseEvents.updateCoords(event, mouseEvents, 500);
        };

        // OnMouseDown
        window.onmousedown = function (event) {
            mouseEvents.mouseDown(event, mouseEvents);
        };

        // OnMouseUp
        window.onmouseup = function (event) {
            mouseEvents.mouseUp(event, mouseEvents);
        };
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