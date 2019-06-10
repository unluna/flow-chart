
const lineData = [
    {
        "x1": 0,
        "y1": 0 + GRAPH_BORDER_WIDTH / 2,
        "x2": 120,
        "y2": 0 + GRAPH_BORDER_WIDTH / 2
    },
    {
        "x1": 120 - GRAPH_BORDER_WIDTH / 2,
        "y1": 0,
        "x2": 120 - GRAPH_BORDER_WIDTH / 2,
        "y2": 1000
    },
    {
        "x1": 0,
        "y1": 1000 - GRAPH_BORDER_WIDTH / 2,
        "x2": 120,
        "y2": 1000 - GRAPH_BORDER_WIDTH / 2
    },
    {
        "x1": 0 + GRAPH_BORDER_WIDTH / 2,
        "y1": 0,
        "x2": 0 + GRAPH_BORDER_WIDTH / 2,
        "y2": 1000
    }
]

//侧边栏边框
oSide.append("rect")
    .attr("sideName", "sideBeginRect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 120)
    .attr("height", 1000)
    .attr("fill", "#fff")
oSide.selectAll("line")
    .data(lineData)
    .enter()
    .append("line")
    .attr("x1", function (d) {
        return d.x1
    })
    .attr("y1", function (d) {
        return d.y1
    })
    .attr("x2", function (d) {
        return d.x2
    })
    .attr("y2", function (d) {
        return d.y2
    })
    .attr("stroke", GRAPH_BORDER_COLOR)
    .attr("stroke-width", `${GRAPH_BORDER_WIDTH}px`)

//侧边栏开始矩形
const oSideBegin = oSide
    .append("g")
    .attr("transform", "translate(" + (120 - GRAPH_ITEM_WIDTH) / 2 + "," + GRAPH_FIST_SPACE + ")")
    .on("mousedown", function () {
        ifSideGraph = "sideBegin";
    });
oSideBegin.append("rect")
    .attr("sideName", "sideBeginRect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", GRAPH_ITEM_WIDTH)
    .attr("height", GRAPH_ITEM_HEIGHT)
    .attr("fill", BEGIN_RECT_BORDER_COLOR)
    .select(function () { return this.parentNode; })
    .append("text")
    .attr("x", 20)
    .attr('y', 25)
    .style("user-select", "none")
    .style("fill", "#fff")
    .text("开 始")

//侧边栏结束矩形
const oSideEnd = oSide
    .append("g")
    .attr("transform", `translate(${(120 - GRAPH_ITEM_WIDTH) / 2}, ${GRAPH_FIST_SPACE + GRAPH_ITEM_HEIGHT + GRAPH_ITEM_SPACE})`)
    .on("mousedown", function () {
        ifSideGraph = "sideEnd";
    });
oSideEnd
    .append("rect")
    .attr("sideName", "sideEndRect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", GRAPH_ITEM_WIDTH)
    .attr("height", GRAPH_ITEM_HEIGHT)
    .attr("fill", END_RECT_BORDER_COLOR)
    .select(function () { return this.parentNode; })
    .append("text")
    .attr("x", 20)
    .attr('y', 25)
    .style("user-select", "none")
    .style("fill", "#fff")
    .text("结 束")

//侧边栏圆角矩形
const oSideRoundRect = oSide
    .append("g")
    .attr("transform", `translate(${(120 - GRAPH_ITEM_WIDTH) / 2}, ${GRAPH_FIST_SPACE + 2 * (GRAPH_ITEM_HEIGHT + GRAPH_ITEM_SPACE)})`)
    .on("mousedown", function () {
        ifSideGraph = "sideRoundRect";
    });
oSideRoundRect
    .append("rect")
    .attr("sideName", "sideRoundRect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("rx", ROUND_RECT_R)
    .attr("ry", ROUND_RECT_R)
    .attr("width", GRAPH_ITEM_WIDTH)
    .attr("height", GRAPH_ITEM_HEIGHT)
    .attr("fill", ROUND_RECT_BORDER_COLOR)
    .select(function () { return this.parentNode; })
    .append("text")
    .attr("x", 20)
    .attr('y', 25)
    .style("user-select", "none")
    .style("fill", "#fff")
    .text("流 程")

//侧边栏菱形
const oSideRhombus = oSide
    .append("g")
    .attr("transform", `translate(${(120 - GRAPH_ITEM_WIDTH) / 2}, ${GRAPH_FIST_SPACE + 3 * (GRAPH_ITEM_HEIGHT + GRAPH_ITEM_SPACE)})`)
    .on("mousedown", function () {
        ifSideGraph = "sideRhombus";
    });
oSideRhombus
    .append("polygon")
    .attr("sideName", "sideRhombus")
    .attr("points", `${0},${GRAPH_ITEM_HEIGHT / 2} ${GRAPH_ITEM_WIDTH / 2},${0} ${GRAPH_ITEM_WIDTH},${GRAPH_ITEM_HEIGHT / 2} ${GRAPH_ITEM_WIDTH / 2},${GRAPH_ITEM_HEIGHT}`)
    .attr("fill", RHOMBUS_BORDER_COLOR)
    .select(function () { return this.parentNode; })
    .append("text")
    .attr("x", 20)
    .attr('y', 25)
    .style("user-select", "none")
    .style("fill", "#fff")
    .text("判 断")
