let hdOldGraph = function (ev) {
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
        //同步图形位置的数据
        let graphId = d3.select(this).attr("id")
        let { graphs } = svgData;

        graphs.forEach(item => {
            if (item.id === graphId) {
                item.x = obj.x - GRID_WIDTH;
                item.y = obj.y - GRID_HEIGHT / 2;
            }
        })
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
        document.onmousemove = function (ev) {

            let oEvent = ev || event;

            if (oEvent.button == 2 || oEvent.button == 3 || oEvent.button == 4 || oEvent.button == 5 || oEvent.button == 6 || oEvent.button == 7) { return; }

            let x = oEvent.pageX - getOffset(oSvg).left;
            let y = oEvent.pageY - getOffset(oSvg).top;
            let obj = pullBack(x, y, oSide);
            d3.select(that)
                .attr("transform", `translate(${obj.x - GRID_WIDTH},${obj.y - GRID_HEIGHT / 2})`);
            //同步图形位置的数据
            graphs.forEach(item => {
                if (item.id === graphId) {
                    item.x = obj.x - GRID_WIDTH;
                    item.y = obj.y - GRID_HEIGHT / 2;
                }
            })
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
}