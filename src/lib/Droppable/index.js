const Droppable = (function() {
    function Droppable(element, options) {
        this._element = element;
        this.options = options;
        element._droppable = this;
        element.classList.add('droppable');
    }

    Droppable.prototype.onDragMove = function(draggableObject, event) {

    }

    Droppable.prototype.onDragLeave = function() {
        this._element.style.border = '1px solid black';
    }

    Droppable.prototype.onDragEnter = function() {
        this._element.style.border = '1px solid red';
    }

    Droppable.prototype.onDragEnd = function(draggableElement, event) {
        this.options.onDragEnd && this.options.onDragEnd(draggableElement, event);
        this._element.style.border = '1px solid green';
    }

    return Droppable;
})();