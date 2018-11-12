function Draggable(element, options) {
    this._element = element;
    this.isDragging = false;
    this.options = options || {};
    this.elementRect = this._element.getBoundingClientRect();
    element._draggable = this;
}

Draggable.prototype.onDragStart = function(mouseDownCoords, event) {
    if (this.options.createAvatar) {
        this.avatar = this.options.createAvatar(mouseDownCoords, event);
        this._addStylesToAvatar(this.avatar);

        document.body.appendChild(this.avatar);
    } else {
        this.avatar = this.createAvatar(mouseDownCoords, event);
    }

    this.options.onDragStart && this.options.onDragStart(this.mouseDownCoords, event);
    this.mouseDownCoords = mouseDownCoords;
}

Draggable.prototype._addStylesToAvatar = function(avatarElement) {
    avatarElement.style.position = 'fixed';
    avatarElement.style.pointerEvents = 'none';
}

Draggable.prototype.createAvatar = function() {
    this._addStylesToAvatar(this._element);
    
    return this._element;
}

Draggable.prototype.onDragEnd = function(droppableElement, event) {
    if (this.avatar !== this._element) {
        this.destroyAvatar();
    }

    this.avatar = null;

    this.options.onDragEnd && this.options.onDragEnd(droppableElement, event);
}

Draggable.prototype.onDragMove = function(event) {
    this.avatar.style.left = `${event.pageX - (this.mouseDownCoords.x - this.elementRect.left)}px`;
    this.avatar.style.top = `${event.pageY - (this.mouseDownCoords.y - this.elementRect.top)}px`;

    if (this.options.onDragMove) {
        this.options.onDragMove(this.avatar, event);
    }
}

Draggable.prototype.onDragCancel = function(event) {
    this.avatar.style.left = this.elementRect.left;
    this.avatar.style.top = this.elementRect.top;

    this.options.onDragCancel && this.options.onDragCancel(this._element, this.avatar, event);

    if (this.options.avatar != this._element) {
        this.destroyAvatar();
    }

    this.avatar = null;
}

Draggable.prototype.destroyAvatar = function() {
    document.body.removeChild(this.avatar);
}

Draggable.prototype.setOffset = function(offset) {
    this.offset = offset;
}