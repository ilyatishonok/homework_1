function Rect(x, y, color, width, height) {
    Shape.apply(this, arguments);

    this.width = width;
    this.height = height;
}

Rect.prototype = Object.create(Shape.prototype);

Rect.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height)
}

Rect.prototype.isUnderCursor = function(x, y) {
    return (x > this.x) && (x < this.x + this.width) && (y > this.y) && (y < this.y + this.height);
}