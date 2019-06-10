const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.style.left = -1880 + 'px';
canvas.style.top = -2000 + 'px';

//所有格子地图上的的图形（注：没有线段）都保存到这里
let aMapGraphLists = [];
//工具栏边框
let oSide = new Side();
//地图格子数组
let aGrids = [];
//工具栏内容数组
let aUtilLists = [];
//中间件 => 栈顶
let aMiddlewar = [];
//画线
let aLine = [];
//画折线
let aBrokenLines = [];
//定时器
let timer = true;
//状态位  =>  如果按下了shift键，则只执行拖动线操作
let ifShift = false;
//临时状态位 => 图形出线 是 否
let isYes = true;

//初始化函数
init();

flashMap();
//按住shift之后  =>  从图形拖出一条线
document.addEventListener('keydown', (ev) => {
    let oEvent = ev || event;
    //如果按下的是 shift 键
    if (oEvent.keyCode === 16) {
        ifShift = true;
    }
})
document.addEventListener('keyup', (ev) => {
    let oEvent = ev || event;
    //如果抬起的是 shift 键
    if (oEvent.keyCode === 16) {
        ifShift = false;
    }
})

// 全局监听点击事件
canvas.onmousedown = function (ev) {
    let oEvent = ev || event;
    if (oEvent.button == 2 || oEvent.button == 3 || oEvent.button == 4 || oEvent.button == 5 || oEvent.button == 6 || oEvent.button == 7) { return; }

    timer = true;

    flashMap();
    //状态位 => 上面的执行了的话，下面就不再执行了
    let flag = true;

    let mouseDownX = oEvent.pageX - canvas.offsetLeft;
    let mouseDownY = oEvent.pageY - canvas.offsetTop;
    //拖拽工具栏的图形
    if (!ifShift) {
        for (let i = 0; i < aUtilLists.length; i++) {

            let itemW = aUtilLists[i].width;
            let itemH = aUtilLists[i].height;
            //碰撞检测
            if (mouseDownX >= aUtilLists[i].x
                && mouseDownX <= aUtilLists[i].x + itemW
                && mouseDownY >= aUtilLists[i].y
                && mouseDownY <= aUtilLists[i].y + itemH
            ) {
                //不会再去执行之后的拖动图形等操作了
                flag = false
                switch (aUtilLists[i].describe) {

                    case "begin":
                        aMiddlewar.push(new BeginGraph(getId(), mouseDownX - itemW / 2, mouseDownY - itemH / 2, GRID_WIDTH * 2, GRID_HEIGHT, NEW_BEGIN_RECT_BORDER_COLOR, []));
                        break;
                    case "end":
                        aMiddlewar.push(new EndGraph(getId(), mouseDownX - itemW / 2, mouseDownY - itemH / 2, GRID_WIDTH * 2, GRID_HEIGHT, NEW_END_RECT_BORDER_COLOR, []));
                        break;
                    case "roundRect":
                        aMiddlewar.push(new RoundRectGraph(getId(), mouseDownX - itemW / 2, mouseDownY - itemH / 2, GRID_WIDTH * 2, GRID_HEIGHT, NEW_ROUND_RECT_BORDER_COLOR, []));
                        break;
                    case "rhombus":
                        aMiddlewar.push(new RhombusGraph(getId(), mouseDownX - itemW / 2, mouseDownY - itemH / 2, GRID_WIDTH * 2, GRID_HEIGHT, NEW_RHOMBUS_BORDER_COLOR, []));
                        break;
                    default:
                        break;
                }

                document.onmousemove = function (ev) {
                    let oEvent = ev || event;

                    var x = oEvent.pageX - canvas.offsetLeft;
                    var y = oEvent.pageY - canvas.offsetTop;

                    aMiddlewar[0].x = x - itemW / 2;
                    aMiddlewar[0].y = y - itemH / 2;

                    //超出边界拉回来
                    graphPullBack(aMiddlewar[0]);
                }

                document.onmouseup = function () {
                    //没有拖到格子画布上的话干掉它
                    aMiddlewar.forEach(item => {
                        if (!(item.x < oSide.x + oSide.width
                            || item.y < oSide.y
                            || item.y > oSide.y + oSide.height)) {

                            //吸铁石效果
                            let graph = magnet(item, false);
                            if (graph) {
                                aMapGraphLists.push(graph);
                            }
                        }
                        aMiddlewar = [];
                    })
                    timer = false;

                    document.onmousemove = null;
                    document.onmouserup = null;
                }
                break;
            }
        }
    }

    //拖拽网格上的图形
    if (!ifShift && flag) {
        //遍历地图上的图形数列
        for (let i = 0; i < aMapGraphLists.length; i++) {
            let itemW = aMapGraphLists[i].width;
            let itemH = aMapGraphLists[i].height;
            //碰撞检测
            if (mouseDownX >= aMapGraphLists[i].x
                && mouseDownX <= aMapGraphLists[i].x + itemW
                && mouseDownY >= aMapGraphLists[i].y
                && mouseDownY <= aMapGraphLists[i].y + itemH
            ) {
                //不会再去执行下面的操作了
                flag = false;
                let backup = aMapGraphLists.splice(i, 1)[0];
                let _backupX = backup.x;
                let _backupY = backup.y;
                let _backupDsCrb = backup.describe;
                //清空之前的格子记号
                aGrids[backup.describe[0]].describe = '';
                aGrids[backup.describe[1]].describe = '';

                aMiddlewar.push(backup);
                //直接操作数组的最后一个对象  =>  也就是最外层的图形
                document.onmousemove = function (ev) {

                    let oEvent = ev || event;

                    var x = oEvent.pageX - canvas.offsetLeft;
                    var y = oEvent.pageY - canvas.offsetTop;

                    aMiddlewar[0].x = x - itemW / 2;
                    aMiddlewar[0].y = y - itemH / 2;

                    aBrokenLines.forEach((lineItem) => {

                        if (lineItem.beginId === aMiddlewar[0].id) {
                            lineItem.startX = aMiddlewar[0].x + 50;
                            lineItem.startY = aMiddlewar[0].y + 25;
                        }
                        if (lineItem.endId === aMiddlewar[0].id) {
                            lineItem.endX = aMiddlewar[0].x + 50;
                            lineItem.endY = aMiddlewar[0].y + 25;
                        }
                    })
                    // aLine[0].endY = aMiddlewar[0].y;
                    //超出边界拉回来
                    graphPullBack(aMiddlewar[0]);
                }

                document.onmouseup = function () {
                    aMiddlewar.forEach(item => {
                        //没有拖到格子画布上的话还原
                        if (item.x < oSide.x + oSide.width
                            || item.y < oSide.y
                            || item.y > oSide.y + oSide.height) {
                            //1、把坐标还原
                            backup.x = _backupX;
                            backup.y = _backupY;
                            //2、把格子还原   给格子打上记号  =>  该格子已经被占用
                            aGrids[_backupDsCrb[0]].describe = true;
                            aGrids[_backupDsCrb[1]].describe = true;
                            aMapGraphLists.push(backup);
                            aBrokenLines.forEach((lineItem) => {

                                if (lineItem.beginId === backup.id) {
                                    lineItem.startX = backup.x + 50;
                                    lineItem.startY = backup.y + 25;
                                }
                                if (lineItem.endId === backup.id) {
                                    lineItem.endX = backup.x + 50;
                                    lineItem.endY = backup.y + 25;
                                }
                            })
                        } else {

                            //吸铁石效果
                            let graph = magnet(item, backup, _backupX, _backupY, _backupDsCrb);
                            aMapGraphLists.push(graph);
                            aBrokenLines.forEach((lineItem) => {
                                if (lineItem.beginId === graph.id) {
                                    lineItem.startX = graph.x + 50;
                                    lineItem.startY = graph.y + 25;
                                }
                                if (lineItem.endId === graph.id) {
                                    lineItem.endX = graph.x + 50;
                                    lineItem.endY = graph.y + 25;
                                }
                            })
                        }

                        aMiddlewar = [];
                    });

                    timer = false;
                    document.onmousemove = null;
                    document.onmouserup = null;
                }
                break;
            }
        }
    }


    //拖拽网格
    if (!ifShift && flag &&
        !(mouseDownX >= oSide.x
            && mouseDownX <= oSide.x + oSide.width
            && mouseDownY >= oSide.y
            && mouseDownY <= oSide.y + oSide.height)
    ) {
        //拖动背景网格
        document.onmousemove = function (ev) {
            let oEvent = ev || event;

            var x = oEvent.pageX - canvas.offsetLeft;
            var y = oEvent.pageY - canvas.offsetTop;

            //拖动的位移  注意！！！SPEED越小速度越快  =>  被除数么
            let distanceX = parseInt(canvas.style.left) + Math.round((x - mouseDownX) / SPEED);
            let distanceY = parseInt(canvas.style.top) + Math.round((y - mouseDownY) / SPEED);
            //锁定canvas
            canvas.style.left = distanceX + 'px';
            canvas.style.top = distanceY + 'px';
            //锁定工具栏外框
            oSide.x = - distanceX;
            oSide.y = - distanceY;
            //锁定工具栏内容
            aUtilLists.forEach((item, index) => {
                item.x = (120 - GRAPH_ITEM_WIDTH) / 2 - distanceX;
                item.y = GRAPH_FIST_SPACE + index * (GRAPH_ITEM_SPACE + item.height) - distanceY;
            })

            //canvas超出边界拉回来
            canvasPullBack();
        }

        document.onmouseup = function () {
            timer = false;
            document.onmousemove = null;
            document.onmouserup = null;
        }
    }


    //拖拽线段
    if (ifShift) {
        //遍历地图上的图形数列
        for (let i = 0; i < aMapGraphLists.length; i++) {
            let itemW = aMapGraphLists[i].width;
            let itemH = aMapGraphLists[i].height;
            //碰撞检测
            if (mouseDownX >= aMapGraphLists[i].x
                && mouseDownX <= aMapGraphLists[i].x + itemW
                && mouseDownY >= aMapGraphLists[i].y
                && mouseDownY <= aMapGraphLists[i].y + itemH
            ) {
                let beginId = aMapGraphLists[i].id;
                let startX = aMapGraphLists[i].x;
                let startY = aMapGraphLists[i].y;

                aLine.push(new Line(startX + itemW / 2, startY + itemH / 2, mouseDownX, mouseDownY))

                document.onmousemove = function (ev) {

                    let oEvent = ev || event;

                    aLine.forEach(item => {
                        item.endX = oEvent.pageX - canvas.offsetLeft;
                        item.endY = oEvent.pageY - canvas.offsetTop;
                        //超出边界拉回来
                        linePullBack(item);
                    })

                }

                document.onmouseup = function () {

                    for (let j = 0; j < aMapGraphLists.length; j++) {
                        let itemW = aMapGraphLists[j].width;
                        let itemH = aMapGraphLists[j].height;

                        //碰撞检测
                        if (aLine[0].endX >= aMapGraphLists[j].x
                            && aLine[0].endX <= aMapGraphLists[j].x + itemW
                            && aLine[0].endY >= aMapGraphLists[j].y
                            && aLine[0].endY <= aMapGraphLists[j].y + itemH
                        ) {
                            //红线的最终位置
                            aLine[0].endX = aMapGraphLists[j].x + itemW / 2;
                            aLine[0].endY = aMapGraphLists[j].y + itemH / 2;
                            let endId = aMapGraphLists[j].id;
                            /**
                             * 这个时候我们需要去弄那个折线了
                             */
                            //线段的大数组 => 新生成一条粉线
                            aBrokenLines.push(new BrokenLine(getId(), startX + itemW / 2, startY + itemH / 2, aMapGraphLists[j].x + itemW / 2, aMapGraphLists[j].y + itemH / 2, 2, 'pink', beginId, endId));
                            //把线段的id给 起点图形
                            aMapGraphLists[i].hasBeginLine.push(aBrokenLines[aBrokenLines.length - 1].id);
                            //把线段的id给 终点图形
                            aMapGraphLists[j].hasEndLine.push(aBrokenLines[aBrokenLines.length - 1].id);
                            break;
                        }
                    }
                    aLine = [];
                    timer = false;
                    ifShift = false;
                    document.onmousemove = null;
                    document.onmouserup = null;
                }
                break;
            }
        }
    }
}

window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
//关闭requestAnimFrame的函数
window.cancelAnimationFrame = window.cancelAnimationFrame ||
    Window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    function (id) {
        //为了使setTimteout的尽可能的接近每秒60帧的效果
        window.clearTimeout(id);
    }
