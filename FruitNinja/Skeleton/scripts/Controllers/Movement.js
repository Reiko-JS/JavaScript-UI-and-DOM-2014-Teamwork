window.onload = function () {
    var canvas = document.getElementById('field'),
        ctx = canvas.getContext('2d'),
        center = {
            x: canvas.width / 2,
            y: canvas.height / 2
        },
        radius = 100,
        angle = 0,
        point = {
            radius: 5,
            x: 0,
            y: 0
        };

    function drawPoint(ctx, x, y, r){
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2*Math.PI);
        ctx.fill();
    }

    function movePoint(trajectory){
        return {
            x: trajectory.x + trajectory.radius * Math.cos(trajectory.angle / 180 * Math.PI) / 1.2,
            y: canvas.height - (trajectory.y + trajectory.radius * Math.sin(trajectory.angle / 180 * Math.PI) * 2)
        };
    }

    var shouldRun = true;

    function frame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        angle++;

        if (angle == 180) {
            angle = 0;
        }
  
        var newPoint = movePoint({
            x: center.x,
            y: center.y,
            radius: radius,
            angle: angle
        });

        drawPoint(ctx, newPoint.x, newPoint.y, point.radius);

        window.requestAnimationFrame(frame);

    }

    frame();
};