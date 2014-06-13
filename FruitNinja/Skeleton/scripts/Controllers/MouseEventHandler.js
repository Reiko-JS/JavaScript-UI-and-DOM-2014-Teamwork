define(function (require) {
    'use strict';
    
    function MouseEventHandler() {
        this.x = null;
        this.y = null;
        this.isMouseDown = false;
    }

    MouseEventHandler.prototype.mouseDown = function (event, mouseObj) {
        mouseObj.isMouseDown = true;
        //console.log(mouseObj.isMouseDown);
    }

    MouseEventHandler.prototype.mouseUp = function (event, mouseObj) {
        mouseObj.isMouseDown = false;
        //console.log(mouseObj.isMouseDown);
    };

    MouseEventHandler.prototype.updateCoords = function (event, mouseObj, updateInterval) {
        if (mouseObj.isMouseDown) {
            event = event || window.event;
            mouseObj.x = event.clientX;
            mouseObj.y = event.clientY;
            //console.dir(mouseObj.getCoords());
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
            return { x: x, y: y }
        })(this.x, this.y);

        console.log(coords);

        return coords;
    };

    return MouseEventHandler;
});