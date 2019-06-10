//按住shift之后  =>  从图形拖出一条线
document.addEventListener('keydown', (ev) => {
    let oEvent = ev || event;
    //如果按下的是 shift 键
    if (+oEvent.keyCode === 16) {
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
svg.on("mousedown", function (ev) {

    let oEvent = ev || event;

    if (oEvent.button == 2 || oEvent.button == 3 || oEvent.button == 4 || oEvent.button == 5 || oEvent.button == 6 || oEvent.button == 7) {
        return;
    }

    let mouseDownX = oEvent.pageX - getOffset(oSvg).left;
    let mouseDownY = oEvent.pageY - getOffset(oSvg).top;
    //判断是否点在侧边栏上
    let str = oSide.attr("transform");
    let nSideX = parseInt(str.match(reg)[0]);
    let nSideY = parseInt(str.match(reg)[1]);
    if (mouseDownX >= nSideX
        && mouseDownX <= nSideX + 120
        && mouseDownY >= nSideY
        && mouseDownY <= nSideY + 1000
    ) {
        flag = false
    }
    //从工具栏里面new出来的图形
    if (!ifShift) {
        middle = newGraph(
            ifSideGraph, middle, svg, mouseDownX, mouseDownY,
            GRID_WIDTH, GRID_HEIGHT,
            NEW_BEGIN_RECT_BORDER_COLOR, NEW_END_RECT_BORDER_COLOR,
            NEW_ROUND_RECT_BORDER_COLOR, NEW_RHOMBUS_BORDER_COLOR
        );
    }

    //操作new出来的新图形
    if (!ifShift && middle) {
        d3.select(this)
            .on("mousemove", hdNewGraphMove)
            .on("mouseup", hdNewGraphUp)
    }

    //拖动画布
    if (!ifShift && flag) {
        document.onmousemove = function (ev) {
            let oEvent = ev || event;

            if (oEvent.button == 2 || oEvent.button == 3 || oEvent.button == 4 || oEvent.button == 5 || oEvent.button == 6 || oEvent.button == 7) { return; }

            let x = oEvent.pageX - getOffset(oSvg).left;
            let y = oEvent.pageY - getOffset(oSvg).top;

            let left = parseInt(svg.style("left"));
            let top = parseInt(svg.style("top"));

            let distanceX = parseInt(left) + Math.round((x - mouseDownX) / SPEED);
            let distanceY = parseInt(top) + Math.round((y - mouseDownY) / SPEED);

            //超出边界 拖回来
            if (distanceX >= 0) {
                distanceX = 0
            }
            if (distanceY >= 0) {
                distanceY = 0;
            }
            if (distanceX <= -3880) {
                distanceX = -3880
            }
            if (distanceY <= -4000) {
                distanceY = -4000
            }
            let { svgLctn, sideLctn } = svgData;
            svg.style("left", `${distanceX}px`)
                .style("top", `${distanceY}px`)
            //同步更新数据
            svgLctn.x = distanceX;
            svgLctn.y = distanceY

            oSide.attr("transform", `translate(${-distanceX},${-distanceY})`);
            //同步更新数据
            sideLctn.x = -distanceX;
            sideLctn.y = -distanceY;
        }
        document.onmouseup = function () {
            flag = true;
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
    //拖动线条
    if (ifShift) {
        if (beginId) {
            let transform = d3.select(`g[id="${beginId}"]`).attr("transform");
            let x = parseInt(transform.match(reg)[0]);
            let y = parseInt(transform.match(reg)[1]);
            let father = oLines.append("g")
                .attr("id", getId());
            //1
            let line1 = father.append("line")
                .attr("x1", x + NEW_GRAPH_WIDTH / 2)
                .attr("y1", y + NEW_GRAPH_HEIGHT / 2)
                .attr("x2", x + NEW_GRAPH_WIDTH / 2)
                .attr("y2", y + NEW_GRAPH_HEIGHT / 2)
                .attr("stroke", LINE_COLOR)
                .attr("stroke-width", `${LINE_WIDTH}px`)
                .attr("id", "line1")
                .on("dblclick", function () {
                    console.log(this.parentNode.id)
                });
            //2
            let line2 = father
                .append("line")
                .attr("stroke", LINE_COLOR)
                .attr("stroke-width", `${LINE_WIDTH}px`)
                .attr("id", "line2")
                .on("dblclick", function () {
                    console.log(this.parentNode.id)
                });
            //3
            let line3 = father
                .append("line")
                .attr("stroke", LINE_COLOR)
                .attr("stroke-width", `${LINE_WIDTH}px`)
                .attr("id", "line3")
                .on("dblclick", function () {
                    console.log(this.parentNode.id)
                });
            //4
            let line4 = father
                .append("line")
                .attr("stroke", LINE_COLOR)
                .attr("stroke-width", `${LINE_WIDTH}px`)
                .attr("id", "line4")
                .on("dblclick", function () {
                    console.log(this.parentNode.id)
                });
            //5
            let line5 = father
                .append("line")
                .attr("stroke", LINE_COLOR)
                .attr("stroke-width", `${LINE_WIDTH}px`)
                .attr("id", "line5")
                .on("dblclick", function () {
                    console.log(this.parentNode.id)
                });
            //箭头1
            let arrow1 = father
                .append("line")
                .attr("stroke", LINE_COLOR)
                .attr("stroke-width", `${LINE_WIDTH}px`)
                .attr("id", "arrow1")
                .on("dblclick", function () {
                    console.log(this.parentNode.id)
                });
            //箭头2
            let arrow2 = father
                .append("line")
                .attr("stroke", LINE_COLOR)
                .attr("stroke-width", `${LINE_WIDTH}px`)
                .attr("id", "arrow2")
                .on("dblclick", function () {
                    console.log(this.parentNode.id)
                });
            document.onmousemove = function (ev) {
                let oEvent = ev || event;

                if (oEvent.button == 2 || oEvent.button == 3 || oEvent.button == 4 || oEvent.button == 5 || oEvent.button == 6 || oEvent.button == 7) { return; }

                let mouseDownX = oEvent.pageX - getOffset(oSvg).left;
                let mouseDownY = oEvent.pageY - getOffset(oSvg).top;
                line1.attr("x2", mouseDownX)
                    .attr("y2", mouseDownY);
            }
            document.onmouseup = function (ev) {
                let oEvent = ev || event;

                if (oEvent.button == 2 || oEvent.button == 3 || oEvent.button == 4 || oEvent.button == 5 || oEvent.button == 6 || oEvent.button == 7) { return; }
                let mouseDownX = oEvent.pageX - getOffset(oSvg).left;
                let mouseDownY = oEvent.pageY - getOffset(oSvg).top;
                //是否连接上图形
                let select = false;
                let same = false;

                //遍历画布上的所有图形
                paintList.forEach(item => {
                    let transform = item.attr("transform");
                    let itemX = parseInt(transform.match(reg)[0]);
                    let itemY = parseInt(transform.match(reg)[1]);
                    //碰撞检测
                    if (mouseDownX >= itemX
                        && mouseDownX <= itemX + NEW_GRAPH_WIDTH
                        && mouseDownY >= itemY
                        && mouseDownY <= itemY + NEW_GRAPH_HEIGHT) {

                        select = true;
                        father.attr("beginGraph", beginId)
                            .attr("endGraph", item.attr("id"));


                        //好吧，终于到折线了，我就知道会有这么一天
                        //begin
                        let _begin = d3.select(`g[id="${beginId}"]`).attr("transform");
                        let _beginId = d3.select(`g[id="${beginId}"]`).attr("id");
                        let startX = parseInt(_begin.match(reg)[0]) + NEW_GRAPH_WIDTH / 2;
                        let startY = parseInt(_begin.match(reg)[1]) + NEW_GRAPH_HEIGHT / 2;
                        //end
                        let _end = item.attr("transform");
                        let _endId = item.attr("id");
                        let endX = parseInt(_end.match(reg)[0]) + NEW_GRAPH_WIDTH / 2;
                        let endY = parseInt(_end.match(reg)[1]) + NEW_GRAPH_HEIGHT / 2;
                        let { lines } = svgData;
                        //如果这两根线之前已经链接过了
                        lines.forEach(item => {
                            if (item.father.beginGraphId === _beginId
                                && item.father.endGraphId === _endId
                            ) {
                                same = true;
                            }
                        })
                        //如果它自己连接自己
                        if (_beginId !== _endId && !same) {
                            let _fatherId = father.attr("id");
                            //把线段(它爹)它的id给 起点图形
                            d3.select(`g[id="${beginId}"]`)
                                .property("line").beginId.push(_fatherId);
                            //把线段(它爹)它的id给 终点图形
                            item.property("line").endId.push(_fatherId);

                            //注意！下面两行注释代码 弹窗会用到，误删！
                            // line1.attr("x2", itemX + NEW_GRAPH_WIDTH / 2)
                            //     .attr("y2", itemY + NEW_GRAPH_HEIGHT / 2);

                            if (isYes) {
                                drawLineFromBtm(startX, startY, endX, endY,
                                    line1, line2, line3, line4, line5,
                                    arrow1, arrow2,
                                    _fatherId, _beginId, _endId, svgData);
                            } else {
                                drawLineFromSide(startX, startY, endX, endY,
                                    line1, line2, line3, line4, line5,
                                    arrow1, arrow2,
                                    _fatherId, _beginId, _endId, svgData);
                            }
                        } else {
                            same = true;
                        }

                    }
                });

                if (!select || same) {
                    father.remove();
                }
                beginId = '';
                endId = '';
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    }
})

window.onmouseup = function () {
    flag = true;
}
