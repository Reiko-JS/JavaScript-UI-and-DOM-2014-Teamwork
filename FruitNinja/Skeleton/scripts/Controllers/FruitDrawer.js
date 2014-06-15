define(function(require) {
    'use strict';

    var FruitFactory = require('../Models/FruitFactory.js'),
        Utility = require('../Helper/Utility.js');

    var _fruitLayer = null;
    var _context = null;

    // TODO save image locally
    var knigeImg = new Image();
    knigeImg.src = 'http://www.tricedesigns.com/wp-content/uploads/2012/01/brush2.png';

    var layerCenter = null,
        fruitRadius = 100;

    // Constructor
    function FruitDrawer(fruitLayer) {
        _fruitLayer = fruitLayer.draw(); // draw and return the fruit layer (Kinetic.js object)
        _context = _fruitLayer.canvas._canvas.getContext('2d');

        layerCenter = {
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

    function drawMouseTrails(context, mousePath) {
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
                drawImage(context, x, y, knigeImg);
            }

            lastPoint = currentPoint;
        }
    }

    function drawFruitsAnimation(fruitCollection, collisionDispather, mouseEventHandler) {
        var angle = 0,
            fruitImg = null,
            movedPoint = null;

        // TODO does many non frame drawing related tasks and is out of place. Needs refactoring!
        function frame() {
            _context.clearRect(0, 0, _context.canvas.width, _context.canvas.height);
            angle += 1.5;

            for (var i = 0; i < fruitCollection.length; i++) {
                var movedPoint = Utility.movePoint({
                    x: fruitCollection[i].x,
                    y: layerCenter.y - 150,
                    radius: fruitRadius,
                    angle: angle,
                    factorY: fruitCollection[i].factorY
                }, _context.canvas.height, fruitCollection[i].direction);

                if (!fruitCollection[i].isCut) {
                    collisionDispather.checkForCuttedOffFruits(mouseEventHandler, fruitCollection[i], movedPoint.x, movedPoint.y);
                }

                fruitImg = getFruitImgSrc(fruitCollection[i]);
                drawImage(_context, movedPoint.x + i * 10, movedPoint.y, fruitImg);

                if (angle >= 180) {
                    fruitCollection = null;
                    angle = 0;
                }
            }

            drawMouseTrails(_context, mouseEventHandler.path);

            if (fruitCollection.length > 0) {
                window.requestAnimationFrame(frame);
            }
        }

        frame();
    }

    FruitDrawer.prototype.drawFruits = function(fruitCollection, collisionDispather, mouseEventHandler) {
        drawFruitsAnimation(fruitCollection, collisionDispather, mouseEventHandler);
    };

    return FruitDrawer;
});