function Rect(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Rect.prototype.draw = function (ctx) {
    ctx && ctx.fillRect(this.x, this.y, this.width, this.height);
}

Rect.prototype.move = function (x, y) {
    this.x = x;
    this.y = y;
}

Rect.prototype.isUnderCursor = function(x, y) {
    return (x > this.x) && (x < this.x + this.width) && (y > this.y) && (y < this.y + this.height);
}