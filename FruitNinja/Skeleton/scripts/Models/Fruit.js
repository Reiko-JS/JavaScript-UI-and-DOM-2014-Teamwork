define(function (require) {

    // Constructor
    function Fruit(coordinated, direction, defaultImageSrc, hitImageSrc, points) {
        this.coordinated = coordinated;
        this.direction = direction;

        this.defaultImageSrc = defaultImageSrc;
        this.hitImageSrc = hitImageSrc;

        this.points = points;
    }

    Fruit.prototype.cutOff = function () {
        // Change image
        // Change direction
    };

    return Fruit;
});
