function Draggable(element, options) {
    this._element = element;
    this.isDragging = false;
    this.options = options || {};
    element._draggable = this;
}

Draggable.prototype.onDragStart = function(mouseDownCoords, event) {
    if (this.options.createAvatar) {
        this.avatar = this.options.createAvatar(mouseDownCoords, event);
        this.avatar.style.position = 'fixed';

        document.body.appendChild(this.avatar);
    } else {
        this.avatar = this.createAvatar(mouseDownCoords, event);
    }

    this.options.onDragStart && this.options.onDragStart(this.mouseDownCoords, event);
    this.mouseDownCoords = mouseDownCoords;
    this.coords = this._element.getBoundingClientRect();
}

Draggable.prototype.createAvatar = function() {
    this._element.style.position = 'fixed';
    
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
    this.avatar.style.left = `${event.pageX - (this.mouseDownCoords.x - this.coords.left)}px`;
    this.avatar.style.top = `${event.pageY - (this.mouseDownCoords.y - this.coords.top)}px`;

    if (this.options.onDragMove) {
        this.options.onDragMove(this.avatar, event);
    }
}

Draggable.prototype.onDragCancel = function(event) {
    this.avatar.style.left = this.coords.left;
    this.avatar.style.top = this.coords.top;

    this.options.onDragCancel && this.options.onDragCancel(this._element, this.avatar, event);

    if (this.options.avatar != element) {
        this.destroyAvatar();
    }

    this.avatar = null;
}

Draggable.prototype.destroyAvatar = function() {
    document.body.removeChild(this.avatar);
}