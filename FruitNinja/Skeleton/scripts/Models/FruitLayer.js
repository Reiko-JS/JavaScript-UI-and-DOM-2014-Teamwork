define(function (require) {
    'use strict';

    var _stage = null;
    var _fruitLayerOptions = null;
    var _canvas = null;

    // Constructor
    function FruitLayer(stage, fruitLayerOptions) {
        _stage = stage;
        _fruitLayerOptions = fruitLayerOptions;
        _canvas = document.getElementById(fruitLayerOptions.containerId);
    }

    // Use Kinetic.js
    FruitLayer.prototype.draw = function () {
        var fruitLayer = new Kinetic.Layer();
        fruitLayer.canvas._canvas.id = _fruitLayerOptions.canvasId;
        var gameField = _fruitLayerOptions;

        _canvas.style.width = gameField.width + 'px';
        _canvas.style.height = gameField.height + 'px';

        _stage.add(fruitLayer);
        return fruitLayer;
    };

    return FruitLayer;
});