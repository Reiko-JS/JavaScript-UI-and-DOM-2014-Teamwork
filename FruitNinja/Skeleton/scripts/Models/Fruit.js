define(function(require) {

    // Constructor
    function Fruit(x, y, defaultImageSrc, hitImageSrc, points) {
        this.x = x;
        this.y = y;
        this.defaultImageSrc = defaultImageSrc;
        this.hitImageSrc = hitImageSrc;
        this.direction = null; // TODO
        this.points = points;
    }

    Fruit.prototype.cutOff = function() {
        // Change image
        // Change direction
    };

    return Fruit;
});