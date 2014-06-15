define(function(require) {
    'use strict';

    var FruitFactory = require('../Models/FruitFactory.js'),
        Utility = require('../Helper/Utility.js');

    // TODO: save image locally
    var _knigeImg = new Image();
    _knigeImg.src = 'http://www.tricedesigns.com/wp-content/uploads/2012/01/brush2.png';

    var _layerCenterY = null,
        _fruitRadius = 100,
        _currentAngle = 0,
        _fruitImg = null;

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

    /// <summary>
    /// Draws next frame, if the fruits goes out of the canvas -> return false
    /// </summary>
    function drawFruitsAnimation(layer, fruitCollection) {
        var context = getLayerContext(layer);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        var layerCenterY = layer.canvas._canvas.height / 2 - 100;
        _currentAngle += 1.5;

        for (var i = 0; i < fruitCollection.length; i++) {
            var movedPoint = Utility.movePoint({
                x: fruitCollection[i].x,
                y: layerCenterY - 150,
                radius: _fruitRadius,
                angle: _currentAngle,
                factorY: fruitCollection[i].factorY
            }, context.canvas.height, fruitCollection[i].direction);

            fruitCollection[i].mX = movedPoint.x;
            fruitCollection[i].mY = movedPoint.y;

            _fruitImg = getFruitImgSrc(fruitCollection[i]);
            drawImage(context, movedPoint.x + i * 10, movedPoint.y, _fruitImg);

            if (_currentAngle >= 180) {
                fruitCollection = null;
                _currentAngle = 0;
                return false;
            }
        }

        return true;
    }

    /// <summary>
    /// Draws the player earned points
    /// </summary>
    function drawResult(layer, player) {

        // if points haven't changed between the previous drawing and the current, do not redraw
        if (player.points !== player.previousPointsCountState) {

            // var canvas = document.getElementById(layer.canvas._canvas.id);
            // var ctx = canvas.getContext('2d');
            var context = getLayerContext(layer);

            context.clearRect(0, 0, context.canvas.width, context.canvas.height);

            context.font = "30px Georgia";
            var gradient = context.createLinearGradient(0, 0, context.canvas.width, 0);
            gradient.addColorStop("0", "magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1.0", "red");
            // Fill with gradient
            context.fillStyle = gradient;
            context.fillText(player.points + ' points', 10, 50);
        }
    }

    ObjectDrawer.prototype.drawMouseTrails = function(layer, mousePath) {
        drawMouseTrails(layer, mousePath);
    };

    ObjectDrawer.prototype.drawFruits = function(layer, fruitCollection) {
        return drawFruitsAnimation(layer, fruitCollection);
    };

    ObjectDrawer.prototype.drawResult = function(layer, player) {
        return drawResult(layer, player);
    };

    return ObjectDrawer;
});