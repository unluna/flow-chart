//图形 超出边界拉回来
let graphPullBack = (oPaint) => {
    //拖动超出界面的话拉回来 
    if (oPaint.x <= oSide.x) {
        oPaint.x = oSide.x;
    }
    if (oPaint.x >= oSide.x + 1120 - oPaint.width) {
        oPaint.x = oSide.x + 1120 - oPaint.width;
    }
    if (oPaint.y <= oSide.y) {
        oPaint.y = oSide.y;
    }
    if (oPaint.y >= oSide.y + 1000 - oPaint.height) {
        oPaint.y = oSide.y + 1000 - oPaint.height;
    }
}

//画布 超出边界拉回来
let canvasPullBack = () => {
    //超出边界 拖回来
    if (parseInt(canvas.style.left) >= 0) {
        canvas.style.left = 0 + 'px';

        oSide.x = 0;

        aUtilLists.forEach(item => {
            item.x = (120 - GRAPH_ITEM_WIDTH) / 2;
        })
    }
    if (parseInt(canvas.style.top) >= 0) {
        canvas.style.top = 0 + 'px';

        oSide.y = 0;

        aUtilLists.forEach((item, index) => {
            item.y = GRAPH_FIST_SPACE + index * (GRAPH_ITEM_SPACE + item.height);
        })
    }

    if (parseInt(canvas.style.left) <= -3880) {
        canvas.style.left = -3880 + 'px';
        oSide.x = 3880;

        aUtilLists.forEach((item, index) => {
            item.x = (120 - GRAPH_ITEM_WIDTH) / 2 + 3880;

        })
    }

    if (parseInt(canvas.style.top) <= -4000) {
        canvas.style.top = -4000 + 'px';

        oSide.y = 4000;

        aUtilLists.forEach((item, index) => {
            item.y = GRAPH_FIST_SPACE + index * (GRAPH_ITEM_SPACE + item.height) + 4000;
        })
    }
}

//线段 超出边界拉回来
let linePullBack = (oPaint) => {
    //拖动超出界面的话拉回来 
    if (oPaint.endX <= oSide.x + oSide.width) {
        oPaint.endX = oSide.x + oSide.width;
    }
    if (oPaint.endX >= oSide.x + 1120 ) {
        oPaint.endX = oSide.x + 1120;
    }
    if (oPaint.endY <= oSide.y) {
        oPaint.endY = oSide.y;
    }
    if (oPaint.endY >= oSide.y + 1000 ) {
        oPaint.endY = oSide.y + 1000 ;
    }
}
