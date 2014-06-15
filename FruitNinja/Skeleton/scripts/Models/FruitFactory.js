define(function(require) {
    'use strict';

    var Fruit = require('./Fruit.js');
    var Utility = require('./../Helper/Utility.js');

    var fruits = [{
        type: 'orange',
        points: 20
    }, {
        type: 'coconut',
        points: 30
    }, {
        type: 'watermelon',
        points: 30
    }, {
        type: 'pear',
        points: 30
    }, {
        type: 'lime',
        points: 30
    }];

    var _imagesFruits = [];
    var _imagesFruitsHit = [];

    //TODO add onload check. When using image.onload in the for loop the .onload function is skipped
    /// <summary>
    ///
    /// </summary>
    function loadImages() {
        var image = null;
        var len = fruits.length;

        if (_imagesFruits.length === 0) {
            for (var i = 0; i < len; i++) {
                image = new Image();
                image.src = 'images/' + fruits[i].type + '.png';
                _imagesFruits.push(image);
            }
        }

        if (_imagesFruitsHit.length === 0) {
            for (var j = 0; j < len; j++) {
                image = new Image();
                image.src = 'images/' + fruits[j].type + '-hit.png';
                _imagesFruitsHit.push(image);
            }
        }
    }

    /// <summary>
    /// Returns fruit with random properties
    /// </summary>
    function getRandomFruit(coordsBoundaries) {
        var randomNumber = Utility.getRandomNumber(0, fruits.length - 1);
        var randomFruit = fruits[randomNumber];

        var fruitPoints = randomFruit.points,
            defImg = _imagesFruits[randomNumber],
            hitImg = _imagesFruitsHit[randomNumber];

        var coords = Utility.getRandomCoords(coordsBoundaries),
            rndDir = Utility.getRandomDirection(coords, coordsBoundaries),
            angle = Utility.getRandomNumber(0, 30),
            factorY = Utility.getRandomNumber(2.5, 5);

        var newFruit = new Fruit(coords.x, coords.y, rndDir, angle, factorY, defImg, hitImg, fruitPoints);
        return newFruit;
    }

    /// <summary>
    /// Push random of number fruits to 'fruitsList'
    /// </summary>
    function addNewFruits(fruitsList, maxFruits, boundingBox) {
        var randomLength = Utility.getRandomNumber(1, (maxFruits - fruitsList.length) / 2);
        for (var i = 0; i < randomLength; i++) {
            fruitsList.push(getRandomFruit(boundingBox));
        }
    }

    /// <summary>
    /// Returns collection of objects represent { fruit type + points }
    /// </summary>
    function getFruitsList() {
        return fruits;
    }

    return {
        getRandomFruit: getRandomFruit,
        getFruitsList: getFruitsList,
        loadImages: loadImages,
        addNewFruits: addNewFruits
    };
});