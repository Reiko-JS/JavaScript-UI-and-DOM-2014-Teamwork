define(function(require) {
    'use strict';

    var _stage = null;
    var _layerOptions = null;
    var _canvas = null;

    // Constructor
    function CanvasLayer(stage, layerOptions) {
        _stage = stage;
        _layerOptions = layerOptions;
        _canvas = document.getElementById(layerOptions.containerId);
    }

    /// <summary>
    /// Create and draw canvas layer using Kinetic.js
    /// As result returns the layer
    /// </summary>
    CanvasLayer.prototype.getLayer = function() {
        var layer = new Kinetic.Layer();
        layer.canvas._canvas.id = _layerOptions.canvasId;
        _canvas.style.width = _layerOptions.width + 'px';
        _canvas.style.height = _layerOptions.height + 'px';
        _stage.add(layer);
        return layer;
    };

    return CanvasLayer;
});