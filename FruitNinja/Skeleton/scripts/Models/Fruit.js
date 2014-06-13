define(function (require) {
    'use strict';

    // Constructor
    function Fruit(x, y, dir, angle, facY, defaultImageSrc, hitImageSrc, points) {
        this.x = x;
        this.y = y;
        this.direction = dir;
        this.angle = angle;
        this.factorY = facY;
        this.isCut = false;

        this.defaultImageSrc = defaultImageSrc;
        this.hitImageSrc = hitImageSrc;
        this.points = points;
    }

    Fruit.prototype.cutOff = function () {
        this.isCut = true;
        // Change image
        // Change direction
    };

    return Fruit;
});