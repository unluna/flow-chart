function flashMap() {

    //先清空画布
    context.clearRect(0, 0, canvas.width, canvas.height);
    //画格子
    aGrids.forEach(item => item.draw());

    //绘制拖动到滑板上的图形
    aMapGraphLists.forEach(item => item.draw());

    //画背景
    oSide.drawSide();
    //绘制折线
    aBrokenLines.forEach(item => item.draw());
    // 绘制线段
    aLine.forEach(item => item.draw());
    //绘制左侧工具栏 
    aUtilLists.forEach(item => item.draw());
    //绘制栈顶
    aMiddlewar.forEach(item => item.draw());
    //不停的去刷新画布
    let start = window.requestAnimationFrame(flashMap);
    if (!timer) {
        cancelAnimationFrame(start);
    }
}
