const helper = (function() {
    const createAvatar = element => {
        const clonedNode = element.cloneNode(true);

        return clonedNode;
    }

    const findDroppable = event => {
        let target = document.elementFromPoint(event.pageX, event.pageY);

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

    
    const findDraggable = event => {
        let element = event.target;

        while (
            element != document &&
            !element._draggable
        ) {
            element = element.parentNode;
        }

        return element === document ? null : element;
    }

    const onDragStart = element => {
        element.style.background = 'gray';
        element.style.border = '1px solid white';
    }

    const onDragEnd = element => {
        element.style.background = null;
        element.style.border = null;
    }

    const createDefaultOptions = element => ({
        createAvatar: () => (createAvatar(element)),
        onDragStart: () => (onDragStart(element)),
        onDragCancel: () => (onDragEnd(element)),
        onDragEnd: () => (onDragEnd(element)),
    });

    return {
        createAvatar,
        onDragStart,
        onDragEnd,
        createDefaultOptions,
        findDraggable,
        findDroppable
    };
})();