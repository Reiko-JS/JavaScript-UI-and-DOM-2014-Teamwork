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

    /// <summary>
    /// When some of the start buttons is clicked - starts the game if it is not started already
    /// </summary>
    function startGame() {
        if (!_gameEngine.isRunning()) {
            _gameEngine.startGame();
            
            var ua = window.navigator.userAgent;
            console.log('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; InfoPath.3; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; Zune 4.7)');
            console.log(ua);
            var msie = ua.indexOf('MSIE');
            var ie11 = ua.indexOf('Trident');
            
            console.log(msie);
            
            if(msie>0 || ie11>0){
                $('<object/>')
                    .attr('data', _EventSettings.startGameSoundSrc)
                    .attr('type', 'audio/'+_EventSettings.startGameSoundSrc.split('.').pop())
                    .hide()
                    .append(
                        $('<embed/>').attr('src', _EventSettings.startGameSoundSrc)
                    )
                    .appendTo('body');
                // new Audio() does not work for IE 10 !!!
                // Error -> SCRIPT16385: Not implemented
            }
            else{
                _startGameSound.play();
            }
        }
    }

    /// <summary>
    /// Resize html elements containers and show/hide fullscreen buttons
    /// </summary>
    function resizeFieldOnToggleFullScreenMode(sender, btnIdToShow, isInFC) {
        $(_EventSettings.gameFieldId).css('padding-top', isInFC ? '240px' : '0');
        $(_EventSettings.backgroundLayerId).css('margin-top', isInFC ? '-120px' : '');
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