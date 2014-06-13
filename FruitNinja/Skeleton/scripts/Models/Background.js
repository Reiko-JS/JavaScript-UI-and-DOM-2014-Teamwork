define(function(require) {
    'use strict';

    var _stage = null;
    var _gameFieldOptions = null;
    var _canvas = null;

    // Constructor
    function Background(stage, gameFieldOptions) {
        _stage = stage;
        _gameFieldOptions = gameFieldOptions;
        _canvas = document.getElementById(gameFieldOptions.containerId);
    }

    // Use Kinetic.js
    Background.prototype.draw = function() {
        var gameFieldLayer = new Kinetic.Layer();
        var gameField = _gameFieldOptions;

        _canvas.style.backgroundColor = gameField.colors.brown;
        _canvas.style.width = gameField.width + 'px';
        _canvas.style.height = gameField.height + 'px';

        var gameFieldCenter = {
            x: Math.round(gameField.width / 2),
            y: Math.round(gameField.height / 2),
            r: function() {
                return Math.min(gameField.width, gameField.height) * 0.8;
            }
        };

        var hexagon = new Kinetic.Path({
            x: (gameField.width - gameFieldCenter.r()) / 2,
            y: (gameField.height - gameFieldCenter.r()) / 2,
            data: 'M' + gameFieldCenter.r() / 3 + ' 0' +
                'L' + (gameFieldCenter.r() / 1.5) + ' 0' +
                'L' + gameFieldCenter.r() + ' ' + gameFieldCenter.r() / 3 +
                'L' + gameFieldCenter.r() + ' ' + gameFieldCenter.r() / 1.5 +
                'L' + gameFieldCenter.r() / 1.5 + ' ' + gameFieldCenter.r() +
                'L' + gameFieldCenter.r() / 3 + ' ' + gameFieldCenter.r() +
                'L' + 0 + ' ' + gameFieldCenter.r() / 1.5 +
                'L' + 0 + ' ' + gameFieldCenter.r() / 3 + 'Z',
            fill: gameField.colors.darkBrown,
            stroke: gameField.colors.darkBrown,
            opacity: 0.4,
            shadowColor: gameField.colors.darkBrown,
            shadowBlur: 10,
            shadowOffset: {
                x: 10,
                y: 10
            },
            shadowOpacity: 0.5
        });

        var inIanCircle = new Kinetic.Circle({
            x: gameFieldCenter.x,
            y: gameFieldCenter.y,
            radius: gameFieldCenter.r() * 0.4,
            fill: 'black',
            opacity: 0.2
        });

        var inIanImg = new Image();
        inIanImg.onload = function() {
            var obj = {
                x: gameFieldCenter.x - gameFieldCenter.r() / 3.5,
                y: gameFieldCenter.y - gameFieldCenter.r() / 4,
                image: inIanImg,
                width: gameFieldCenter.r() * 0.6,
                height: gameFieldCenter.r() * 0.5,
                opacity: 0.4
            };

            var inIan = new Kinetic.Image(obj);
            gameFieldLayer.add(inIan);
            _stage.add(gameFieldLayer);
        };

        inIanImg.src = gameField.imgSrc;

        gameFieldLayer.add(hexagon);
        gameFieldLayer.add(inIanCircle);
        _stage.add(gameFieldLayer);
    };

    return Background;
});