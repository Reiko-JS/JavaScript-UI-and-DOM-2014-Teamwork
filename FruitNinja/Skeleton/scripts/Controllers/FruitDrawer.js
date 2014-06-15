define(function(require) {
    'use strict';

    var FruitFactory = require('../Models/FruitFactory.js'),
        Utility = require('../Helper/Utility.js');

    var _context = null;
    var _fruitLayer = null;

    // TODO save image locally
    var knigeImg = new Image();
    knigeImg.src = 'http://www.tricedesigns.com/wp-content/uploads/2012/01/brush2.png';

    // Constructor
    function FruitDrawer(context, fruitLayer, fruitCollecion) {
        _context = context;
        _fruitLayer = fruitLayer.draw(); // draw and return an object
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

    function drawMouseTrails(ctx, mouseEventHandler) {
        var lastPoint, currentPoint, distance, angle, x, y;

        for (var i = 1; i < mouseEventHandler.path.length; i++) {
            lastPoint = {
                x: mouseEventHandler.path[i - 1].x,
                y: mouseEventHandler.path[i - 1].y
            };
            currentPoint = {
                x: mouseEventHandler.path[i].x,
                y: mouseEventHandler.path[i].y
            };

            distance = Utility.calcDistanceBetweenTwoPoints(lastPoint, currentPoint);
            angle = Utility.calcAngleBetweenTwoPoints(lastPoint, currentPoint);

            for (var j = 0; j < distance; j++) {
                x = lastPoint.x + (Math.sin(angle) * j) - 15;
                y = lastPoint.y + (Math.cos(angle) * j) - 15;
                drawImage(ctx, x, y, knigeImg);
            }

            lastPoint = currentPoint;
        }
    }

    FruitDrawer.prototype.drawFruits = function(_fruitCollection, _collisionDispather, mouseEventHandler) {
        var canvas = document.getElementById(_fruitLayer.canvas._canvas.id);
        var ctx = canvas.getContext('2d');
        ctx.lineJoin = ctx.lineCap = 'round'; // TODO 

        var center = {
                x: canvas.width / 2,
                y: canvas.height / 2 - 100
            },
            radius = 100,
            angle = 0;

        // TODO does many non frame drawing related tasks and is out of place. Needs refactoring!
        function frame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            angle += 1.5;

            for (var i = 0; i < _fruitCollection.length; i++) {
                var point = {
                    x: _fruitCollection[i].x,
                    y: center.y - 150,
                    radius: radius,
                    angle: angle,
                    factorY: _fruitCollection[i].factorY
                };

                var movedPoints = Utility.movePoint(point, canvas.height, _fruitCollection[i].direction);

                _collisionDispather.checkForCuttedOffFruits(mouseEventHandler, _fruitCollection[i], movedPoints.x, movedPoints.y);

                var fruitImg = getFruitImgSrc(_fruitCollection[i]);
                drawImage(ctx, movedPoints.x + i * 10, movedPoints.y, fruitImg);
            }

            drawMouseTrails(ctx, mouseEventHandler);

            if (_fruitCollection.length > 0) {
                window.requestAnimationFrame(frame);
            }
        }

        frame();
    };

    return FruitDrawer;
});