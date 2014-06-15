define(function(require) {
    'use strict';

    var FruitFactory = require('../Models/FruitFactory.js'),
        Utility = require('../Helper/Utility.js');

    var _fruitLayer = null;
    var _context = null;

    // TODO save image locally
    var _knigeImg = new Image();
    _knigeImg.src = 'http://www.tricedesigns.com/wp-content/uploads/2012/01/brush2.png';

    var _layerCenter = null,
        _fruitRadius = 100,
        _currentAngle = 0,
        _fruitImg = null;

    // Constructor
    function ObjectDrawer(fruitLayer) {
        _fruitLayer = fruitLayer.draw(); // draw and return the fruit layer (Kinetic.js object)
        _context = _fruitLayer.canvas._canvas.getContext('2d');

        _layerCenter = {
            x: _fruitLayer.canvas._canvas.width / 2,
            y: _fruitLayer.canvas._canvas.height / 2 - 100
        };
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

    function drawMouseTrails(mousePath) {
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
                drawImage(_context, x, y, _knigeImg);
            }

            lastPoint = currentPoint;
        }
    }

    /// <summary>
    /// Draws next frame, if the fruits goes out of the canvas -> return false
    /// </summary>
    function drawFruitsAnimation(fruitCollection) {
        _context.clearRect(0, 0, _context.canvas.width, _context.canvas.height);
        _currentAngle += 1.5;

        for (var i = 0; i < fruitCollection.length; i++) {
            var movedPoint = Utility.movePoint({
                x: fruitCollection[i].x,
                y: _layerCenter.y - 150,
                radius: _fruitRadius,
                angle: _currentAngle,
                factorY: fruitCollection[i].factorY
            }, _context.canvas.height, fruitCollection[i].direction);

            fruitCollection[i].mX = movedPoint.x;
            fruitCollection[i].mY = movedPoint.y;

            _fruitImg = getFruitImgSrc(fruitCollection[i]);
            drawImage(_context, movedPoint.x + i * 10, movedPoint.y, _fruitImg);

            if (_currentAngle >= 180) {
                fruitCollection = null;
                _currentAngle = 0;
                return false;
            }
        }

        return true;
    }

    ObjectDrawer.prototype.drawMouseTrails = function(mousePath) {
        drawMouseTrails(mousePath);
    };

    ObjectDrawer.prototype.drawFruits = function(fruitCollection) {
        return drawFruitsAnimation(fruitCollection);
    };

    return ObjectDrawer;
});