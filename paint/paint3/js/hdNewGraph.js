let hdNewGraphMove = function (ev) {
    let oEvent = ev || event;

    if (oEvent.button == 2 || oEvent.button == 3 || oEvent.button == 4 || oEvent.button == 5 || oEvent.button == 6 || oEvent.button == 7) { return; }

    let mouseDownX = oEvent.pageX - getOffset(oSvg).left;
    let mouseDownY = oEvent.pageY - getOffset(oSvg).top;

    middle.attr("transform", `translate(${mouseDownX - GRID_WIDTH},${mouseDownY - GRID_HEIGHT / 2})`)
}

let hdNewGraphUp = function () {
    let nSideX = parseInt(oSide.attr("transform").match(reg)[0]);
    let nSideY = parseInt(oSide.attr("transform").match(reg)[1]);
    let nMiddleX = parseInt(middle.attr("transform").match(reg)[0]);
    let nMiddleY = parseInt(middle.attr("transform").match(reg)[1]);

    if (nMiddleX >= nSideX
        && nMiddleX <= nSideX + 120
        && nMiddleY >= nSideY
        && nMiddleY <= nSideY + 1000
    ) {
        middle.remove();
    } else {

        middle.on("mousedown", function (ev) {
            let oEvent = ev || event;

            if (oEvent.button == 2 || oEvent.button == 3 || oEvent.button == 4 || oEvent.button == 5 || oEvent.button == 6 || oEvent.button == 7) { return; }

            flag = false;
            let that = this;
            if (ifShift) {
                beginId = d3.select(that).attr("id");
                return;
            } else {
                //把该图形z-index设置为最大
                let removed = d3.select(this).remove();
                oMapGraphs.append(function () {
                    return removed.node();
                });

                let x = oEvent.pageX - getOffset(oSvg).left;
                let y = oEvent.pageY - getOffset(oSvg).top;
                let obj = pullBack(x, y, oSide);
                d3.select(this)
                    .attr("transform", `translate(${obj.x - GRID_WIDTH},${obj.y - GRID_HEIGHT / 2})`);

                //拖动线条
                let aBeginId = d3.select(that).property("line").beginId;
                let aEndId = d3.select(that).property("line").endId;
                if (isYes) {
                    aBeginId.forEach(item => {
                        let startX = obj.x;
                        let startY = obj.y;
                        //我需要通过beginId找到线段另一端的图形
                        let beginGraphId = d3.select(`g[id="${item}"]`).attr("beginGraph");
                        let endGraphId = d3.select(`g[id="${item}"]`).attr("endGraph");
                        //终点坐标X
                        let endX = parseInt(d3.select(`g[id="${endGraphId}"]`).attr("transform").match(reg)[0]) + GRID_WIDTH;
                        //终点坐标Y
                        let endY = parseInt(d3.select(`g[id="${endGraphId}"]`).attr("transform").match(reg)[1]) + GRID_HEIGHT / 2;
                        
                        let oLines = selectLines(item);

                        drawLineFromBtm(startX, startY, endX, endY,
                            oLines.line1, oLines.line2, oLines.line3, oLines.line4, oLines.line5,
                            oLines.arrow1, oLines.arrow2,
                            item, beginGraphId, endGraphId, svgData);
                    });

                    aEndId.forEach(item => {
                        let endX = obj.x;
                        let endY = obj.y;

                        //我需要通过beginId找到线段另一端的图形
                        let beginGraphId = d3.select(`g[id="${item}"]`).attr("beginGraph");
                        let endGraphId = d3.select(`g[id="${item}"]`).attr("endGraph");
                        //终点坐标X
                        let startX = parseInt(d3.select(`g[id="${beginGraphId}"]`).attr("transform").match(reg)[0]) + GRID_WIDTH;
                        //终点坐标Y
                        let startY = parseInt(d3.select(`g[id="${beginGraphId}"]`).attr("transform").match(reg)[1]) + GRID_HEIGHT / 2;

                        let oLines = selectLines(item);
                        drawLineFromBtm(startX, startY, endX, endY,
                            oLines.line1, oLines.line2, oLines.line3, oLines.line4, oLines.line5,
                            oLines.arrow1, oLines.arrow2,
                            item, beginGraphId, endGraphId, svgData);
                    })
                } else {
                    aBeginId.forEach(item => {
                        let startX = obj.x;
                        let startY = obj.y;
                        //我需要通过beginId找到线段另一端的图形
                        let endGraphId = d3.select(`g[id="${item}"]`).attr("endGraph");
                        let beginGraphId = d3.select(`g[id="${item}"]`).attr("beginGraph");
                        //终点坐标X
                        let endX = parseInt(d3.select(`g[id="${endGraphId}"]`).attr("transform").match(reg)[0]) + GRID_WIDTH;
                        //终点坐标Y
                        let endY = parseInt(d3.select(`g[id="${endGraphId}"]`).attr("transform").match(reg)[1]) + GRID_HEIGHT / 2;

                        let oLines = selectLines(item);
                        drawLineFromSide(startX, startY, endX, endY,
                            oLines.line1, oLines.line2, oLines.line3, oLines.line4, oLines.line5,
                            oLines.arrow1, oLines.arrow2,
                            item, beginGraphId, endGraphId, svgData);
                    });

                    aEndId.forEach(item => {
                        let endX = obj.x;
                        let endY = obj.y;

                        //我需要通过beginId找到线段另一端的图形
                        let endGraphId = d3.select(`g[id="${item}"]`).attr("endGraph");
                        let beginGraphId = d3.select(`g[id="${item}"]`).attr("beginGraph");
                        //终点坐标X
                        let startX = parseInt(d3.select(`g[id="${beginGraphId}"]`).attr("transform").match(reg)[0]) + GRID_WIDTH;
                        //终点坐标Y
                        let startY = parseInt(d3.select(`g[id="${beginGraphId}"]`).attr("transform").match(reg)[1]) + GRID_HEIGHT / 2;

                        let oLines = selectLines(item);
                        drawLineFromSide(startX, startY, endX, endY,
                            oLines.line1, oLines.line2, oLines.line3, oLines.line4, oLines.line5,
                            oLines.arrow1, oLines.arrow2,
                            item, beginGraphId, endGraphId, svgData);
                    })
                }
                document.onmousemove = function (ev) {

                    let oEvent = ev || event;

                    if (oEvent.button == 2 || oEvent.button == 3 || oEvent.button == 4 || oEvent.button == 5 || oEvent.button == 6 || oEvent.button == 7) { return; }

                    let x = oEvent.pageX - getOffset(oSvg).left;
                    let y = oEvent.pageY - getOffset(oSvg).top;
                    let obj = pullBack(x, y, oSide);
                    d3.select(that)
                        .attr("transform", `translate(${obj.x - GRID_WIDTH},${obj.y - GRID_HEIGHT / 2})`);
                    //拖动线条
                    let aBeginId = d3.select(that).property("line").beginId;
                    let aEndId = d3.select(that).property("line").endId;
                    if (isYes) {
                        aBeginId.forEach(item => {
                            let startX = obj.x;
                            let startY = obj.y;
                            //我需要通过beginId找到线段另一端的图形
                            let endGraphId = d3.select(`g[id="${item}"]`).attr("endGraph");
                            let beginGraphId = d3.select(`g[id="${item}"]`).attr("beginGraph");
                            //终点坐标X
                            let endX = parseInt(d3.select(`g[id="${endGraphId}"]`).attr("transform").match(reg)[0]) + GRID_WIDTH;
                            //终点坐标Y
                            let endY = parseInt(d3.select(`g[id="${endGraphId}"]`).attr("transform").match(reg)[1]) + GRID_HEIGHT / 2;

                            let oLines = selectLines(item);

                            drawLineFromBtm(startX, startY, endX, endY,
                                oLines.line1, oLines.line2, oLines.line3, oLines.line4, oLines.line5,
                                oLines.arrow1, oLines.arrow2,
                                item, beginGraphId, endGraphId, svgData);
                        });

                        aEndId.forEach(item => {
                            let endX = obj.x;
                            let endY = obj.y;

                            //我需要通过beginId找到线段另一端的图形
                            let beginGraphId = d3.select(`g[id="${item}"]`).attr("beginGraph");
                            let endGraphId = d3.select(`g[id="${item}"]`).attr("endGraph");
                            //终点坐标X
                            let startX = parseInt(d3.select(`g[id="${beginGraphId}"]`).attr("transform").match(reg)[0]) + GRID_WIDTH;
                            //终点坐标Y
                            let startY = parseInt(d3.select(`g[id="${beginGraphId}"]`).attr("transform").match(reg)[1]) + GRID_HEIGHT / 2;

                            let oLines = selectLines(item);
                            drawLineFromBtm(startX, startY, endX, endY,
                                oLines.line1, oLines.line2, oLines.line3, oLines.line4, oLines.line5,
                                oLines.arrow1, oLines.arrow2,
                                item, beginGraphId, endGraphId, svgData);
                        })
                    } else {
                        aBeginId.forEach(item => {
                            let startX = obj.x;
                            let startY = obj.y;
                            //我需要通过beginId找到线段另一端的图形
                            let endGraphId = d3.select(`g[id="${item}"]`).attr("endGraph");
                            let beginGraphId = d3.select(`g[id="${item}"]`).attr("beginGraph");
                            //终点坐标X
                            let endX = parseInt(d3.select(`g[id="${endGraphId}"]`).attr("transform").match(reg)[0]) + GRID_WIDTH;
                            //终点坐标Y
                            let endY = parseInt(d3.select(`g[id="${endGraphId}"]`).attr("transform").match(reg)[1]) + GRID_HEIGHT / 2;

                            let oLines = selectLines(item);
                            drawLineFromSide(startX, startY, endX, endY,
                                oLines.line1, oLines.line2, oLines.line3, oLines.line4, oLines.line5,
                                oLines.arrow1, oLines.arrow2,
                                item, beginGraphId, endGraphId, svgData);
                        });

                        aEndId.forEach(item => {
                            let endX = obj.x;
                            let endY = obj.y;

                            //我需要通过beginId找到线段另一端的图形
                            let endGraphId = d3.select(`g[id="${item}"]`).attr("endGraph");
                            let beginGraphId = d3.select(`g[id="${item}"]`).attr("beginGraph");
                            //终点坐标X
                            let startX = parseInt(d3.select(`g[id="${beginGraphId}"]`).attr("transform").match(reg)[0]) + GRID_WIDTH;
                            //终点坐标Y
                            let startY = parseInt(d3.select(`g[id="${beginGraphId}"]`).attr("transform").match(reg)[1]) + GRID_HEIGHT / 2;

                            let oLines = selectLines(item);
                            drawLineFromSide(startX, startY, endX, endY,
                                oLines.line1, oLines.line2, oLines.line3, oLines.line4, oLines.line5,
                                oLines.arrow1, oLines.arrow2,
                                item, beginGraphId, endGraphId, svgData);
                        })
                    }

                };
                document.onmouseup = function () {
                    flag = true;
                    document.onmousemove = null;
                    document.onmouseup = null;
                    return false;
                };
            }
        });
        middle.on("mousedown", function (ev) { });
        let removed = middle.remove();
        oMapGraphs.append(function () {
            return removed.node();
        });
        paintList.push(removed);
        let { graphs } = svgData;

        graphs.push(
            {
                "id": removed.attr("id"),
                "name": removed.attr("name"),
                "x": parseInt(removed.attr("transform").match(reg)[0]),
                "y": parseInt(removed.attr("transform").match(reg)[1]),
                "text": removed
                    .select(function () { return this.children; })
                    ._groups[0][0][1].innerHTML,
                "beginlines": [],
                "endlines": []
            }
        )
    }
    middle = null;
    ifSideGraph = '';
    d3.select(this)
        .on("mousemove", null)
        .on("mouseup", null);
}