function Shape(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
}

Shape.prototype.move = function(x, y) {
    this.x = x - this.offsetX;
    this.y = y - this.offsetY;
}

Shape.prototype.setMouseDownOffset = function(offsetX, offsetY) {
    this.offsetX = offsetX - this.x;
    this.offsetY = offsetY - this.y;
}