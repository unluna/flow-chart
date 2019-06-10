
let { svgLctn, sideLctn, graphs, lines } = svgData;

const svg = d3.select("#svg")
    .attr("width", 5000)
    .attr("height", 5000)
    .style("left", `${svgLctn.x || -1880}px`)
    .style("top", `${svgLctn.y || -2000}px`);

//所有图形的 大集合
const oMapGraphs = svg.append("g");
//所有线段的 大集合
const oLines = svg.append("g");
//侧边栏的 大集合
const oSide = svg.append("g")
    .attr("transform", `translate(${sideLctn.x || 1880}, ${sideLctn.y || 2000})`);

graphs.forEach(item => {
    let graph;
    let beginId = [];
    let endId = [];
    lines.forEach(line => {
        if (item.id === line.father.beginGraphId) {
            beginId.push(line.father.id)
        }
        if (item.id === line.father.endGraphId) {
            endId.push(line.father.id)
        }
    });

    switch (item.name) {
        case "begin":
            graph = oMapGraphs
                .append("g")
                .attr("name", item.name)
                .attr("id", item.id)
                .property("line", { "beginId": beginId, "endId": endId })
                .attr("transform", `translate(${item.x},${item.y})`);

            graph.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", GRID_WIDTH * 2)
                .attr("height", GRID_WIDTH)
                .attr("fill", NEW_BEGIN_RECT_BORDER_COLOR)

                .select(function () { return this.parentNode; })
                .append("text")
                .attr("x", 30)
                .attr('y', 30)
                .style("user-select", "none")
                .style("fill", "#fff")
                .text(item.text)

                .select(function () { return this.parentNode; })
                .on("mousedown", hdOldGraph);
            paintList.push(graph);
            break;
        case "end":
            graph = oMapGraphs
                .append("g")
                .attr("name", item.name)
                .attr("id", item.id)
                .property("line", { "beginId": beginId, "endId": endId })
                .attr("transform", `translate(${item.x},${item.y})`);
            graph.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", GRID_WIDTH * 2)
                .attr("height", GRID_WIDTH)
                .attr("fill", NEW_END_RECT_BORDER_COLOR)
                .select(function () { return this.parentNode; })

                .append("text")
                .attr("x", 30)
                .attr('y', 30)
                .style("user-select", "none")
                .style("fill", "#fff")
                .text(item.text)

                .select(function () { return this.parentNode; })
                .on("mousedown", hdOldGraph);
            paintList.push(graph);
            break;
        case "round":
            graph = oMapGraphs
                .append("g")
                .attr("name", item.name)
                .attr("id", item.id)
                .property("line", { "beginId": beginId, "endId": endId })
                .attr("transform", `translate(${item.x},${item.y})`);
            graph.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", GRID_WIDTH * 2)
                .attr("height", GRID_WIDTH)
                .attr("rx", NEW_ROUND_RECT_R)
                .attr("ry", NEW_ROUND_RECT_R)
                .attr("fill", NEW_ROUND_RECT_BORDER_COLOR)
                .select(function () { return this.parentNode; })
                .append("text")
                .attr("x", 30)
                .attr('y', 30)
                .style("user-select", "none")
                .style("fill", "#fff")
                .text(item.text)

                .select(function () { return this.parentNode; })
                .on("mousedown", hdOldGraph);
            paintList.push(graph);
            break;
        case "rhombus":
            graph = oMapGraphs
                .append("g")
                .attr("name", item.name)
                .attr("id", item.id)
                .property("line", { "beginId": beginId, "endId": endId })
                .attr("transform", `translate(${item.x},${item.y})`);
            graph.append("polygon")
                .attr("sideName", "sideRhombus")
                .attr("points", `${0},${GRID_HEIGHT / 2} ${GRID_WIDTH},${0} ${GRID_WIDTH * 2},${GRID_HEIGHT / 2} ${GRID_WIDTH},${GRID_HEIGHT}`)
                .attr("fill", NEW_RHOMBUS_BORDER_COLOR)
                .select(function () { return this.parentNode; })
                .append("text")
                .attr("x", 30)
                .attr('y', 30)
                .style("user-select", "none")
                .style("fill", "#fff")
                .text(item.text)

                .select(function () { return this.parentNode; })
                .on("mousedown", hdOldGraph);
            paintList.push(graph);
            break;
        default:
            break;
    }
})

lines.forEach(item => {

    let father = oLines.append("g")
        .attr("id", item.father.id)
        .attr("beginGraph", item.father.beginGraphId)
        .attr("endGraph", item.father.endGraphId);
    //1
    father.append("line")
        .attr("x1", item.line1.x1)
        .attr("y1", item.line1.y1)
        .attr("x2", item.line1.x2)
        .attr("y2", item.line1.y2)
        .attr("stroke", LINE_COLOR)
        .attr("stroke-width", `${LINE_WIDTH}px`)
        .attr("id", "line1")
        .on("dblclick", function () {
            console.log(this.parentNode.id)
        });
    //2
    father.append("line")
        .attr("x1", item.line2.x1)
        .attr("y1", item.line2.y1)
        .attr("x2", item.line2.x2)
        .attr("y2", item.line2.y2)
        .attr("stroke", LINE_COLOR)
        .attr("stroke-width", `${LINE_WIDTH}px`)
        .attr("id", "line2")
        .on("dblclick", function () {
            console.log(this.parentNode.id)
        });
    //3
    father.append("line")
        .attr("x1", item.line3.x1)
        .attr("y1", item.line3.y1)
        .attr("x2", item.line3.x2)
        .attr("y2", item.line3.y2)
        .attr("stroke", LINE_COLOR)
        .attr("stroke-width", `${LINE_WIDTH}px`)
        .attr("id", "line3")
        .on("dblclick", function () {
            console.log(this.parentNode.id)
        });
    //4
    father.append("line")
        .attr("x1", item.line4.x1)
        .attr("y1", item.line4.y1)
        .attr("x2", item.line4.x2)
        .attr("y2", item.line4.y2)
        .attr("stroke", LINE_COLOR)
        .attr("stroke-width", `${LINE_WIDTH}px`)
        .attr("id", "line4")
        .on("dblclick", function () {
            console.log(this.parentNode.id)
        });
    //5
    father.append("line")
        .attr("x1", item.line5.x1)
        .attr("y1", item.line5.y1)
        .attr("x2", item.line5.x2)
        .attr("y2", item.line5.y2)
        .attr("stroke", LINE_COLOR)
        .attr("stroke-width", `${LINE_WIDTH}px`)
        .attr("id", "line5")
        .on("dblclick", function () {
            console.log(this.parentNode.id)
        });
    //箭头1
    father.append("line")
        .attr("x1", item.arrow1.x1)
        .attr("y1", item.arrow1.y1)
        .attr("x2", item.arrow1.x2)
        .attr("y2", item.arrow1.y2)
        .attr("stroke", LINE_COLOR)
        .attr("stroke-width", `${LINE_WIDTH}px`)
        .attr("id", "arrow1")
        .on("dblclick", function () {
            console.log(this.parentNode.id)
        });
    //箭头2
    father.append("line")
        .attr("x1", item.arrow2.x1)
        .attr("y1", item.arrow2.y1)
        .attr("x2", item.arrow2.x2)
        .attr("y2", item.arrow2.y2)
        .attr("stroke", LINE_COLOR)
        .attr("stroke-width", `${LINE_WIDTH}px`)
        .attr("id", "arrow2")
        .on("dblclick", function () {
            console.log(this.parentNode.id)
        });
})