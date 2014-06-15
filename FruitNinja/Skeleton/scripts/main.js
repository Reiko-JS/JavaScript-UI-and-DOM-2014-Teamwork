define(function(require) {
    'use strict';

    var GameEngine = require('scripts/Controllers/GameEngine.js'),
        EventListener = require('scripts/Controllers/EventListener.js'),
        Background = require('scripts/Models/Background.js'),
        GameSettings = require('scripts/Models/GameSettings.js');

    var gameEngine = new GameEngine(GameSettings);

    var eventListener = new EventListener(gameEngine, GameSettings.eventListenerOptions);
    eventListener.setButtonEvents();

    var background = new Background(GameSettings.stage, GameSettings.gameFieldOptions);
    background.draw();
});