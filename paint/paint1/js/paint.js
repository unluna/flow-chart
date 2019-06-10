//画侧边栏
let drawSide = () => {
    //外框
    drawRect(0, 0, 120, canvas.height, GRAPH_BORDER_COLOR);
    //内框
    drawRect(GRAPH_BORDER_WIDTH, GRAPH_BORDER_WIDTH, 120 - GRAPH_BORDER_WIDTH * 2, canvas.height - GRAPH_BORDER_WIDTH * 2, GRAPH_BACKGROUND_COLOR);
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