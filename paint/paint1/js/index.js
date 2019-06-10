const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

//全局的图形都保存到这里
let aMapGraphLists = [];

//绘制网格，只执行一次
let aGrids = [];
for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
        aGrids.push(new Grid(GRID_WIDTH * i - 1880, GRID_HEIGHT * j - 2000, GRID_WIDTH, GRID_HEIGHT, GRID_BORDER_WIDTH, GRID_BODER_COLOR, GRID_BACKGROUND_COLOR, { row: i, line: j }))
    }
}
//绘制左侧工具栏，只执行一次
let aUtilLists = [];

for (let i = 0; i < 4; i++) {
    let y = GRAPH_FIST_SPACE + i * (GRAPH_ITEM_HEIGHT + GRAPH_ITEM_SPACE);
    switch (i) {
        case 0:
            aUtilLists.push(new BeginGraph(genID(),(120 - GRAPH_ITEM_WIDTH) / 2, y, GRAPH_ITEM_WIDTH, GRAPH_ITEM_HEIGHT));
            break;
        case 1:
            aUtilLists.push(new EndGraph(genID(),(120 - GRAPH_ITEM_WIDTH) / 2, y, GRAPH_ITEM_WIDTH, GRAPH_ITEM_HEIGHT));
            break;
        case 2:
            aUtilLists.push(new RoundRectGraph(genID(),(120 - GRAPH_ITEM_WIDTH) / 2, y, GRAPH_ITEM_WIDTH, GRAPH_ITEM_HEIGHT, ROUND_RECT_BORDER_COLOR, "roundRect", ROUND_RECT_R));
            break;
        case 3:
            aUtilLists.push(new RhombusGraph(genID(),(120 - GRAPH_ITEM_WIDTH) / 2, y, GRAPH_ITEM_WIDTH, GRAPH_ITEM_HEIGHT));
            break;
        default:
            break;
    }

    aUtilLists[i].draw();
}

// 全局监听点击事件
canvas.onmousedown = function (ev) {
    //状态位
    let flag = true;

    let oEvent = ev || event;
    let mouseDownX = oEvent.pageX - canvas.offsetLeft;
    let mouseDownY = oEvent.pageY - canvas.offsetTop;
    console.log(mouseDownX, mouseDownY)

    //遍历工具栏图形队列
    aUtilLists.forEach((utilItem) => {
        let itemW = utilItem.width;
        let itemH = utilItem.height;
        //碰撞检测
        if (mouseDownX >= utilItem.x
            && mouseDownX <= utilItem.x + itemW
            && mouseDownY >= utilItem.y
            && mouseDownY <= utilItem.y + itemH
        ) {
            //不会再去执行下面的操作了
            flag = false
            switch (utilItem.describe) {
                case "begin":
                    aMapGraphLists.push(new BeginGraph(genID(),mouseDownX - itemW / 2, mouseDownY - itemH / 2, GRID_WIDTH * 2, GRID_HEIGHT, NEW_BEGIN_RECT_BORDER_COLOR, "oBegin"));
                    break;
                case "end":
                    aMapGraphLists.push(new EndGraph(genID(),mouseDownX - itemW / 2, mouseDownY - itemH / 2, GRID_WIDTH * 2, GRID_HEIGHT, NEW_END_RECT_BORDER_COLOR, "oEnd"));
                    break;
                case "roundRect":
                    aMapGraphLists.push(new RoundRectGraph(genID(),mouseDownX - itemW / 2, mouseDownY - itemH / 2, GRID_WIDTH * 2, GRID_HEIGHT, NEW_ROUND_RECT_BORDER_COLOR, "oRoundRect"));
                    break;
                case "rhombus":
                    aMapGraphLists.push(new RhombusGraph(genID(),mouseDownX - itemW / 2, mouseDownY - itemH / 2, GRID_WIDTH * 2, GRID_HEIGHT, NEW_RHOMBUS_BORDER_COLOR, "oRhombus"));
                    break;
                default:
                    break;
            }
            //直接操作数组的最后一个对象  =>  也就是最外层的图形
            let oPaint = aMapGraphLists[aMapGraphLists.length - 1];

            document.onmousemove = function (ev) {

                let oEvent = ev || event;

                var x = oEvent.pageX - canvas.offsetLeft;
                var y = oEvent.pageY - canvas.offsetTop;

                //拖动超出界面的话拉回来  注意:`-20`,`-10`是工具栏和实际的宽高差，暂时是这样，还没改！！！
                if (x - itemW / 2 < 0) {
                    x = itemW / 2;
                }
                if (x - itemW / 2 > canvas.width - itemW - 20) {
                    x = canvas.width - itemW / 2 - 20
                }
                if (y - itemH / 2 < 0) {
                    y = itemH / 2;
                }
                if (y - itemH / 2 > canvas.height - itemH - 10) {
                    y = canvas.height - itemH / 2 - 10
                }


                oPaint.x = x - itemW / 2;
                oPaint.y = y - itemH / 2;
            }

            document.onmouseup = function () {
                //如果新拖出来的这个图形没有落在画布上，干掉它
                if (oPaint.x <= 120) {
                    aMapGraphLists.pop();
                } else {
                    //吸铁石效果
                    aGrids.forEach((gridItem, index) => {
                        //性能优化 => 落在了这个格子内之后 再进行操作
                        if (oPaint.x >= gridItem.x
                            && oPaint.x < gridItem.x + gridItem.width
                            && oPaint.y >= gridItem.y
                            && oPaint.y < gridItem.y + gridItem.width
                        ) {
                            //左上角
                            if (oPaint.x >= gridItem.x
                                && oPaint.x < gridItem.x + gridItem.width / 2
                                && oPaint.y >= gridItem.y
                                && oPaint.y < gridItem.y + gridItem.height / 2
                            ) {
                                // aGrids[index].hasGraph = true;
                                // aGrids[index + 100].hasGraph = true;
                                
                                // aGrids[index].hasOrigin = oPaint.id;
                                //备份
                                console.log(aGrids[index])
                                oPaint.hasGridOrigin = aGrids[index];

                                oPaint.x = oPaint.hasGridOrigin.x;
                                oPaint.y = oPaint.hasGridOrigin.y;
                                // console.log(oPaint.x, oPaint.y)
                            }
                            //右上角
                            else if (oPaint.x >= gridItem.x + gridItem.width / 2
                                && oPaint.x < gridItem.x + gridItem.width
                                && oPaint.y >= gridItem.y
                                && oPaint.y < gridItem.y + gridItem.height / 2) {

                                // aGrids[index + 100].hasGraph = true;
                                // aGrids[index + 200].hasGraph = true;

                                // aGrids[index + 100].hasOrigin = utilItem.id;
                                oPaint.hasGridOrigin = aGrids[index+100];

                                oPaint.x = oPaint.hasGridOrigin.x;
                                oPaint.y = oPaint.hasGridOrigin.y;
                            }
                            //左下角
                            else if (oPaint.x >= gridItem.x
                                && oPaint.x < gridItem.x + gridItem.width / 2
                                && oPaint.y >= gridItem.y + gridItem.height / 2
                                && oPaint.y < gridItem.y + gridItem.height) {

                                // aGrids[index + 101].hasGraph = true;
                                // aGrids[index + 1].hasGraph = true;

                                // aGrids[index + 101].hasOrigin = utilItem.id;

                                // oPaint.x = gridItem.x;
                                // oPaint.y = gridItem.y + gridItem.height;

                                oPaint.hasGridOrigin = aGrids[index + 1];

                                oPaint.x = oPaint.hasGridOrigin.x ;
                                oPaint.y = oPaint.hasGridOrigin.y ;
                            }
                            // 右下角
                            else {
                                // aGrids[index + 101].hasGraph = true;
                                // aGrids[index + 102].hasGraph = true;

                                // aGrids[index + 101].hasOrigin = utilItem.id;

                                // oPaint.x = gridItem.x + gridItem.width;
                                // oPaint.y = gridItem.y + gridItem.height;

                                oPaint.hasGridOrigin = aGrids[index + 101];

                                oPaint.x = oPaint.hasGridOrigin.x ;
                                oPaint.y = oPaint.hasGridOrigin.y ;
                            }
                        }
                    })
                }

                document.onmousemove = null;
                document.onmouserup = null;
            }
        }
    })

    if (flag) {
        //遍历地图上的图形数列
        aMapGraphLists.forEach((item, index) => {
            let itemW = item.width;
            let itemH = item.height;
            //碰撞检测
            if (mouseDownX >= item.x
                && mouseDownX <= item.x + itemW
                && mouseDownY >= item.y
                && mouseDownY <= item.y + itemH
            ) {
                //不会再去执行下面的操作了
                flag = false;
                aMapGraphLists.push(aMapGraphLists.splice(index, 1)[0]);
                document.onmousemove = function (ev) {

                    let oEvent = ev || event;

                    var x = oEvent.pageX - canvas.offsetLeft;
                    var y = oEvent.pageY - canvas.offsetTop;

                    //拖动超出界面的话拉回来
                    if (x - itemW / 2 < 0) {
                        x = itemW / 2;
                    }
                    if (x - itemW / 2 > canvas.width - itemW) {
                        x = canvas.width - itemW / 2
                    }
                    if (y - itemH / 2 < 0) {
                        y = itemH / 2;
                    }
                    if (y - itemH / 2 > canvas.height - itemH) {
                        y = canvas.height - itemH / 2
                    }
                    //直接操作数组的最后一个对象  =>  也就是最外层的图形
                    let oPaint = aMapGraphLists[aMapGraphLists.length - 1]

                    oPaint.x = x - itemW / 2;
                    oPaint.y = y - itemH / 2;
                }

                document.onmouseup = function () {
                    document.onmousemove = null;
                    document.onmouserup = null;
                }
            }
        })
    }


    //拖拽网格
    if (flag &&
        mouseDownX >= 120
        && mouseDownX <= canvas.width
        && mouseDownY >= 0
        && mouseDownY <= canvas.height
    ) {
        //拖动背景网格
        document.onmousemove = function (ev) {
            let oEvent = ev || event;

            var x = oEvent.pageX - canvas.offsetLeft;
            var y = oEvent.pageY - canvas.offsetTop;

            let distanceX = Math.round((x - mouseDownX) / SPEED);
            let distanceY = Math.round((y - mouseDownY) / SPEED);


            aGrids.forEach(gridItem => {

                gridItem.x = gridItem.x + distanceX;
                gridItem.y = gridItem.y + distanceY;
                
                // if (gridItem.hasOrigin) {
                //     console.log(gridItem.hasOrigin)

                //     aMapGraphLists.forEach(graphItem => {

                //         console.log(graphItem.id)
                //         console.log(gridItem.hasOrigin)
                //         if (graphItem.id === gridItem.hasOrigin) {
                //             console.log(123)
                //             graphItem.x = gridItem.x + distanceX;
                //             graphItem.y = gridItem.y + distanceY;
                //         }
                //     })
                // }
            })
            console.log(aMapGraphLists[aMapGraphLists.length - 1].hasGridOrigin)


            if (aGrids[0].x >= 120) {

                aGrids.forEach((item) => {
                    item.x = 120 + item.location.row * GRID_WIDTH;
                })
            }
            if (aGrids[0].y >= 0) {

                aGrids.forEach((item) => {
                    item.y = item.location.line * GRID_HEIGHT;
                })
            }

            if (aGrids[9999].x <= canvas.width - GRID_WIDTH) {
                aGrids.forEach((item) => {
                    item.x = item.location.row * GRID_WIDTH - 3880;
                })
            }

            if (aGrids[9999].y <= canvas.height - GRID_HEIGHT) {
                aGrids.forEach((item) => {
                    item.y = item.location.line * GRID_HEIGHT - 4000;
                })
            }
        }

        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouserup = null;
        }
    }

}



function flashMap() {
    //先清空画布
    context.clearRect(0, 0, canvas.width, canvas.height);
    //画格子
    aGrids.forEach(item => item.draw());
    //画背景
    drawSide();
    //绘制左侧工具栏 
    aUtilLists.forEach(item => item.draw());
    //绘制拖动到滑板上的图形
    aMapGraphLists.forEach(item => item.draw());
    //不停的去刷新画布
    requestAnimationFrame(flashMap);
}
flashMap();

window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 30);
    };