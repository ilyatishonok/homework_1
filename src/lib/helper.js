const helper = (function() {
    const createAvatar = element => {
        const clonedNode = element.cloneNode(true);

        return clonedNode;
    }

    const onDragStart = element => {
        element.style.background = 'gray';
        element.style.border = '1px solid white';
    }

    const onDragEnd = element => {
        element.style.background = 'red';
        element.style.border = '';
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
    };
})();