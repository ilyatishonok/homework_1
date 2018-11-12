function Circle(x, y, color, radius) {
    Shape.apply(this, arguments);

    this.radius = radius;
    this.color = color;
}

Circle.prototype = Object.create(Shape.prototype);

Circle.prototype.draw = function(ctx, isSelected) {
    const { strokeStyle } = ctx;

    ctx.beginPath();
    ctx && ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = isSelected ? this.strokeStyle : strokeStyle;
    ctx.stroke();
    ctx.strokeStyle = strokeStyle;
}

Circle.prototype.isUnderCursor = function(x, y) {
    return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) < this.radius;
}