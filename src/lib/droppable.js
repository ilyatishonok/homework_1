const Droppable = (function() {
    function Droppable(element, options) {
        this._element = element;
        this.options = options;
        element._droppable = this;
    }

    Droppable.prototype.onDragMove = function(draggableObject, event) {
        this.options.onDragMove && this.options.onDragMove(draggableObject, event);
    }

    Droppable.prototype.onDragLeave = function(newDroppableElement, draggableElement, event) {
        this.options.onDragLeave && this.options.onDragLeave(
            newDroppableElement,
            draggableElement,
            event
        );
    }

    Droppable.prototype.onDragEnter = function(previousDroppableElement, draggableElement, event) {
        this.options.onDragEnter && this.options.onDragEnter(
            previousDroppableElement,
            draggableElement,
            event
        );
    }

    Droppable.prototype.onDragEnd = function(draggableElement, mouseDownCoords, event) {
        this.options.onDragEnd && this.options.onDragEnd(draggableElement, mouseDownCoords, event);
    }

    return Droppable;
})();