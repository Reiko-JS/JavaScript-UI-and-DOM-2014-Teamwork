define(function(require) {
    'use strict';

    var _gameEngine = null;
    var _EventSettings = null;
    var _startGameSound = null;

    // Constructor
    function EventListener(gameEngine, EventSettings) {
        _gameEngine = gameEngine;
        _EventSettings = EventSettings;
        _startGameSound = new Audio(_EventSettings.startGameSoundSrc);
    }

    function startGame() {
        if (!_gameEngine.isRunning()) {
            _gameEngine.startGame();
            _startGameSound.play();
        }
    }

    function resizeFieldOnToggleFullScreenMode(sender, btnIdToShow, isInFC) {
        $(_EventSettings.gameFieldId).css('padding-top', isInFC ? '240px' : '0');
        $(_EventSettings.backgroundLayerId).css('margin-top', isInFC ? '-120px' : '');
        $('html').css('height', isInFC ? '100%' : '');
        $('body').css('height', isInFC ? '100%' : '');
        $(btnIdToShow).show();
        $(sender).hide();
    }

    function tryToggleFullscreenMode() {
        var docElement, request;

        docElement = document.documentElement;
        request = docElement.requestFullScreen || docElement.webkitRequestFullScreen || docElement.mozRequestFullScreen || docElement.msRequestFullScreen;

        if (typeof request != "undefined" && request) {
            request.call(docElement);
            return true;
        }

        return false;
    }

    /// <summary>
    /// Cancel fullscreen for browsers that support it!
    /// </summary>
    function tryExitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            return true;
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            return true;
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            return true;
        }

        return false;
    }

    // Public function
    EventListener.prototype.setButtonEvents = function(gameEngine) {
        // On Start button click - starts the game
        $(_EventSettings.startGameButtonId).on("click", startGame);

        // Start fullscreen mode Button
        $(_EventSettings.toggleFullscreenButtonId).on('click', function() {
            if (tryToggleFullscreenMode()) {
                resizeFieldOnToggleFullScreenMode($(this), _EventSettings.exitFullscreenButtonId, true);
            }

            startGame();
        });

        // Exit from fullscreen mode Button
        $(_EventSettings.exitFullscreenButtonId).on('click', function() {
            if (tryExitFullscreen()) {
                resizeFieldOnToggleFullScreenMode($(this), _EventSettings.toggleFullscreenButtonId, false);
            }
        });
    };

    return EventListener;
});