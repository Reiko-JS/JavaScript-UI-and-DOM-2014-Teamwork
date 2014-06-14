define(function(require) {
    'use strict';

    var GameEngine = require('scripts/Controllers/GameEngine.js'),
        Background = require('scripts/Models/Background.js');

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
        height: 500,
    };

    var stage = new Kinetic.Stage({
        container: 'game-field',
        width: gameFieldOptions.width,
        height: gameFieldOptions.height
    });

    var gameEngine = null;
    var audio = new Audio('sounds/gong.mp3');
    //temporerally disabled start button
    function onButtonStart() {
        if (!gameEngine) {
            gameEngine = new GameEngine(stage, gameFieldOptions, fruitLayerOptions);
            gameEngine.startGame();

            audio.play();
        }
    }
    document.getElementById("start").addEventListener("click", onButtonStart);

    $("#fullscreen").on('click', function() {
        var docElement, request;

        docElement = document.documentElement;
        request = docElement.requestFullScreen || docElement.webkitRequestFullScreen || docElement.mozRequestFullScreen || docElement.msRequestFullScreen;

        if (typeof request != "undefined" && request) {
            request.call(docElement);
        }

        if (!gameEngine) {
            gameEngine = new GameEngine(stage, gameFieldOptions, fruitLayerOptions);
            gameEngine.startGame();
            audio.play();
        }

        $('#game-field').css('padding-top', '240px');
        // $('#fruit-layer').css('margin-top', '120px');
        $('#background-layer').css('margin-top', '-120px');

        $('html').css('height', '100%');
        $('body').css('height', '100%');

        $('#exit-fullscreen').show();
        $(this).hide();
    });


    $("#exit-fullscreen").on('click', function() {
        function exitFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }

        // Cancel fullscreen for browsers that support it!
        exitFullscreen()

        $('#game-field').css('padding-top', '0');
        $('#background-layer').css('margin-top', '0');

        $('html').css('height', '');
        $('body').css('height', '');

        $('#fullscreen').show();
        $(this).hide();
    });

    // //should be done in onButtonStart
    // gameEngine = new GameEngine(stage, gameFieldOptions, fruitLayerOptions);
    // gameEngine.startGame();


    var background = new Background(stage, gameFieldOptions);
    background.draw();

});