jQuery(document).ready(function() {

    // Объявление переменных дл¤ отрисовки окружности
    var canvas = document.getElementById('canva'),
        ctx = canvas.getContext('2d'),
        canvasSize = {
            width: 800,
            height: 800
        },
        centerPosX = canvasSize.width/2,
        centerPosY = canvasSize.height/2,
        arcWidth = 50, // диаметр окружности
        factor = 1.6; // множитель допустимого рассто¤ни¤ от курсора до окружности

    // Задание размеров холста
    jQuery('#canva').attr(canvasSize);

    // Очистка холста и отрисовка окружности
    function drawCircle() {
        ctx.clearRect(0, 0, 800, 800);
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.arc(centerPosX, centerPosY, arcWidth, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }

    // Отслеживание передвижени¤ курсора по холсту
    canvas.addEventListener('mousemove', function(e) {
        let x = e.offsetX==undefined?e.layerX:e.offsetX;
        let y = e.offsetY==undefined?e.layerY:e.offsetY;
        reDrawArc(x, y, centerPosX, centerPosY);
    });

    // Отслеживание выхода курсора за канвас
    canvas.addEventListener('mouseout', function() {
        jQuery('#pointerPos').text('Pointer: move cursor on canvas');
    });

    //  Корректировка холста и слежение за курсором
    function reDrawArc(cursorX, cursorY, circlePosX, circlePosY) {

        // Проверка рассто¤ни¤ по осям X, Y от курсора до окружности
        // Если оба значени¤ примут true, то перерисовываем окружность
        let checkX = (cursorX > (circlePosX-arcWidth*factor) && cursorX < (circlePosX+arcWidth*factor)) ? true : false;
        let checkY = (cursorY > (circlePosY-arcWidth*factor) && cursorY < (circlePosY+arcWidth*factor)) ? true : false;

        if (checkX && checkY) {

            let newPosX,
                newPosY;

            // Определяем с какой по оси X стороны курсор и устанавливаем новый центр окружности по оси X
            if (cursorX < circlePosX) {
                newPosX = cursorX+arcWidth*factor;
            } else if (cursorX > circlePosX) {
                newPosX = cursorX-arcWidth*factor;
            };

            // Определяем с какой по оси Y стороны курсор и устанавливаем новый центр окружности по оси Y
            if (cursorY < circlePosY) {
                newPosY = cursorY+arcWidth*factor;
            } else if (cursorY > circlePosY) {
                newPosY = cursorY-arcWidth*factor;
            };

            // Проверяем возможно ли передвижение не выходя за границы, если возможно, то перерисовываем холст
            let checkPosX = Math.pow((canvasSize.width/2-newPosX), 2);
            let checkPosY = Math.pow((canvasSize.height/2-newPosY), 2);
            if (Math.sqrt(checkPosX+checkPosY) < canvasSize.width/2-arcWidth) {
                centerPosX = newPosX;
                centerPosY = newPosY;
                drawCircle();
            };

        };

        // Запись позиции курсора и центра окружности
        jQuery('#pointerPos').text('Pointer: '+cursorX+'x'+cursorY);
        jQuery('#circlePos').text('Center of circle: '+circlePosX+'x'+circlePosY);

    }

    drawCircle();

})