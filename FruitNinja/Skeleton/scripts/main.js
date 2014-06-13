define(function (require) {
    var GameEngine = require('scripts/Controllers/GameEngine.js');

    var gameFieldOptions = {
        containerId: 'game-field',
        width: 1000,
        height: 500,
        colors: {
            brown: '#673720',
            darkBrown: '#401c10'
        },
        imgSrc: 'images/nin.png'
    };

    var stage = new Kinetic.Stage({
        container: 'game-field',
        width: gameFieldOptions.width,
        height: gameFieldOptions.height
    });

    var gameEngine = new GameEngine(stage, gameFieldOptions);
    gameEngine.startGame();

    // That's all. Do not touch here...

    // ----------------------------------------------------------
    // Test how works Require.js

    // var Utils = require('scripts/Helper/Utility.js') -> copies all script content from the linked file to this file and you can use it via variable Utils

    var Utils = require('scripts/Helper/Utility.js');
    console.log(Utils);
    console.log(Utils.getRandomNumber(1, 2));

    var Fruit = require('scripts/Models/Fruit.js');
    console.log(Fruit);
    console.log(new Fruit());

    //var FruitFactory = require('scripts/Models/FruitFactory.js');
    //console.log(FruitFactory.getRandomFruit());

    // ----------------------------------------------------------
});
