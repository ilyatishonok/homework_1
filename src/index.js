const { ctx, canvas, canvasObjects } = canvasHandler;

const circleElement = document.querySelector('.circle');
const rectElement = document.querySelector('.rect');


const circle = new Draggable(circleElement, helper.createDefaultOptions(circleElement));
const rect = new Draggable(document.querySelector('.rect'), helper.createDefaultOptions(rectElement));

const droppable = new Droppable(canvas, {
    onDragEnd: (draggableElement, event) => {
        let newCanvasObject;
        const rect = canvas.getBoundingClientRect();
        if (draggableElement.classList.contains('circle')) {
            newCanvasObject = new Circle(
                event.clientX - rect.left,
                event.clientY - rect.top,
                draggableElement.clientHeight / 2
            );
        } else if (draggableElement.classList.contains('rect')) {
            newCanvasObject = new Rect(
                event.clientX - rect.left,
                event.clientY - rect.top,
                draggableElement.clientWidth,
                draggableElement.clientHeight
            );
        }

        canvasObjects.push(newCanvasObject);
        newCanvasObject.draw(ctx);
    }
});