function Rect(x, y, color, height) {
    Shape.apply(this, arguments);

    this.height = height;
}

Rect.prototype = Object.create(Shape.prototype);

Rect.prototype.draw = function(ctx, isSelected) {
    const { strokeStyle } = ctx;

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.height, this.height);
    ctx.strokeStyle = isSelected ? this.strokeStyle : strokeStyle;
    ctx.strokeRect(this.x, this.y, this.height, this.height);
    ctx.strokeStyle = strokeStyle;
}

Rect.prototype.isUnderCursor = function(x, y) {
    return (x > this.x) && (x < this.x + this.height) && (y > this.y) && (y < this.y + this.height);
}