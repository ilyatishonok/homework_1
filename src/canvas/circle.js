const Circle = (function() {
    function Circle(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    Circle.prototype.draw = function(ctx) {
        ctx.beginPath();
        ctx && ctx.arc(this.x, this.y, this.r/2, 0, 2 * Math.PI);
        ctx.fillStyle = 'purple';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    Circle.prototype.move = function(x, y) {
        this.x = x;
        this.y = y;
    }

    Circle.prototype.isUnderCursor = function(x, y) {
        return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) < this.r/2;
    }

    return Circle;
})();