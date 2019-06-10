//左侧工具栏类
class Graph {
    constructor(x, y, width = GRID_WIDTH * 2, height = GRID_HEIGHT, bgColor, describe) {
        this.x = x;//x坐标
        this.y = y;//y坐标
        this.width = width;
        this.height = height;
        this.bgColor = bgColor;
        this.describe = describe;
    }
}

//地图格子类
class Grid extends Graph {
    constructor(x, y, width, height, bdWidth, bdColor, bgColor, location = { row: null, line: null }, hasGraph = false, hasOrigin=null) {
        super(x, y, width, height, bgColor);
        this.x = x;//x坐标
        this.y = y;//y坐标
        this.width = width;
        this.height = height;
        this.bdWidth = bdWidth;//边框粗细
        this.bdColor = bdColor;//边框颜色
        this.bgColor = bgColor;//背景颜色
        this.location = location;//这个格子是第几行的第几列 => 从0开始
        this.hasGraph = hasGraph;//这个格子是否拥有图形
        this.hasOrigin = hasOrigin;//是否拥有图形的起点
    }
    draw() {
        drawGrid(this.x, this.y, this.width, this.height, this.bdWidth, this.bdColor, this.bgColor);
    }
}

//『开始』矩形
class BeginGraph extends Graph {
    constructor(id = null, x, y, width = GRID_WIDTH * 2, height = GRID_HEIGHT, bgColor = BEGIN_RECT_BORDER_COLOR, describe = "begin") {
        super(x, y, width, height, bgColor, describe);
        this.id = id;
    }
    draw() {
        drawRect(this.x, this.y, this.width, this.height, this.bgColor);
    }
}

//『结束』矩形
class EndGraph extends Graph {
    constructor(id = null, x, y, width = GRID_WIDTH * 2, height = GRID_HEIGHT, bgColor = END_RECT_BORDER_COLOR, describe = "end") {
        super(x, y, width, height, bgColor, describe);
        this.id = id;
    }
    draw() {
        drawRect(this.x, this.y, this.width, this.height, this.bgColor);
    }
}

//圆角矩形
class RoundRectGraph extends Graph {
    constructor(id = null, x, y, width = GRID_WIDTH * 2, height = GRID_HEIGHT, bgColor = ROUND_RECT_BORDER_COLOR, describe = "roundRect", radian = NEW_ROUND_RECT_R) {
        super(x, y, width, height, bgColor, describe);
        //圆角弧度
        this.radian = radian;
        this.id = id;
    }
    draw() {
        drawRoundRect(this.x, this.y, this.width, this.height, this.radian, this.bgColor);
    }
}

//圆角矩形
class RhombusGraph extends Graph {
    constructor(id = null, x, y, width = GRID_WIDTH * 2, height = GRID_HEIGHT, bgColor = RHOMBUS_BORDER_COLOR, describe = "rhombus") {
        super(x, y, width, height, bgColor, describe);
        this.id = id;
    }
    draw() {
        drawRhombus(this.x, this.y, this.width, this.height, this.bgColor);
    }
}

