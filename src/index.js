const { ctx, canvas, canvasObjects } = canvasHandler;

const circleElement = document.querySelector('.circle');
const rectElement = document.querySelector('.rect');

const circle = new Draggable(circleElement, helper.createDefaultOptions(circleElement));
const rect = new Draggable(document.querySelector('.rect'), helper.createDefaultOptions(rectElement));

const droppable = new Droppable(canvas, {
    onDragEnd: (draggableElement, mouseDownCoords, event) => {
        canvas.parentNode.style.border = null;
        canvas.parentNode.style.boxShadow = null;

        let newCanvasObject;
        const rect = canvas.getBoundingClientRect();
        if (draggableElement.classList.contains('circle')) {
            newCanvasObject = new Circle(
                event.clientX - rect.left,
                event.clientY - rect.top,
                window.getComputedStyle(draggableElement, null).getPropertyValue('background-color'),
                draggableElement.clientHeight / 2,
            );
        } else if (draggableElement.classList.contains('rect')) {
            newCanvasObject = new Rect(
                (event.clientX - rect.left) - mouseDownCoords.offsetX,
                (event.clientY - rect.top) - mouseDownCoords.offsetY,
                window.getComputedStyle(draggableElement, null).getPropertyValue('background-color'),
                draggableElement.clientWidth,
                draggableElement.clientHeight,
            );
        }

        canvasObjects.push(newCanvasObject);
        newCanvasObject.draw(ctx);
    },
    onDragEnter: () => {
        canvas.parentNode.style.border = '1px solid green';
        canvas.parentNode.style.boxShadow = '0 0 10px green';
    },
    onDragLeave: () => {
        canvas.parentElement.style.border = null;
        canvas.parentNode.style.boxShadow = null;
    }
});