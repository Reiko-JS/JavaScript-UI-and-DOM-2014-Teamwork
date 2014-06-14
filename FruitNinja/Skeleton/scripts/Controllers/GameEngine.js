define(function (require) {
    'use strict';

    var FruitDrawer = require('./FruitDrawer.js'),
        Utility = require('../Helper/Utility.js'),
        //Background = require('../Models/Background.js'),
        FruitLayer = require('../Models/FruitLayer.js'),
        MouseEventHandler = require('./MouseEventHandler.js'),
        CollisionDispatcher = require('./CollisionDispatcher.js'),
        FruitFactory = require('../Models/FruitFactory.js');

    var _mouseEventHandler = null;
    var _collisionDispather = null;
    var _fruitDrawer = null;

    var _boundingBox = null;

    FruitFactory.loadImages();

    // Constructor
    function GameEngine(stage, gameFieldOptions, fruitLayerOptions) {
        //var background = new Background(stage, gameFieldOptions);
        var fruitLayer = new FruitLayer(stage, fruitLayerOptions);

        _mouseEventHandler = new MouseEventHandler();
        _collisionDispather = new CollisionDispatcher();
        _fruitDrawer = new FruitDrawer(stage, fruitLayer);

        _boundingBox = {
            x: {
                min: 100,
                max: gameFieldOptions.width - 100
            },
            y: {
                min: gameFieldOptions.heigh,
                max: gameFieldOptions.height
            }
        };

        //background.draw();
        attachMouseEvents();
    }

    function getRandomOfNumberFruits() {
        var fruitsCollection = [];
        var randomLength = Utility.getRandomNumber(2, 12);
        for (var i = 0; i < randomLength; i++) {
            fruitsCollection.push(FruitFactory.getRandomFruit(_boundingBox));
        }

        return fruitsCollection;
    }

    function updateCanvas() {
        var fruitsCollection = getRandomOfNumberFruits();
        //console.dir(_collisionDispather);
        _fruitDrawer.drawFruits(fruitsCollection, _collisionDispather, _mouseEventHandler);
    }

    function attachMouseEvents() {
        // OnMouseMove
        window.onmousemove = function (event) {
            _mouseEventHandler.updateCoords(event, _mouseEventHandler, 500);
        };

        // OnMouseDown
        window.onmousedown = function (event) {
            _mouseEventHandler.mouseDown(event, _mouseEventHandler);
        };

        // OnMouseUp
        window.onmouseup = function (event) {
            _mouseEventHandler.mouseUp(event, _mouseEventHandler);
        };
    }

    function updateResult(points) {}

    function endGame() {}

    // Only this is public
    GameEngine.prototype.startGame = function (speedInMs) {
        setInterval(function () {
            updateCanvas();
        }, 2000);
    };

    return GameEngine;
});
