let init = () => {
    //绘制网格，只执行一次
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            aGrids.push(new Grid(GRID_WIDTH * i, GRID_HEIGHT * j, GRID_WIDTH, GRID_HEIGHT, GRID_BORDER_WIDTH, GRID_BODER_COLOR, GRID_BACKGROUND_COLOR, { row: i, line: j }))
        }
    }

    //绘制左侧工具栏，只执行一次
    for (let i = 0; i < 4; i++) {
        let y = GRAPH_FIST_SPACE + i * (GRAPH_ITEM_HEIGHT + GRAPH_ITEM_SPACE);
        switch (i) {
            case 0:
                aUtilLists.push(new BeginGraph(getId(), 1880 + (120 - GRAPH_ITEM_WIDTH) / 2, y + 2000, GRAPH_ITEM_WIDTH, GRAPH_ITEM_HEIGHT));
                break;
            case 1:
                aUtilLists.push(new EndGraph(getId(), 1880 + (120 - GRAPH_ITEM_WIDTH) / 2, y + 2000, GRAPH_ITEM_WIDTH, GRAPH_ITEM_HEIGHT));
                break;
            case 2:
                aUtilLists.push(new RoundRectGraph(getId(), 1880 + (120 - GRAPH_ITEM_WIDTH) / 2, y + 2000, GRAPH_ITEM_WIDTH, GRAPH_ITEM_HEIGHT, ROUND_RECT_BORDER_COLOR, "roundRect", ROUND_RECT_R));
                break;
            case 3:
                aUtilLists.push(new RhombusGraph(getId(), 1880 + (120 - GRAPH_ITEM_WIDTH) / 2, y + 2000, GRAPH_ITEM_WIDTH, GRAPH_ITEM_HEIGHT));
                break;
            default:
                break;
        }

        aUtilLists[i].draw();
    }
}