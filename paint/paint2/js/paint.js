//画侧边栏
let drawSide = () => {
    //外框
    drawRect(1880, 2000, 120, canvas.height, GRAPH_BORDER_COLOR);
    //内框
    drawRect(1880 + GRAPH_BORDER_WIDTH, 2000 + GRAPH_BORDER_WIDTH, 120 - GRAPH_BORDER_WIDTH * 2, canvas.height - GRAPH_BORDER_WIDTH * 2, GRAPH_BACKGROUND_COLOR);
}

//画地图格子
let drawGrid = (x, y, w, h, bdWidth, bdColor, bgColor) => {
    //边框
    context.lineWidth = bdWidth;
    context.strokeStyle = bdColor;
    context.beginPath();
    context.moveTo(x + bdWidth / 2, y + bdWidth / 2);
    context.lineTo(x + w - bdWidth / 2, y + bdWidth / 2);
    context.lineTo(x + w - bdWidth / 2, y + h - bdWidth / 2);
    context.lineTo(x + bdWidth / 2, y + h - bdWidth / 2);
    context.closePath();
    context.stroke();
    //中间
    context.fillStyle = bgColor;
    context.fillRect(x + bdWidth, y + bdWidth, w - bdWidth, h - bdWidth);
}

//画矩形
let drawRect = (x, y, w, h, color) => {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

//画圆角矩形
let drawRoundRect = (x, y, w, h, r, color) => {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + w, y, x + w, y + h, r);
    context.arcTo(x + w, y + h, x, y + h, r);
    context.arcTo(x, y + h, x, y, r);
    context.arcTo(x, y, x + w, y, r);
    context.closePath();
    context.fill();
}

//画菱形
let drawRhombus = (x, y, w, h, color) => {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x + w / 2, y);
    context.lineTo(x + w, y + h / 2);
    context.lineTo(x + w / 2, y + h);
    context.lineTo(x, y + h / 2);
    context.closePath();
    context.fill();
}
//画线  (两个图形之间的直线)
let drawLine = (startX, startY, endX, endY, lineWidth, lineColor) => {

    context.lineWidth = lineWidth;
    context.strokeStyle = lineColor;
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
}
//画折线
let drawBrokenLine = (startX, startY, endX, endY, lineWidth, lineColor) => {
    /**
     * 思路 => 有两个图形A、B    A要连到B上
     *  1、不管从哪出来的线，最终都是要连到 B的正上方
     *  2、也就是说，出线口只有下，入线口只有上
     *  
     *  注意：x越往右越大，y越往下越大
     * 
     */
    context.lineWidth = lineWidth;
    context.strokeStyle = lineColor;

    if (isYes) {
        //1、A在B的正上
        if (startX === endX && startY < endY) {
            context.beginPath();
            context.moveTo(startX, startY + GRID_HEIGHT / 2);
            context.lineTo(endX, endY - GRID_HEIGHT / 2);
            //画箭头
            context.lineTo(endX - ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);
            context.moveTo(endX, endY - GRID_HEIGHT / 2);
            context.lineTo(endX + ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);

            context.stroke();
        }
        //2、A在B的大多数右上  3、A在B的大多数左上
        else if (startX > endX && startY < endY - GRID_HEIGHT || startX < endX && startY < endY - GRID_HEIGHT) {
            context.beginPath();
            //起点
            context.moveTo(startX, startY + GRID_HEIGHT / 2);
            //A正下中点
            context.lineTo(startX, startY + (endY - startY) / 2);
            //B正上中点
            context.lineTo(endX, startY + (endY - startY) / 2);
            //终点
            context.lineTo(endX, endY - GRID_HEIGHT / 2);
            //画箭头
            context.lineTo(endX - ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);
            context.moveTo(endX, endY - GRID_HEIGHT / 2);
            context.lineTo(endX + ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);

            context.stroke();
        }
        //2、A在B的小部分右上  3、A在B的小部分左上4、A在B的正左  5、A在B的大部分左下  6、A在B的正右  7、A在B的大部分右下
        else if (startX < endX - GRID_HEIGHT / 2 && startY >= endY - GRID_HEIGHT || startX > endX + GRID_HEIGHT / 2 && startY >= endY - GRID_HEIGHT) {
            context.beginPath();
            //起点
            context.moveTo(startX, startY + GRID_HEIGHT / 2);
            //A正下折点
            context.lineTo(startX, startY + GRID_HEIGHT);
            //A~B中心折点=>A侧
            context.lineTo(startX + (endX - startX) / 2, startY + GRID_HEIGHT);
            //A~B中心折点=>B侧
            context.lineTo(startX + (endX - startX) / 2, endY - GRID_HEIGHT);
            //B正上
            context.lineTo(endX, endY - GRID_HEIGHT);
            //终点
            context.lineTo(endX, endY - GRID_HEIGHT / 2);
            //画箭头
            context.lineTo(endX - ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);
            context.moveTo(endX, endY - GRID_HEIGHT / 2);
            context.lineTo(endX + ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);

            context.stroke();
        }
        //8、A在B的正下 5、A在B的小部分左下 7、A在B的小部分右下
        else if (startX >= endX - GRID_WIDTH && startX <= endX + GRID_WIDTH && startY > endY) {
            context.beginPath();
            //起点
            context.moveTo(startX, startY + GRID_HEIGHT / 2);
            //A正下折点
            context.lineTo(startX, startY + GRID_HEIGHT);
            //A~B中心折点=>A侧
            context.lineTo(startX - GRID_HEIGHT * 3 / 2, startY + GRID_HEIGHT);
            //A~B中心折点=>B侧
            context.lineTo(startX - GRID_HEIGHT * 3 / 2, endY - GRID_HEIGHT);
            //B正上
            context.lineTo(endX, endY - GRID_HEIGHT);
            //终点
            context.lineTo(endX, endY - GRID_HEIGHT / 2);
            //画箭头
            context.lineTo(endX - ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);
            context.moveTo(endX, endY - GRID_HEIGHT / 2);
            context.lineTo(endX + ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);

            context.stroke();
        }
    } else {
        //1、A在B的正左，一小部分左上，左下
        if (startX + GRID_WIDTH <= endX - GRID_WIDTH && startY >= endY - GRID_HEIGHT) {
            context.beginPath();
            //起点
            context.moveTo(startX + GRID_WIDTH, startY);
            //A~B中心折点=>A侧
            context.lineTo(startX + GRID_WIDTH + (endX - GRID_WIDTH - startX - GRID_WIDTH) / 2, startY);
            //A~B中心折点上方
            context.lineTo(startX + GRID_WIDTH + (endX - GRID_WIDTH - startX - GRID_WIDTH) / 2, endY - GRID_HEIGHT);
            //B正上
            context.lineTo(endX, endY - GRID_HEIGHT);
            //终点
            context.lineTo(endX, endY - GRID_HEIGHT / 2);
            //画箭头
            context.lineTo(endX - ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);
            context.moveTo(endX, endY - GRID_HEIGHT / 2);
            context.lineTo(endX + ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);

            context.stroke();
        }
        //2、A在B的正右，一小部分右上，右下
        else if (startX - GRID_WIDTH >= endX + GRID_WIDTH && startY >= endY - GRID_HEIGHT) {
            context.beginPath();
            //起点
            context.moveTo(startX - GRID_WIDTH, startY);
            //A~B中心折点=>A侧
            context.lineTo(startX + GRID_WIDTH + (endX - GRID_WIDTH - startX - GRID_WIDTH) / 2, startY);
            //A~B中心折点上方
            context.lineTo(startX + GRID_WIDTH + (endX - GRID_WIDTH - startX - GRID_WIDTH) / 2, endY - GRID_HEIGHT);
            //B正上
            context.lineTo(endX, endY - GRID_HEIGHT);
            //终点
            context.lineTo(endX, endY - GRID_HEIGHT / 2);
            //画箭头
            context.lineTo(endX - ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);
            context.moveTo(endX, endY - GRID_HEIGHT / 2);
            context.lineTo(endX + ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);

            context.stroke();
        }
        //3、A在B的下方偏左
        else if (startX + GRID_WIDTH > endX - GRID_WIDTH && startX + GRID_WIDTH < endX + GRID_WIDTH && startY >= endY - GRID_HEIGHT) {

            context.beginPath();
            //起点
            context.moveTo(startX + GRID_WIDTH, startY);
            //A~B第一个折点 => B侧
            context.lineTo(endX + 3 * GRID_WIDTH / 2, startY);
            //A~B中心折点上方
            context.lineTo(endX + 3 * GRID_WIDTH / 2, endY - GRID_HEIGHT);
            //B正上
            context.lineTo(endX, endY - GRID_HEIGHT);
            //终点
            context.lineTo(endX, endY - GRID_HEIGHT / 2);
            //画箭头
            context.lineTo(endX - ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);
            context.moveTo(endX, endY - GRID_HEIGHT / 2);
            context.lineTo(endX + ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);

            context.stroke();
        }
        //4、A在B的下方偏右
        else if (startX >= endX && startX - GRID_WIDTH < endX + GRID_WIDTH && startY >= endY - GRID_HEIGHT) {

            context.beginPath();
            //起点
            context.moveTo(startX - GRID_WIDTH, startY);
            //A~B第一个折点 => B侧
            context.lineTo(endX - 3 * GRID_WIDTH / 2, startY);
            //A~B中心折点上方
            context.lineTo(endX - 3 * GRID_WIDTH / 2, endY - GRID_HEIGHT);
            //B正上
            context.lineTo(endX, endY - GRID_HEIGHT);
            //终点
            context.lineTo(endX, endY - GRID_HEIGHT / 2);
            //画箭头
            context.lineTo(endX - ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);
            context.moveTo(endX, endY - GRID_HEIGHT / 2);
            context.lineTo(endX + ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);

            context.stroke();
        }
        //5、A在B的右上
        else if (startX - GRID_WIDTH > endX && startY < endY - GRID_HEIGHT) {
            context.beginPath();
            //起点
            context.moveTo(startX - GRID_WIDTH, startY);
            //B正上
            context.lineTo(endX, startY);
            //终点
            context.lineTo(endX, endY - GRID_HEIGHT / 2);
            //画箭头
            context.lineTo(endX - ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);
            context.moveTo(endX, endY - GRID_HEIGHT / 2);
            context.lineTo(endX + ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);

            context.stroke();
        }
        //6、A在B的左上
        else if (startX + GRID_WIDTH < endX && startY < endY - GRID_HEIGHT) {
            context.beginPath();
            //起点
            context.moveTo(startX + GRID_WIDTH, startY);
            //B正上
            context.lineTo(endX, startY);
            //终点
            context.lineTo(endX, endY - GRID_HEIGHT / 2);
            //画箭头
            context.lineTo(endX - ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);
            context.moveTo(endX, endY - GRID_HEIGHT / 2);
            context.lineTo(endX + ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);

            context.stroke();
        }
        //7、A在B的上方偏左
        else if (startX + GRID_WIDTH >= endX && startX + GRID_WIDTH <= endX + GRID_WIDTH && startY < endY - GRID_HEIGHT) {
            context.beginPath();
            //起点
            context.moveTo(startX + GRID_WIDTH, startY);
            //A正右
            context.lineTo(endX + 3 * GRID_WIDTH / 2, startY);
            //A~B拐点
            context.lineTo(endX + 3 * GRID_WIDTH / 2, endY - GRID_HEIGHT);
            //B正上
            context.lineTo(endX , endY - GRID_HEIGHT);
            //终点
            context.lineTo(endX, endY - GRID_HEIGHT / 2);
            //画箭头
            context.lineTo(endX - ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);
            context.moveTo(endX, endY - GRID_HEIGHT / 2);
            context.lineTo(endX + ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);

            context.stroke();
        }
        //8、A在B的上方偏右
        else if (startX  > endX && startX - GRID_WIDTH <= endX  && startY < endY - GRID_HEIGHT) {
            context.beginPath();
            //起点
            context.moveTo(startX - GRID_WIDTH, startY);
            //A正右
            context.lineTo(endX - 3 * GRID_WIDTH / 2, startY);
            //A~B拐点
            context.lineTo(endX - 3 * GRID_WIDTH / 2, endY - GRID_HEIGHT);
            //B正上
            context.lineTo(endX, endY - GRID_HEIGHT);
            //终点
            context.lineTo(endX, endY - GRID_HEIGHT / 2);
            //画箭头
            context.lineTo(endX - ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);
            context.moveTo(endX, endY - GRID_HEIGHT / 2);
            context.lineTo(endX + ARROWS, endY - GRID_HEIGHT / 2 - ARROWS);

            context.stroke();
        }
    }

}