//左侧工具栏类
class Graph {
    constructor(x, y, width = GRID_WIDTH * 2, height = GRID_HEIGHT, bgColor, describe = '') {
        this.x = x;//x坐标
        this.y = y;//y坐标
        this.width = width;
        this.height = height;
        this.bgColor = bgColor;
        this.describe = describe;
    }
}

//侧边栏类
class Side {
    constructor(x = 1880, y = 2000, width = 120, height = canvas.height, bdWidth = GRAPH_BORDER_WIDTH, bdColor = GRAPH_BORDER_COLOR, bgColor = GRAPH_BACKGROUND_COLOR) {
        this.x = x;//x坐标
        this.y = y;//y坐标
        this.width = width;
        this.height = height;
        this.bdWidth = bdWidth;
        this.bdColor = bdColor;
        this.bgColor = bgColor;
    }
    drawSide() {
        //外框
        drawRect(this.x, this.y, this.width, canvas.height, this.bdColor);
        //内框
        drawRect(this.x + this.bdWidth, this.y + this.bdWidth, this.width - this.bdWidth * 2, canvas.height - this.bdWidth * 2, this.bgColor);
    }
}

//地图格子类
class Grid extends Graph {
    constructor(x, y, width, height, bdWidth, bdColor, bgColor, location = { row: null, line: null }, describe = '') {
        super(x, y, width, height, bgColor, describe);
        this.x = x;//x坐标
        this.y = y;//y坐标
        this.width = width;
        this.height = height;
        this.bdWidth = bdWidth;//边框粗细
        this.bdColor = bdColor;//边框颜色
        this.bgColor = bgColor;//背景颜色
        this.location = location;//这个格子是第几行的第几列 => 从0开始
        this.describe = describe;
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
        this.lineT = [this.x + this.width / 2, this.y];
        this.lineR = [this.x + this.width, this.y + this.height / 2];
        this.lineB = [this.x + this.width / 2, this.y + this.height];
        this.lineL = [this.x, this.y + this.height / 2];
        this.hasBeginLine = [];
        this.hasEndLine = [];
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
        this.lineT = [this.x + this.width / 2, this.y];
        this.lineR = [this.x + this.width, this.y + this.height / 2];
        this.lineB = [this.x + this.width / 2, this.y + this.height];
        this.lineL = [this.x, this.y + this.height / 2];
        this.hasBeginLine = [];
        this.hasEndLine = [];
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
        this.lineT = [this.x + this.width / 2, this.y];
        this.lineR = [this.x + this.width, this.y + this.height / 2];
        this.lineB = [this.x + this.width / 2, this.y + this.height];
        this.lineL = [this.x, this.y + this.height / 2];
        this.hasBeginLine = [];
        this.hasEndLine = [];
    }
    draw() {
        drawRoundRect(this.x, this.y, this.width, this.height, this.radian, this.bgColor);
    }
}

//菱形
class RhombusGraph extends Graph {
    constructor(id = null, x, y, width = GRID_WIDTH * 2, height = GRID_HEIGHT, bgColor = RHOMBUS_BORDER_COLOR, describe = "rhombus") {
        super(x, y, width, height, bgColor, describe);
        this.id = id;
        this.lineT = [this.x + this.width / 2, this.y];
        this.lineR = [this.x + this.width, this.y + this.height / 2];
        this.lineB = [this.x + this.width / 2, this.y + this.height];
        this.lineL = [this.x, this.y + this.height / 2];
        this.hasBeginLine = [];
        this.hasEndLine = [];
    }
    draw() {
        drawRhombus(this.x, this.y, this.width, this.height, this.bgColor);
    }
}
//线段
class Line {
    constructor(startX, startY, endX, endY, lineWidth = 2, lineColor = 'red') {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.lineWidth = lineWidth;
        this.lineColor = lineColor;
    }
    draw() {
        drawLine(this.startX, this.startY, this.endX, this.endY, this.lineWidth, this.lineColor);
    }
}
//折线段
class BrokenLine extends Line {
    constructor(id, startX, startY, endX, endY, lineWidth = 2, lineColor = 'red', beginId, endId, ) {
        super(startX, startY, endX, endY, lineWidth, lineColor);
        this.id = id;
        this.beginId = beginId;
        this.endId = endId;
    }
    draw() {
        drawBrokenLine(this.startX, this.startY, this.endX, this.endY, this.lineWidth, this.lineColor);
    }
}