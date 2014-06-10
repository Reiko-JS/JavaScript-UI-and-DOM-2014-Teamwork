define(function(require) {
    var GameEngine = require('scripts/Controllers/GameEngine.js');

    var context = null; // TODO

    var gameEngine = new GameEngine(context);
    gameEngine.startGame();

    // That's all. Do not touch here...

    // ----------------------------------------------------------
    // Test how works Require.js

    // var Utils = require('scripts/Helper/Utility.js') -> copies all script content from the linked file to this file and you can use it via variable Utils

    var Utils = require('scripts/Helper/Utility.js');
    console.log(Utils.getRandomNumber(1, 2));

    var Fruit = require('scripts/Models/Fruit.js');
    console.log(new Fruit());

    var FruitFactory = require('scripts/Models/FruitFactory.js');
    console.log(FruitFactory.getRandomFruit());

    // ----------------------------------------------------------
});