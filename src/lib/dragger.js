const dragManager = (function() {
    let draggableElement;
    let droppableElement;
    const mouseDownCoords = {};

    const onMouseDown = event => {
        if (event.which != 1) {
            return false;
        }

        draggableElement = findDraggable(event);
    
        if (draggableElement) {
            mouseDownCoords.x = event.pageX;
            mouseDownCoords.y = event.pageY;

            document.addEventListener('mousemove', onMouseMove, true);
            document.addEventListener('mouseup', onMouseUp, true);
        }
    }

    const onMouseMove = (event) => {
        if (!draggableElement && !draggableElement._draggable) {
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

        mouseDownCoords.x = null;
        mouseDownCoords.y = null;

        document.removeEventListener('mousemove', onMouseMove, true);
        document.removeEventListener('mouseup', onMouseUp, true);
    }

    const onMouseUp = event => {
        if (event.which != 1) {
            clearAllData();

            return false;
        }

        if (
            draggableElement &&
            draggableElement._draggable &&
            draggableElement._draggable.avatar
        ) {
            if (droppableElement) {
                droppableElement._droppable.onDragEnd(draggableElement, event);
                draggableElement._droppable.onDragEnd(droppableElement, event);
            } else {
                draggableElement.draggableObject.onDragCancel(event);
            }
        }

        clearAllData();
    }

    const findDraggable = (event) => {
        let element = event.target;

        while (
            element != document &&
            !element.draggableObject
        ) {
            element = element.parentNode;
        }

        return element === document ? null : element;
    }

    const findDroppable = (event) => {
        const { _draggable } = draggableElement;

        _draggable.avatar.style.display = 'none';
        const target = document.elementFromPoint(event.clientX, event.clientY);
        _draggable.avatar.style.display = 'block';

        if (target) {
            return target.closest('.droppable');
        }

        return null;
    }

    document.addEventListener('mousedown', onMouseDown, true);
})();