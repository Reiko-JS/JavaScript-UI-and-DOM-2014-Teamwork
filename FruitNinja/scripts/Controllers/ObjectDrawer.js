define(function (require) {
    'use strict';

    var FruitFactory = require('../Models/FruitFactory.js'),
        Utility = require('../Helper/Utility.js');

    // TODO: save image locally
    var _knigeImg = new Image();
    _knigeImg.src = 'images/brush.png';

    var _layerCenterY = null,
        _fruitRadius = 100,
        _currentAngle = 0,
        _fruitImg = null,
        _prevFrameTime = null,
        _ellapsedTime = 0,
        _physicsFramesCount = 0,
        _physicsFramesRate = 100; //the physics are calculated 100 times per second

    // Constructor
    function ObjectDrawer() {}

    function getLayerContext(layer) {
        var context = layer.canvas._canvas.getContext('2d');
        return context;
    }

    function getFruitImgSrc(fruit) {
        var image = fruit.isCut ? fruit.hitImageSrc : fruit.defaultImageSrc;
        return image;
    }

    /// <summary>
    /// Draws a image on specified position
    /// </summary>
    function drawImage(context, x, y, img) {
        context.drawImage(img, x, y);
    }

    function drawMouseTrails(layer, mousePath) {
        var context = getLayerContext(layer);
        var lastPoint, currentPoint, distance, angle, x, y;

        for (var i = 1; i < mousePath.length; i++) {
            lastPoint = {
                x: mousePath[i - 1].x,
                y: mousePath[i - 1].y
            };
            currentPoint = {
                x: mousePath[i].x,
                y: mousePath[i].y
            };

            distance = Utility.calcDistanceBetweenTwoPoints(lastPoint, currentPoint);
            angle = Utility.calcAngleBetweenTwoPoints(lastPoint, currentPoint);

            for (var j = 0; j < distance; j++) {
                x = lastPoint.x + (Math.sin(angle) * j) - 15;
                y = lastPoint.y + (Math.cos(angle) * j) - 15;
                drawImage(context, x, y, _knigeImg);
            }

            lastPoint = currentPoint;
        }
    }

    function getNewPhysicsFramesCount() {
        var newPhysicsFrames = 0;
        if (_prevFrameTime === null) {
            //this is the first frame drawn
            _prevFrameTime = new Date().getTime();
        } else {
            var time = new Date().getTime(),
                deltaTime = time - _prevFrameTime;
            _ellapsedTime += (deltaTime < 500) ? deltaTime : 0; //don't count the time when the browser window was hidden for >0.5 sec
            var totalPhysicsFrames = (_ellapsedTime / 1000) * _physicsFramesRate; //time*rate
            newPhysicsFrames = totalPhysicsFrames - _physicsFramesCount;
            _physicsFramesCount = totalPhysicsFrames;
            _prevFrameTime = time;
        }
        return newPhysicsFrames;
    }
    /// <summary>
    /// Draws next frame, if the fruits goes out of the canvas -> return false
    /// </summary>
    function drawFruitsAnimation(layer, fruitCollection) {

        var newPhysicsFrames = getNewPhysicsFramesCount(),
            context = getLayerContext(layer),
            layerCenterY = layer.canvas._canvas.height / 2 - 100;

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        for (var i = 0; i < newPhysicsFrames; i++) {
            _currentAngle += 0.7;
            if (!animateFruits(context, fruitCollection, layerCenterY)) {
                return false;
            }
        }

        drawFruits(context, fruitCollection);
        return true;

    }

    function animateFruits(context, fruitCollection, layerCenterY) {
        for (var i = 0; i < fruitCollection.length; i++) {
            var movedPoint = Utility.movePoint({
                x: fruitCollection[i].x,
                y: layerCenterY - 150,
                radius: _fruitRadius,
                angle: _currentAngle,
                factorY: fruitCollection[i].factorY
            }, context.canvas.height, fruitCollection[i].direction, fruitCollection[i].isCut);

            fruitCollection[i].mX = movedPoint.x;
            fruitCollection[i].mY = movedPoint.y;

            if (_currentAngle >= 180) {
                fruitCollection = null;
                _currentAngle = 0;
                return false;
            }
        }
        return true;
    }

    function drawFruits(context, fruitCollection) {
        for (var i = 0; i < fruitCollection.length; i++) {

            _fruitImg = getFruitImgSrc(fruitCollection[i]);
            drawImage(context, fruitCollection[i].mX + i * 10, fruitCollection[i].mY, _fruitImg);

            if (_currentAngle >= 180) {
                fruitCollection = null;
                _currentAngle = 0;
                return false;
            }
        }
    }

    /// <summary>
    /// Draws the player earned points
    /// </summary>
    function drawResult(layer, points) {
        var context = getLayerContext(layer);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.font = "30px Georgia";

        var gradient = context.createLinearGradient(0, 0, context.canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");

        // Fill with gradient
        context.fillStyle = gradient;
        context.fillText(points + ' points', 10, 50);
    }

    ObjectDrawer.prototype.drawMouseTrails = function (layer, mousePath) {
        drawMouseTrails(layer, mousePath);
    };

    ObjectDrawer.prototype.drawFruits = function (layer, fruitCollection) {
        return drawFruitsAnimation(layer, fruitCollection);
    };

    ObjectDrawer.prototype.drawResult = function (layer, player) {
        return drawResult(layer, player);
    };

    return ObjectDrawer;
});
