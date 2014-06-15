define(function(require) {
    'use strict';

    var gamePlayOptions = {
        maxFruitsPerRound: 6
    };

    var gameFieldOptions = {
        containerId: 'game-field',
        canvasId: 'background-layer',
        width: 1000,
        height: 500,
        colors: {
            brown: '#673720',
            darkBrown: '#401c10'
        },
        imgSrc: 'images/nin.png'
    };

    var fruitLayerOptions = {
        containerId: 'game-field',
        canvasId: 'fruit-layer',
        width: 1000,
        height: 500
    };

    var eventListenerOptions = {
        startGameButtonId: '#start',
        exitFullscreenButtonId: '#exit-fullscreen',
        toggleFullscreenButtonId: '#fullscreen',
        gameFieldId: '#game-field',
        backgroundLayerId: '#background-layer',
        startGameSoundSrc: 'sounds/gong.wav'
    };

    var stage = new Kinetic.Stage({
        container: 'game-field',
        width: gameFieldOptions.width,
        height: gameFieldOptions.height
    });

    return {
        gameFieldOptions: gameFieldOptions,
        fruitLayerOptions: fruitLayerOptions,
        eventListenerOptions: eventListenerOptions,
        stage: stage,
        gamePlayOptions: gamePlayOptions
    };
});