define(function (require) {
    'use strict';

    var _gameEngine = null;
    var _EventSettings = null;
    var _startGameSound = null;
    var _backgroundThemeSong = null;
    var _isIE = null;

    // Constructor
    function EventListener(gameEngine, EventSettings) {
        _gameEngine = gameEngine;
        _EventSettings = EventSettings;
        _startGameSound = new Audio(_EventSettings.startGameSoundSrc);
        _backgroundThemeSong = new Audio(_EventSettings.gameThemeSong);
        _isIE = detectIE();
    }

    /// <summary>
    /// When some of the start buttons is clicked - starts the game if it is not started already
    /// </summary>
    function startGame() {
        if (!_gameEngine.isRunning()) {
            _gameEngine.startGame();

            if (_isIE) {
                playMusicOnOldBrowsers(_EventSettings.startGameSoundSrc);
                playMusicOnOldBrowsers(_EventSettings.gameThemeSong);
            } else {
                _startGameSound.play();
                loopMusic(_backgroundThemeSong);
            }
        }
    }

    function loopMusic(musicElement) {
        musicElement.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);

        musicElement.play();
    }

    function playMusicOnOldBrowsers(src) {
        $('<object/>')
            .attr('data', src)
            .attr('type', 'audio/' + src.split('.').pop())
            .hide()
            .append($('<embed/>').attr('src', src))
            .appendTo('body');
    }

    function detectIE() {
        var userAgent = window.navigator.userAgent;
        var msie = userAgent.indexOf('MSIE');
        var ie11 = userAgent.indexOf('Trident');
        var isIE = msie > 0 || ie11 > 0;
        return isIE;
    }

    /// <summary>
    /// Resize html elements containers and show/hide fullscreen buttons
    /// </summary>
    function resizeFieldOnToggleFullScreenMode(sender, btnIdToShow, isInFC) {
        $(_EventSettings.gameFieldId).css('padding-top', isInFC ? '240px' : '0');
        $(_EventSettings.backgroundLayerId).css('margin-top', isInFC ? '-120px' : '');
        $(_EventSettings.playerLayerId).css('margin-top', isInFC ? '-240px' : '');
        $('html').css('height', isInFC ? '100%' : '');
        $('body').css('height', isInFC ? '100%' : '');
        $(btnIdToShow).show();
        $(sender).hide();
    }

    /// <summary>
    /// Toggle fullscreen for browsers that support it!
    /// </summary>
    function tryToggleFullscreenMode() {
        var docElement = document.documentElement;
        var request = docElement.requestFullscreen || docElement.webkitRequestFullScreen || docElement.mozRequestFullScreen || docElement.msRequestFullscreen;

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
        var docElement = document;
        var request = docElement.exitFullScreen || docElement.mozCancelFullScreen || docElement.webkitExitFullScreen || docElement.webkitCancelFullScreen || docElement.msCancelFullscreen || docElement.msExitFullscreen;

        if (typeof request != "undefined" && request) {
            request.call(docElement);
            return true;
        }

        return false;
    }

    // Public function
    EventListener.prototype.setButtonEvents = function (gameEngine) {
        // On Start button click - starts the game
        $(_EventSettings.startGameButtonId).on('click', function () {
            startGame();
            $('#start').hide();
        });

        // Start fullscreen mode Button
        $(_EventSettings.toggleFullscreenButtonId).on('click', function () {
            if (tryToggleFullscreenMode()) {
                resizeFieldOnToggleFullScreenMode($(this), _EventSettings.exitFullscreenButtonId, true);
            }

            //startGame();

        });

        // Exit from fullscreen mode Button
        $(_EventSettings.exitFullscreenButtonId).on('click', function () {
            if (tryExitFullscreen()) {
                resizeFieldOnToggleFullScreenMode($(this), _EventSettings.toggleFullscreenButtonId, false);
            }
        });
    };

    return EventListener;
});