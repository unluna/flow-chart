
/**
 * 选择这个线段组合的7条线
 * @param {string} item 线段集合的ID
 * @returns {{line1, line2, line3, line4, line5, arrow1, arrow2}} 7条线段的对象
 */
const selectLines = (item) => {
    let line1 = d3.select(`g[id="${item}"] line[id="line1"]`);
    let line2 = d3.select(`g[id="${item}"] line[id="line2"]`);
    let line3 = d3.select(`g[id="${item}"] line[id="line3"]`);
    let line4 = d3.select(`g[id="${item}"] line[id="line4"]`);
    let line5 = d3.select(`g[id="${item}"] line[id="line5"]`);
    let arrow1 = d3.select(`g[id="${item}"] line[id="arrow1"]`);
    let arrow2 = d3.select(`g[id="${item}"] line[id="arrow2"]`);
    return {
        line1, line2, line3, line4, line5, arrow1, arrow2
    };
};

/**
 * 从下出
 * @param {number} startX 线段的起点X
 * @param {number} startY 线段的起点Y
 * @param {number} endX 线段的终点X
 * @param {number} endY 线段的终点Y
 * @param {obj} line1 线段1
 * @param {obj} line2 线段2
 * @param {obj} line3 线段3
 * @param {obj} line4 线段4
 * @param {obj} line5 线段5
 * @param {obj} arrow1 箭头1
 * @param {obj} arrow2 箭头2
 */
const drawLineFromBtm = (startX, startY, endX, endY,
    line1, line2, line3, line4, line5,
    arrow1, arrow2,
    fatherId, beginId, endId, svgData) => {
    //1、A在B的正上
    if (startX === endX && startY < endY) {
        line1.attr("x1", startX)
            .attr("y1", startY + GRID_HEIGHT / 2)
            .attr("x2", endX)
            .attr("y2", endY - GRID_HEIGHT / 2);
        line2.attr("x1", null)
            .attr("y1", null)
            .attr("x2", null)
            .attr("y2", null);
        line3.attr("x1", null)
            .attr("y1", null)
            .attr("x2", null)
            .attr("y2", null);
        line4.attr("x1", null)
            .attr("y1", null)
            .attr("x2", null)
            .attr("y2", null);
        line5.attr("x1", null)
            .attr("y1", null)
            .attr("x2", null)
            .attr("y2", null);
    }
    //2、A在B的大多数右上  3、A在B的大多数左上
    else if (startX > endX && startY < endY - GRID_HEIGHT || startX < endX && startY < endY - GRID_HEIGHT) {
        //起点=>A点正下折点
        line1.attr("x1", startX)
            .attr("y1", startY + GRID_HEIGHT / 2)
            .attr("x2", startX)
            .attr("y2", startY + (endY - startY) / 2);
        //A点正下折点=>B正上折点
        line2.attr("x1", startX)
            .attr("y1", startY + (endY - startY) / 2)
            .attr("x2", endX)
            .attr("y2", startY + (endY - startY) / 2);
        //B正上折点=>终点
        line3.attr("x1", endX)
            .attr("y1", startY + (endY - startY) / 2)
            .attr("x2", endX)
            .attr("y2", endY - GRID_HEIGHT / 2);
        line4.attr("x1", null)
            .attr("y1", null)
            .attr("x2", null)
            .attr("y2", null);
        line5.attr("x1", null)
            .attr("y1", null)
            .attr("x2", null)
            .attr("y2", null);
    }
    //2、A在B的小部分右上  3、A在B的小部分左上4、A在B的正左  5、A在B的大部分左下  6、A在B的正右  7、A在B的大部分右下
    else if (startX < endX - GRID_HEIGHT / 2 && startY >= endY - GRID_HEIGHT || startX > endX + GRID_HEIGHT / 2 && startY >= endY - GRID_HEIGHT) {
        //起点=>A点正下折点
        line1.attr("x1", startX)
            .attr("y1", startY + GRID_HEIGHT / 2)
            .attr("x2", startX)
            .attr("y2", startY + GRID_HEIGHT);
        //A点正下折点=>A~B中心折点=>A侧
        line2.attr("x1", startX)
            .attr("y1", startY + GRID_HEIGHT)
            .attr("x2", startX + (endX - startX) / 2)
            .attr("y2", startY + GRID_HEIGHT);
        //A~B中心折点=>A侧=>A~B中心折点=>B侧
        line3.attr("x1", startX + (endX - startX) / 2)
            .attr("y1", startY + GRID_HEIGHT)
            .attr("x2", startX + (endX - startX) / 2)
            .attr("y2", endY - GRID_HEIGHT);
        //A~B中心折点=>B侧=>B正上折点
        line4.attr("x1", startX + (endX - startX) / 2)
            .attr("y1", endY - GRID_HEIGHT)
            .attr("x2", endX)
            .attr("y2", endY - GRID_HEIGHT);
        //B正上折点=>终点
        line5.attr("x1", endX)
            .attr("y1", endY - GRID_HEIGHT)
            .attr("x2", endX)
            .attr("y2", endY - GRID_HEIGHT / 2);
    }
    //8、A在B的正下 5、A在B的小部分左下 7、A在B的小部分右下
    else if (startX >= endX - GRID_WIDTH && startX <= endX + GRID_WIDTH && startY > endY) {
        //起点=>A点正下折点
        line1.attr("x1", startX)
            .attr("y1", startY + GRID_HEIGHT / 2)
            .attr("x2", startX)
            .attr("y2", startY + GRID_HEIGHT);
        //A点正下折点=>A~B中心折点=>A侧
        line2.attr("x1", startX)
            .attr("y1", startY + GRID_HEIGHT)
            .attr("x2", startX - GRID_HEIGHT * 3 / 2)
            .attr("y2", startY + GRID_HEIGHT);
        //A~B中心折点=>A侧  =>  A~B中心折点=>B侧
        line3.attr("x1", startX - GRID_HEIGHT * 3 / 2)
            .attr("y1", startY + GRID_HEIGHT)
            .attr("x2", startX - GRID_HEIGHT * 3 / 2)
            .attr("y2", endY - GRID_HEIGHT);
        //A~B中心折点=>B侧=>B正上折点
        line4.attr("x1", startX - GRID_HEIGHT * 3 / 2)
            .attr("y1", endY - GRID_HEIGHT)
            .attr("x2", endX)
            .attr("y2", endY - GRID_HEIGHT);
        //B正上折点=>终点
        line5.attr("x1", endX)
            .attr("y1", endY - GRID_HEIGHT)
            .attr("x2", endX)
            .attr("y2", endY - GRID_HEIGHT / 2);
    }
    //画箭头
    arrow1.attr("x1", endX)
        .attr("y1", endY - GRID_HEIGHT / 2)
        .attr("x2", endX - ARROWS)
        .attr("y2", endY - GRID_HEIGHT / 2 - ARROWS);
    arrow2.attr("x1", endX)
        .attr("y1", endY - GRID_HEIGHT / 2)
        .attr("x2", endX + ARROWS)
        .attr("y2", endY - GRID_HEIGHT / 2 - ARROWS);
    let { lines } = svgData;
    let index = '';
    lines.forEach((item, i) => {
        if (item.father.id === fatherId) {
            index = i;
        }
    });
    let data = {
        "father": {
            "id": fatherId,
            "beginGraphId": beginId,
            "endGraphId": endId,
        },
        "line1": {
            "x1": line1.attr("x1"),
            "y1": line1.attr("y1"),
            "x2": line1.attr("x2"),
            "y2": line1.attr("y2"),
        },
        "line2": {
            "x1": line2.attr("x1"),
            "y1": line2.attr("y1"),
            "x2": line2.attr("x2"),
            "y2": line2.attr("y2"),
        },
        "line3": {
            "x1": line3.attr("x1"),
            "y1": line3.attr("y1"),
            "x2": line3.attr("x2"),
            "y2": line3.attr("y2"),
        },
        "line4": {
            "x1": line4.attr("x1"),
            "y1": line4.attr("y1"),
            "x2": line4.attr("x2"),
            "y2": line4.attr("y2"),
        },
        "line5": {
            "x1": line5.attr("x1"),
            "y1": line5.attr("y1"),
            "x2": line5.attr("x2"),
            "y2": line5.attr("y2"),
        },
        "arrow1": {
            "x1": arrow1.attr("x1"),
            "y1": arrow1.attr("y1"),
            "x2": arrow1.attr("x2"),
            "y2": arrow1.attr("y2"),
        },
        "arrow2": {
            "x1": arrow2.attr("x1"),
            "y1": arrow2.attr("y1"),
            "x2": arrow2.attr("x2"),
            "y2": arrow2.attr("y2"),
        }
    };
    if (index !== '') {
        lines[index] = data;
    }
    else {
        lines.push(data);
    }
}
/**
 * 从两侧出
 * @param {number} startX 线段的起点X
 * @param {number} startY 线段的起点Y
 * @param {number} endX 线段的终点X
 * @param {number} endY 线段的终点Y
 * @param {obj} line1 线段1
 * @param {obj} line2 线段2
 * @param {obj} line3 线段3
 * @param {obj} line4 线段4
 * @param {obj} line5 线段5
 * @param {obj} arrow1 箭头1
 * @param {obj} arrow2 箭头2
 */
const drawLineFromSide = (startX, startY, endX, endY,
    line1, line2, line3, line4, line5,
    arrow1, arrow2,
    fatherId, beginId, endId, svgData) => {

    //1、A在B的正左，左下,一小部分左上
    if (startX + GRID_WIDTH <= endX - GRID_WIDTH && startY >= endY - GRID_HEIGHT) {
        //起点=>A点正右折点
        line1.attr("x1", startX + GRID_WIDTH)
            .attr("y1", startY)
            .attr("x2", startX + GRID_WIDTH + (endX - GRID_WIDTH - startX - GRID_WIDTH) / 2)
            .attr("y2", startY);
        //A点正右折点=>A点正右折点的正上方折点
        line2.attr("x1", startX + GRID_WIDTH + (endX - GRID_WIDTH - startX - GRID_WIDTH) / 2)
            .attr("y1", startY)
            .attr("x2", startX + GRID_WIDTH + (endX - GRID_WIDTH - startX - GRID_WIDTH) / 2)
            .attr("y2", endY - GRID_HEIGHT);
        //A点正右折点的正上方折点=>B点正上方折点
        line3.attr("x1", startX + GRID_WIDTH + (endX - GRID_WIDTH - startX - GRID_WIDTH) / 2)
            .attr("y1", endY - GRID_HEIGHT)
            .attr("x2", endX)
            .attr("y2", endY - GRID_HEIGHT);
        //B点正上方折点=>终点
        line4.attr("x1", endX)
            .attr("y1", endY - GRID_HEIGHT)
            .attr("x2", endX)
            .attr("y2", endY - GRID_HEIGHT / 2);
        line5.attr("x1", null)
            .attr("y1", null)
            .attr("x2", null)
            .attr("y2", null);
    }
    //2、A在B的正右，右下,一小部分右上
    else if (startX - GRID_WIDTH >= endX + GRID_WIDTH && startY >= endY - GRID_HEIGHT) {

        //起点=>A点正右折点
        line1.attr("x1", startX - GRID_WIDTH)
            .attr("y1", startY)
            .attr("x2", startX + GRID_WIDTH + (endX - GRID_WIDTH - startX - GRID_WIDTH) / 2)
            .attr("y2", startY);
        //A点正右折点=>A点正右折点的正上方折点
        line2.attr("x1", startX + GRID_WIDTH + (endX - GRID_WIDTH - startX - GRID_WIDTH) / 2)
            .attr("y1", startY)
            .attr("x2", startX + GRID_WIDTH + (endX - GRID_WIDTH - startX - GRID_WIDTH) / 2)
            .attr("y2", endY - GRID_HEIGHT);
        //A点正右折点的正上方折点=>B点正上方折点
        line3.attr("x1", startX + GRID_WIDTH + (endX - GRID_WIDTH - startX - GRID_WIDTH) / 2)
            .attr("y1", endY - GRID_HEIGHT)
            .attr("x2", endX)
            .attr("y2", endY - GRID_HEIGHT);
        //B点正上方折点=>终点
        line4.attr("x1", endX)
            .attr("y1", endY - GRID_HEIGHT)
            .attr("x2", endX)
            .attr("y2", endY - GRID_HEIGHT / 2);
        line5.attr("x1", null)
            .attr("y1", null)
            .attr("x2", null)
            .attr("y2", null);
    }
    //3、A在B的下方偏左 7、A在B的上方偏左
    else if ((startX + GRID_WIDTH > endX - GRID_WIDTH && startX + GRID_WIDTH < endX + GRID_WIDTH && startY >= endY - GRID_HEIGHT)
        || (startX + GRID_WIDTH >= endX && startX + GRID_WIDTH <= endX + GRID_WIDTH && startY < endY - GRID_HEIGHT)
    ) {
        //起点=>A点正右折点
        line1.attr("x1", startX + GRID_WIDTH)
            .attr("y1", startY)
            .attr("x2", endX + 3 * GRID_WIDTH / 2)
            .attr("y2", startY);
        //A点正右折点=>A点正右折点的正上方折点
        line2.attr("x1", endX + 3 * GRID_WIDTH / 2)
            .attr("y1", startY)
            .attr("x2", endX + 3 * GRID_WIDTH / 2)
            .attr("y2", endY - GRID_HEIGHT);
        //A点正右折点的正上方折点=>B点正上方折点
        line3.attr("x1", endX + 3 * GRID_WIDTH / 2)
            .attr("y1", endY - GRID_HEIGHT)
            .attr("x2", endX)
            .attr("y2", endY - GRID_HEIGHT);
        //B点正上方折点=>终点
        line4.attr("x1", endX)
            .attr("y1", endY - GRID_HEIGHT)
            .attr("x2", endX)
            .attr("y2", endY - GRID_HEIGHT / 2);
        line5.attr("x1", null)
            .attr("y1", null)
            .attr("x2", null)
            .attr("y2", null);
    }
    //4、A在B的下方偏右 8、A在B的上方偏右
    else if ((startX >= endX && startX - GRID_WIDTH < endX + GRID_WIDTH && startY >= endY - GRID_HEIGHT)
        || (startX > endX && startX - GRID_WIDTH <= endX && startY < endY - GRID_HEIGHT)
    ) {
        //起点=>A点正左折点
        line1.attr("x1", startX - GRID_WIDTH)
            .attr("y1", startY)
            .attr("x2", endX - 3 * GRID_WIDTH / 2)
            .attr("y2", startY);
        //A点正左折点=>A点正左折点的正上方折点
        line2.attr("x1", endX - 3 * GRID_WIDTH / 2)
            .attr("y1", startY)
            .attr("x2", endX - 3 * GRID_WIDTH / 2)
            .attr("y2", endY - GRID_HEIGHT);
        //A点正左折点的正上方折点=>B点正上方折点
        line3.attr("x1", endX - 3 * GRID_WIDTH / 2)
            .attr("y1", endY - GRID_HEIGHT)
            .attr("x2", endX)
            .attr("y2", endY - GRID_HEIGHT);
        //B点正上方折点=>终点
        line4.attr("x1", endX)
            .attr("y1", endY - GRID_HEIGHT)
            .attr("x2", endX)
            .attr("y2", endY - GRID_HEIGHT / 2);
        line5.attr("x1", null)
            .attr("y1", null)
            .attr("x2", null)
            .attr("y2", null);
    }
    //5、A在B的左上
    else if (startX + GRID_WIDTH < endX && startY < endY - GRID_HEIGHT) {
        //起点=>A点正右折点
        line1.attr("x1", startX + GRID_WIDTH)
            .attr("y1", startY)
            .attr("x2", endX)
            .attr("y2", startY);
        //A点正右折点=>终点
        line2.attr("x1", endX)
            .attr("y1", startY)
            .attr("x2", endX)
            .attr("y2", endY - GRID_HEIGHT / 2);
        line3.attr("x1", null)
            .attr("y1", null)
            .attr("x2", null)
            .attr("y2", null);
        line4.attr("x1", null)
            .attr("y1", null)
            .attr("x2", null)
            .attr("y2", null);
        line5.attr("x1", null)
            .attr("y1", null)
            .attr("x2", null)
            .attr("y2", null);
    }
    //6、A在B的右上
    else if (startX - GRID_WIDTH > endX && startY < endY - GRID_HEIGHT) {
        //起点=>A点正左折点
        line1.attr("x1", startX - GRID_WIDTH)
            .attr("y1", startY)
            .attr("x2", endX)
            .attr("y2", startY);
        //A点正左折点=>终点
        line2.attr("x1", endX)
            .attr("y1", startY)
            .attr("x2", endX)
            .attr("y2", endY - GRID_HEIGHT / 2);
        line3.attr("x1", null)
            .attr("y1", null)
            .attr("x2", null)
            .attr("y2", null);
        line4.attr("x1", null)
            .attr("y1", null)
            .attr("x2", null)
            .attr("y2", null);
        line5.attr("x1", null)
            .attr("y1", null)
            .attr("x2", null)
            .attr("y2", null);
    }
    //画箭头
    arrow1.attr("x1", endX)
        .attr("y1", endY - GRID_HEIGHT / 2)
        .attr("x2", endX - ARROWS)
        .attr("y2", endY - GRID_HEIGHT / 2 - ARROWS);
    arrow2.attr("x1", endX)
        .attr("y1", endY - GRID_HEIGHT / 2)
        .attr("x2", endX + ARROWS)
        .attr("y2", endY - GRID_HEIGHT / 2 - ARROWS);

    let { lines } = svgData;
    let index = '';
    lines.forEach((item, i) => {
        if (item.father.id === fatherId) {
            index = i;
        }
    });
    let data = {
        "father": {
            "id": fatherId,
            "beginGraphId": beginId,
            "endGraphId": endId,
        },
        "line1": {
            "x1": line1.attr("x1"),
            "y1": line1.attr("y1"),
            "x2": line1.attr("x2"),
            "y2": line1.attr("y2"),
        },
        "line2": {
            "x1": line2.attr("x1"),
            "y1": line2.attr("y1"),
            "x2": line2.attr("x2"),
            "y2": line2.attr("y2"),
        },
        "line3": {
            "x1": line3.attr("x1"),
            "y1": line3.attr("y1"),
            "x2": line3.attr("x2"),
            "y2": line3.attr("y2"),
        },
        "line4": {
            "x1": line4.attr("x1"),
            "y1": line4.attr("y1"),
            "x2": line4.attr("x2"),
            "y2": line4.attr("y2"),
        },
        "line5": {
            "x1": line5.attr("x1"),
            "y1": line5.attr("y1"),
            "x2": line5.attr("x2"),
            "y2": line5.attr("y2"),
        },
        "arrow1": {
            "x1": arrow1.attr("x1"),
            "y1": arrow1.attr("y1"),
            "x2": arrow1.attr("x2"),
            "y2": arrow1.attr("y2"),
        },
        "arrow2": {
            "x1": arrow2.attr("x1"),
            "y1": arrow2.attr("y1"),
            "x2": arrow2.attr("x2"),
            "y2": arrow2.attr("y2"),
        }
    }
    if (index) {
        lines[index] = data;
    } else {
        lines.push(data);
    }
}