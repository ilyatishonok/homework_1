const canvasHandler = (function() { 
    const canvasWrapperElement = document.querySelector('.canvas-wrapper');
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const canvasObjects = [];

    let selectedCanvasObject;

    canvas.width = canvasWrapperElement.clientWidth;
    canvas.height = canvasWrapperElement.clientHeight;
    ctx.strokeStyle = '#001EFF';
    ctx.fillStyle = '#985D5D';
    ctx.lineWidth = 3;

    canvas.addEventListener('mousemove', event => {
        if (selectedCanvasObject) {
            selectedCanvasObject.move(event.offsetX, event.offsetY);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            canvasObjects.forEach(canvasObject => {
                canvasObject.draw(ctx);
            });
        }
    });

    canvas.addEventListener('mouseleave', event => {
        selectedCanvasObject = null;
    })

    canvas.addEventListener('mouseup', event => {
        selectedCanvasObject = null;
    });

    canvas.addEventListener('mousedown', function(event) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;

        selectedCanvasObject = null;

        canvasObjects.forEach(canvasObject => {
            if (canvasObject.isUnderCursor(mouseX, mouseY)) {
                if (
                    selectedCanvasObject &&
                    canvasObjects.indexOf(canvasObject) > canvasObjects.indexOf(selectedCanvasObject)
                ) {
                    selectedCanvasObject = canvasObject;
                } else {
                    selectedCanvasObject = canvasObject;
                }
            }
        });

        if (selectedCanvasObject) {
            canvasObjects.splice(canvasObjects.indexOf(selectedCanvasObject), 1);
            canvasObjects.push(selectedCanvasObject);
        }
    });

    return {
        canvas,
        ctx,
        canvasObjects,
    };
})();
