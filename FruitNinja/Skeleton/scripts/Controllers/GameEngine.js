define(function(require) {
    'use strict';

    var FruitDrawer = require('./FruitDrawer.js'),
        Utility = require('../Helper/Utility.js'),
        FruitLayer = require('../Models/FruitLayer.js'),
        MouseEventHandler = require('./MouseEventHandler.js'),
        CollisionDispatcher = require('./CollisionDispatcher.js'),
        FruitFactory = require('../Models/FruitFactory.js');

    var _mouseEventHandler = null,
        _collisionDispatcher = null,
        _fruitDrawer = null,
        _fruitLayer = null,
        _GameSettings = null;

    var _boundingBox = null,
        _fruitsCollection = [];

    var _isRunning = false;

    FruitFactory.loadImages();

    // Constructor
    function GameEngine(GameSettings) {
        _GameSettings = GameSettings;
        _fruitLayer = new FruitLayer(_GameSettings.stage, _GameSettings.fruitLayerOptions);

        _mouseEventHandler = new MouseEventHandler();
        _collisionDispatcher = new CollisionDispatcher();
        _fruitDrawer = new FruitDrawer(_GameSettings.stage, _fruitLayer);

        _boundingBox = {
            x: {
                min: 100,
                max: _GameSettings.gameFieldOptions.width - 100
            },
            y: {
                min: _GameSettings.gameFieldOptions.height,
                max: _GameSettings.gameFieldOptions.height
            }
        };

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

    //    function updateGame() {
    //        FruitFactory.addNewFruits(_fruitsCollection, _GameSettings.gamePlayOptions.maxFruitsPerRound, _boundingBox);
    //        _fruitDrawer.drawFruits(_fruitsCollection, _collisionDispatcher, _mouseEventHandler);
    //    }

    function updateCanvas() {
        _fruitsCollection = getRandomOfNumberFruits();
        _fruitDrawer.drawFruits(_fruitsCollection, _collisionDispatcher, _mouseEventHandler);
    }

    function attachMouseEvents() {
        // OnMouseMove
        window.onmousemove = function(event) {
            _mouseEventHandler.updateCoords(event, _mouseEventHandler, 500);
        };

        // OnMouseDown
        window.onmousedown = function(event) {
            _mouseEventHandler.mouseDown(event, _mouseEventHandler);
        };

        // OnMouseUp
        window.onmouseup = function(event) {
            _mouseEventHandler.mouseUp(event, _mouseEventHandler);
        };
    }

    function updateResult(points) {}

    function endGame() {}

    // This function is public
    GameEngine.prototype.isRunning = function(speedInMs) {
        return _isRunning;
    };

    // This function is public
    GameEngine.prototype.startGame = function(speedInMs) {
        if (!_isRunning) {
            setInterval(function() {
                updateCanvas();
            }, 2000);

            _isRunning = true;
        }
    };

    return GameEngine;
});