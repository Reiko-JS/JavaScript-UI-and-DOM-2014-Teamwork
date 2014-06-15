define(function(require) {
    'use strict';

    var ObjectDrawer = require('./ObjectDrawer.js'),
        Utility = require('../Helper/Utility.js'),
        CanvasLayer = require('../Models/CanvasLayer.js'),
        MouseEventHandler = require('./MouseEventHandler.js'),
        CollisionDispatcher = require('./CollisionDispatcher.js'),
        FruitFactory = require('../Models/FruitFactory.js'),
        Player = require('../Models/Player.js');

    var _GameSettings = null,
        _fruitLayer = null,
        _mouseEventHandler = null,
        _collisionDispatcher = null,
        _objectDrawer = null,
        _player = null,
        _playerResultsLayer = null;

    var _boundingBox = null,
        _fruitsCollection = [],
        _isRunning = false;

    // Constructor
    function GameEngine(GameSettings) {
        FruitFactory.loadImages();
        _GameSettings = GameSettings;
        _mouseEventHandler = new MouseEventHandler();
        _collisionDispatcher = new CollisionDispatcher();
        _objectDrawer = new ObjectDrawer();
        _player = new Player(_GameSettings.playerOptions);

        var fruitCanvasLayer = new CanvasLayer(_GameSettings.stage, _GameSettings.fruitLayerOptions);
        _fruitLayer = fruitCanvasLayer.getLayer();

        var playerResultCanvasLayer = new CanvasLayer(_GameSettings.stage, _GameSettings.playerLayerOptions);
        _playerResultsLayer = playerResultCanvasLayer.getLayer();

        _boundingBox = {
            x: {
                min: 100,
                max: _GameSettings.gameFieldOptions.width - 200
            },
            y: {
                min: _GameSettings.gameFieldOptions.height,
                max: _GameSettings.gameFieldOptions.height
            }
        };
        _fruitsCollection = getRandomOfNumberFruits(_boundingBox);

        attachMouseEvents();
    }

    /// <summary>
    /// Gets a random ammount of randfom fruits
    /// </summary>
    function getRandomOfNumberFruits(boundingBox) {
        var fruitsCollection = [];
        var randomLength = Utility.getRandomNumber(2, 12);
        for (var i = 0; i < randomLength; i++) {
            fruitsCollection.push(FruitFactory.getRandomFruit(boundingBox));
        }
        return fruitsCollection;
    }

    //    function updateGame() {
    //        FruitFactory.addNewFruits(_fruitsCollection, _GameSettings.gamePlayOptions.maxFruitsPerRound, _boundingBox);
    //        _fruitDrawer.drawFruits(_fruitsCollection, _collisionDispatcher, _mouseEventHandler);
    //    }

    function updateCanvas() {
        var isDrawn = _objectDrawer.drawFruits(_fruitLayer, _fruitsCollection);
        var collectedPoints = 0;

        // TODO: Which of these function must be first ???
        if (_mouseEventHandler.isMouseDown) {
            collectedPoints = _collisionDispatcher.checkForCuttedOffFruits(_mouseEventHandler.path, _fruitsCollection);
            _objectDrawer.drawMouseTrails(_fruitLayer, _mouseEventHandler.path);

            // if points haven't changed between the previous drawing and the current, do not redraw
            if (collectedPoints !== 0) {
                _player.updatePoints(collectedPoints);
                _objectDrawer.drawResult(_playerResultsLayer, _player.points);
            }
        }

        if (isDrawn !== false) {
            window.requestAnimationFrame(updateCanvas);
        }
        else {
            _fruitsCollection = getRandomOfNumberFruits(_boundingBox);
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