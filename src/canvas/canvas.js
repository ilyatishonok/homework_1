const canvasHandler = (function() { 
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    const canvasObjects = [];

    let selectedCanvasObject;

    canvas.width = canvas.parentNode.clientWidth;
    canvas.height = canvas.parentNode.clientHeight;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'red';
    ctx.lineWidth = 1;

    const redraw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        canvasObjects.forEach(canvasObject => {
            const isSelected = selectedCanvasObject === canvasObject;

            canvasObject.draw(ctx, isSelected);
        });  
    }

    canvas.addEventListener('mousemove', event => {
        if (selectedCanvasObject) {
            selectedCanvasObject.move(
                event.offsetX,
                event.offsetY
            );

            redraw();
        }
    });

    canvas.addEventListener('mouseleave', () => {
        selectedCanvasObject = null;

        redraw();
    })

    canvas.addEventListener('mouseup', () => {
        selectedCanvasObject = null;

        redraw();
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
            selectedCanvasObject.setMouseDownOffset(mouseX, mouseY);
            canvasObjects.splice(canvasObjects.indexOf(selectedCanvasObject), 1);
            canvasObjects.push(selectedCanvasObject);
        }

        redraw();
    });

    window.addEventListener('resize', () => {
        canvas.height = canvas.parentNode.clientHeight;
        canvas.width = canvas.parentNode.clientWidth;

        redraw();
    });

    return {
        canvas,
        ctx,
        canvasObjects,
    };
})();
