/**
 * 
 * @param {bolean} ifSideGraph 状态位，是否点到了工具栏
 * @param {obj | ''} middle 中间承接的一个中间件
 * @param {obj} svg 全局svg d3对象
 * @param {number} mouseDownX 鼠标按下的X坐标
 * @param {number} mouseDownY 鼠标按下的Y坐标
 * @param {numebr} GRID_WIDTH 全局格子宽度
 * @param {number} GRID_HEIGHT 全局格子高度
 * @param {string} NEW_BEGIN_RECT_BORDER_COLOR 全局开始矩形颜色
 * @param {string} NEW_END_RECT_BORDER_COLOR 全局结束矩形颜色
 * @param {string} NEW_ROUND_RECT_BORDER_COLOR 全局圆角矩形颜色
 * @param {string} NEW_RHOMBUS_BORDER_COLOR 全局菱形颜色
 * @return {middle} 把中间件返回回去
 */
const newGraph = (
    ifSideGraph, middle, svg, mouseDownX, mouseDownY,
    GRID_WIDTH, GRID_HEIGHT,
    NEW_BEGIN_RECT_BORDER_COLOR, NEW_END_RECT_BORDER_COLOR,
    NEW_ROUND_RECT_BORDER_COLOR, NEW_RHOMBUS_BORDER_COLOR
) => {
    switch (ifSideGraph) {
        case "sideBegin":
            middle = svg
                .append("g")
                .attr("name", "begin")
                .attr("id", getId())
                .property("line", { beginId: [], endId: [] })
                .attr("transform", `translate(${mouseDownX - GRID_WIDTH},${mouseDownY - GRID_HEIGHT / 2})`)
            middle.append("rect")
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
                .text("开 始")
            flag = false;
            return middle;

        case "sideEnd":
            middle = svg
                .append("g")
                .attr("name", "end")
                .attr("id", getId())
                .property("line", { beginId: [], endId: [] })
                .attr("transform", `translate(${mouseDownX - GRID_WIDTH},${mouseDownY - GRID_HEIGHT / 2})`);
            middle.append("rect")
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
                .text("结 束")
            flag = false;
            return middle;

        case "sideRoundRect":
            middle = svg
                .append("g")
                .attr("name", "round")
                .attr("id", getId())
                .property("line", { beginId: [], endId: [] })
                .attr("transform", `translate(${mouseDownX - GRID_WIDTH},${mouseDownY - GRID_HEIGHT / 2})`);
            middle.append("rect")
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
                .text("流 程")
            flag = false;
            return middle;

        case "sideRhombus":
            middle = svg
                .append("g")
                .attr("name", "rhombus")
                .attr("id", getId())
                .property("line", { beginId: [], endId: [] })
                .attr("transform", `translate(${mouseDownX - GRID_WIDTH},${mouseDownY - GRID_HEIGHT / 2})`);
            middle.append("polygon")
                .attr("sideName", "sideRhombus")
                .attr("points", `${0},${GRID_HEIGHT / 2} ${GRID_WIDTH},${0} ${GRID_WIDTH * 2},${GRID_HEIGHT / 2} ${GRID_WIDTH},${GRID_HEIGHT}`)
                .attr("fill", NEW_RHOMBUS_BORDER_COLOR)
                .select(function () { return this.parentNode; })
                .append("text")
                .attr("x", 30)
                .attr('y', 30)
                .style("user-select", "none")
                .style("fill", "#fff")
                .text("判 断")
            flag = false;
            return middle;
        default:
            break;
    }
}