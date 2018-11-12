const Rect = (function() {
    function Rect(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    Rect.prototype.draw = function (ctx) {
        ctx && ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    Rect.prototype.move = function (x, y) {
        this.x = x;
        this.y = y;
    }

    Rect.prototype.isUnderCursor = function(x, y) {
        return (x > this.x) && (x < this.x + this.w) && (y > this.y) && (y < this.y + this.h);
    }

    return Rect;
})();