define(function(require) {

    var Fruit = require('./Fruit.js');

    // Fruit - points
    var fruits = [
        ['orange', 20],
        ['apple', 30],
        [ /* ... */ ]
    ];

    function getRandomFruit() {
        var fruitType = null;
        var fruitPoints = null;

        // ...

        var fruitDefaultImage = fruitType + '.png';
        var fruitHitImage = fruitType + '-hit.png';

        // ...

        var randomX = null;
        var randomY = null;

        // ...

        var randomDirectory = null;

        // ...

        return new Fruit(randomX, randomY, fruitDefaultImage, fruitHitImage, fruitPoints);
    }

    return {
        getRandomFruit: getRandomFruit
    };
});