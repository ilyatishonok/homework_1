const Dragger = (function() {
    let draggableElement;
    let droppableElement;
    let mouseDownCoords = {};

    const onMouseDown = event => {
        if (event.which != 1) {
            return false;
        }
        
        mouseDownCoords = {};

        draggableElement = findDraggable(event);

        if (draggableElement) {
            mouseDownCoords.x = event.pageX;
            mouseDownCoords.y = event.pageY;
            mouseDownCoords.offsetX = event.offsetX;
            mouseDownCoords.offsetY = event.offsetY;

            document.addEventListener('mousemove', onMouseMove, true);
            document.addEventListener('mouseup', onMouseUp, true);
        }
    }

    const onMouseMove = event => {
        if (!draggableElement || !draggableElement._draggable) {
            clearAllData();

            return false;
        }

        if (!draggableElement._draggable.avatar) {
            if (Math.abs(event.pageX - mouseDownCoords.x) < 3 
                && Math.abs(event.pageY - mouseDownCoords.y) < 3
            ) {
                return;
            }

            draggableElement._draggable.onDragStart(mouseDownCoords, event);

            if (!draggableElement._draggable.avatar) {
                clearAllData();

                return false;
            }
        }
    
        draggableElement._draggable.onDragMove(event);
        
        const newDroppableElement = findDroppable(event);

        if (newDroppableElement != droppableElement) {
            droppableElement && droppableElement._droppable.onDragLeave(
                newDroppableElement,
                draggableElement,
                event
            );

            newDroppableElement && newDroppableElement._droppable.onDragEnter(
                droppableElement,
                draggableElement,
                event
            );
        }

        droppableElement = newDroppableElement;

        if (droppableElement && droppableElement._droppable) {
            droppableElement._droppable.onDragMove(draggableElement, event);
        }
    }

    const clearAllData = () => {
        draggableElement = droppableElement = null;

        mouseDownCoords = null;

        document.removeEventListener('mousemove', onMouseMove, true);
        document.removeEventListener('mouseup', onMouseUp, true);
    }

    const onMouseUp = event => {
        const currentMouseDownCoords = mouseDownCoords;
        const currentDraggableElement = draggableElement;
        const currentDroppableElement = droppableElement;

        clearAllData();

        if (event.which != 1) {
            return false;
        }

        if (
            currentDraggableElement &&
            currentDraggableElement._draggable &&
            currentDraggableElement._draggable.avatar
        ) {
            if (currentDroppableElement) {
                currentDraggableElement._draggable.onDragEnd(currentDroppableElement, event);
                currentDroppableElement._droppable.onDragEnd(
                    currentDraggableElement,
                    currentMouseDownCoords,
                    event
                );
            } else {
                currentDraggableElement._draggable.onDragCancel(event);
            }
        }
    }

    const findDraggable = (event) => {
        let element = event.target;

        while (
            element != document &&
            !element._draggable
        ) {
            element = element.parentNode;
        }

        return element === document ? null : element;
    }

    const findDroppable = (event) => {
        const { _draggable } = draggableElement;
        const currentDisplayState = _draggable.avatar.style.display;

        _draggable.avatar.style.display = 'none';
        let target = document.elementFromPoint(event.pageX, event.pageY);
        _draggable.avatar.style.display = currentDisplayState;

        if (!target) {
            return null;
        }

        while (
            target != document &&
            !target._droppable
        ) {
            target = target.parentNode;
        }

        return target === document ? null : target;
    }

    document.addEventListener('mousedown', onMouseDown, true);
})();