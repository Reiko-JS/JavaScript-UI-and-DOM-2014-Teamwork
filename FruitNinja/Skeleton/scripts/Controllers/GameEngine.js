define(function(require) {
    'use strict';

    var ObjectDrawer = require('./ObjectDrawer.js'),
        Utility = require('../Helper/Utility.js'),
        FruitLayer = require('../Models/FruitLayer.js'),
        MouseEventHandler = require('./MouseEventHandler.js'),
        CollisionDispatcher = require('./CollisionDispatcher.js'),
        FruitFactory = require('../Models/FruitFactory.js');

    var _GameSettings = null,
        _fruitLayer = null,
        _mouseEventHandler = null,
        _collisionDispatcher = null,
        _fruitDrawer = null;

    var _boundingBox = null,
        _fruitsCollection = [],
        _isRunning = false;

    // Constructor
    function GameEngine(GameSettings) {
        FruitFactory.loadImages();

        _GameSettings = GameSettings;
        _fruitLayer = new FruitLayer(_GameSettings.stage, _GameSettings.fruitLayerOptions);

        _mouseEventHandler = new MouseEventHandler();
        _collisionDispatcher = new CollisionDispatcher();
        _fruitDrawer = new ObjectDrawer(_fruitLayer);

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
        _fruitsCollection = getRandomOfNumberFruits();

        attachMouseEvents();
    }

    /// <summary>
    /// Gets a random ammount of randfom fruits
    /// </summary>
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
        var isDrawn = _fruitDrawer.drawFruits(_fruitsCollection);

        // TODO: Which of these function must be first ???
        if (_mouseEventHandler.isMouseDown) {
            _collisionDispatcher.checkForCuttedOffFruits(_mouseEventHandler.path, _fruitsCollection);
        }

        _fruitDrawer.drawMouseTrails(_mouseEventHandler.path);

        if (isDrawn !== false) {
            window.requestAnimationFrame(updateCanvas);
        }
        else {
            _fruitsCollection = getRandomOfNumberFruits();
        }
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