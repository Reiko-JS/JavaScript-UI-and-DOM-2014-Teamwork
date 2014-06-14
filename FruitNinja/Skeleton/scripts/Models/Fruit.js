define(function (require) {
    'use strict';

    // Constructor
    function Fruit(x, y, dir, angle, facY, defaultImage, hitImage, points) {
        this.x = x;
        this.y = y;
        this.direction = dir;
        this.angle = angle;
        this.factorY = facY;
        this.isCut = false;

        this.defaultImageSrc = defaultImage;
        this.hitImageSrc = hitImage;
        this.points = points;
    }

    Fruit.prototype.cutOff = function () {
        this.isCut = true;
        // Change image
        // Change direction
    };

    return Fruit;
});
