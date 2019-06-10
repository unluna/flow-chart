/**
 * 随机生成一个ID
 * @param {numer} len 随机字符串长度，非必须项
 * @return {string} 随机字符串
 */
const getId = (len) => {
    return Number(Math.random().toString().substr(3, len) + Date.now()).toString(36);
}

/**
 * 超出边界拉回来
 * @param {number} x 图形的x坐标
 * @param {number} y 图形的y坐标
 * @param {object} oSide 侧边栏d3对象
 * @return {x:x坐标(number),y:y坐标(number)}
 */
const pullBack = (x, y, oSide) => {
    //判断是否点在侧边栏上
    let str = oSide.attr("transform");
    const reg = /\d+\.?\d+/g;
    let nSideX = parseInt(str.match(reg)[0]);
    let nSideY = parseInt(str.match(reg)[1]);

    //超出边界 拖回来
    if (x - GRID_WIDTH <= nSideX + 120) {
        x = nSideX + 120 + NEW_GRAPH_WIDTH / 2
    }
    if (y - GRID_HEIGHT / 2 <= nSideY) {
        y = nSideY + NEW_GRAPH_HEIGHT / 2;
    }
    if (x - GRID_WIDTH >= nSideX + 1120 - NEW_GRAPH_WIDTH) {
        x = nSideX + 1120 - NEW_GRAPH_WIDTH / 2;
    }
    if (y - GRID_HEIGHT / 2 >= nSideY + 1000 - NEW_GRAPH_HEIGHT) {
        y = nSideY + 1000 - NEW_GRAPH_HEIGHT / 2
    }
    return { x: x, y: y }
}
/**
 * 获得svg的offset
 * @param {object} element svg
 */
const getOffset = (element) => {
    var bound = element.getBoundingClientRect();
    var html = document.documentElement;

    return {
        top: bound.top + window.pageYOffset - html.clientTop,
        left: bound.left + window.pageXOffset - html.clientLeft
    };
}