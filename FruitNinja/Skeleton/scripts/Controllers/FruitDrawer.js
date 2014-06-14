define(function (require) {
    'use strict';

    var _context = null;
    var _fruitLayer = null;
    // var _fruitCollection = null;

    // Constructor
    function FruitDrawer(context, fruitLayer, fruitCollecion) {
        _context = context;
        _fruitLayer = fruitLayer.draw(); // draw and return an object
        //  _fruitCollection = fruitCollecion;
    }

    FruitDrawer.prototype.drawFruits = function (_fruitCollection, _collisionDispather, _mouseEventHandler) {
        //console.log(_fruitCollection)
        //for (var i = 0; i < _fruitCollection.length; i++) {
        //    console.log(_fruitCollection[i].coords)
        //    var imageObj = new Image();
        //    imageObj.onload = function () {
        //        var img = new Kinetic.Image({
        //            x: 50,
        //            y: 50,
        //            image: imageObj,
        //            width: 106,
        //            height: 118
        //        });
        //        _fruitLayer.add(img);
        //        console.log('----------------')
        //    }
        //    imageObj.src = 'images/' + _fruitCollection[i].defaultImageSrc;
        //}
        var canvas = document.getElementsByTagName('canvas')[0],
            ctx = canvas.getContext('2d'),
            center = {
                x: canvas.width / 2,
                y: canvas.height / 2 - 100
            },
            radius = 100,
            angle = 0,
            point = {
                radius: 30,
                x: 0,
                y: 0
            };

        //fruit
        function drawPoint(ctx, x, y, r, color) {
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();
        }

        function drawFruit(ctx, x, y, imageObj) {
            /*ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();*/

            ctx.drawImage(imageObj, x, y);
        }

        function movePoint(trajectory, isLeft) {
            var trajRadius = isLeft ? trajectory.radius : -trajectory.radius;

            return {
                x: trajectory.x + trajRadius * Math.cos(trajectory.angle / 180 * Math.PI) / 1.2,
                y: canvas.height - (trajectory.y + trajectory.radius * Math.sin(trajectory.angle / 180 * Math.PI) * trajectory.factorY)
            };
        }

        var shouldRun = true;

        function frame() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            angle += 1.5;

            if (angle >= 200) {
                _fruitCollection = [];
                angle = 0;
            }

            for (var i = 0; i < _fruitCollection.length; i++) {
                var movedPoints = movePoint({
                    x: _fruitCollection[i].x,
                    y: center.y - 150,
                    radius: radius,
                    angle: angle,
                    factorY: _fruitCollection[i].factorY
                }, _fruitCollection[i].direction);

                _collisionDispather.checkForCuttedOffFruits(_mouseEventHandler, _fruitCollection[i], movedPoints.x, movedPoints.y);

                var color = _fruitCollection[i].isCut ? '#ccc' : '#000';
                //drawPoint(ctx, movedPoints.x + i * 10, movedPoints.y, 50, color);


                drawFruit(ctx, movedPoints.x + i * 10, movedPoints.y, imageObj);

                if (movedPoints.y >= 500) {
                    _fruitCollection = null;
                }

                if (angle >= 180) {
                    _fruitCollection = [];
                    angle = 0;
                }
            }

            if (_fruitCollection.length > 0)
                window.requestAnimationFrame(frame);

        }
        var imageObj = new Image();
        imageObj.src = 'images/watermelon.png';
        imageObj.onload = function () {
            frame();
        };
    };

    return FruitDrawer;
});
