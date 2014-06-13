define(function (require) {

    // Constructor
    function Fruit(x, y, xDir, yDir, defaultImageSrc, hitImageSrc, points) {
        this.x = x;
        this.y = y;
        this.xDir = xDir;
        this.yDir = yDir;

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
