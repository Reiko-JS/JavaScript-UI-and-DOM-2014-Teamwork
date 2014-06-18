define(function (require) {
    'use strict';

    var _EventSettings = null,
        _slashSound = null,
        _timeoutID = null,
        _soundTimeoutID = null,
        _slashPosition = null,
        _prevPosition = null;

    function MouseEventHandler(EventSettings) {
        this.x = null;
        this.y = null;
        this.path = [];
        this.isMouseDown = false;
        _EventSettings = EventSettings;
        _EventSettings = EventSettings;
        initSlashSound();
    }

    MouseEventHandler.prototype.mouseDown = function (event, mouseObj) {
        mouseObj.isMouseDown = true;
        mouseObj.path.push({
            x: event.offsetX || event.layerX,
            y: event.offsetY || event.layerY
        });
    };

    function initSlashSound() {
        _slashSound = new Audio(_EventSettings.slashSoundSrc);
    };

    function startSlashSound() {
        if (_slashSound.paused) {
            _slashSound.currentTime = 0.3;
            _slashSound.play();
            return true;
        }
        return false;
    };

    function restartSlashSound() {
        _slashSound.currentTime = 0.3;
        if (_slashSound.paused) {
            _slashSound.play();
        }
    };

    function stopSlashSound() {
        _slashSound.pause();
    };

    MouseEventHandler.prototype.mouseUp = function (event, mouseObj) {
        mouseObj.isMouseDown = false;
        this.path = [];
        stopSlashSound();
        //console.log(mouseObj.isMouseDown);
    };

    function mouseMoveTimeOut(mouseObj) {
        mouseObj.path.shift();
        if (mouseObj.path.length != 0)
            _timeoutID = setTimeout(function () {
                mouseMoveTimeOut(mouseObj);
            }, 100);
        else
            _timeoutID = null;
    }

    MouseEventHandler.prototype.updateCoords = function (event, mouseObj, updateInterval) {
        if (mouseObj.isMouseDown) {
            if (_timeoutID !== null) {
                clearTimeout(_timeoutID);
            }
            _timeoutID = setTimeout(function () {
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
            if (startSlashSound()) {
                //just started playing the sound, remember the position
                _slashPosition = {
                    x: event.layerX,
                    y: event.layerY
                };
                _prevPosition = {
                    x: event.layerX,
                    y: event.layerY
                };
            } else {
                //sound is alreasy playing
                var slashVecX = event.layerX - _slashPosition.x,
                    slashVecY = event.layerY - _slashPosition.y,
                    moveX = event.layerX - _prevPosition.x,
                    moveY = event.layerY - _prevPosition.y;
                if (slashVecX * moveX + slashVecY * moveY < 0 && (Math.abs(moveX) + Math.abs(moveY)) > 32) {
                    //changed slash direction
                    restartSlashSound();
                }
                _prevPosition.x = event.layerX;
                _prevPosition.y = event.layerY;
            }
        }
    };

    MouseEventHandler.prototype.getCoords = function () {
        if (this.x == null || this.y == null) {
            throw {
                message: 'Coordinates are not set yet',
                name: 'NullCoordinatesException'
            };
        }

        var coords = (function (x, y) {
            return {
                x: x,
                y: y
            };
        })(this.x, this.y);

        //console.log(coords);

        return coords;
    };

    return MouseEventHandler;
});
