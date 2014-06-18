define(function (require) {
    'use strict';

    function MouseEventHandler() {
        this.x = null;
        this.y = null;
        this.path = [];
        this.isMouseDown = false;
    }

    MouseEventHandler.prototype.mouseDown = function (event, mouseObj) {
        mouseObj.isMouseDown = true;
        mouseObj.path.push({
            x: event.offsetX || event.layerX,
            y: event.offsetY || event.layerY
        });
        //console.log(mouseObj.isMouseDown);
    }

    MouseEventHandler.prototype.mouseUp = function (event, mouseObj) {
        mouseObj.isMouseDown = false;
        this.path = [];
        //console.log(mouseObj.isMouseDown);
    };

    var timeoutID = null;

    function mouseMoveTimeOut(mouseObj) {
        console.log('mtimeout 1');
        mouseObj.path.shift();
        console.log('mtimeout 2');
        if (mouseObj.path.length != 0)
            timeoutID = setTimeout(function () {
                mouseMoveTimeOut(mouseObj);
            }, 100);
        else
            timeoutID = null;
    }

    MouseEventHandler.prototype.updateCoords = function (event, mouseObj, updateInterval) {
        if (mouseObj.isMouseDown) {
            if (timeoutID !== null) {
                clearTimeout(timeoutID);
            }
            timeoutID = setTimeout(function () {
                mouseMoveTimeOut(mouseObj);
            }, 100);

            event = event || window.event;
            if (mouseObj.path.length > 10) {
                mouseObj.path.shift();
            }

            mouseObj.path.push({
                x: event.offsetX || event.layerX,
                y: event.offsetY || event.layerY
            });
        }
    };

    MouseEventHandler.prototype.getCoords = function () {
        if (this.x == null || this.y == null) {
            throw {
                message: 'Coordinates are not set yet',
                name: 'NullCoordinatesException'
            }
        }

        var coords = (function (x, y) {
            return {
                x: x,
                y: y
            }
        })(this.x, this.y);

        console.log(coords);

        return coords;
    };

    return MouseEventHandler;
});
