//有些内容d3拿不到，这个是原生dom
const oSvg = document.querySelector("#svg");

//拿到trasform(xxx.xxx,yyy.yyy)中的数字
const reg = /\d+\.?\d+/g;

//画布上所有图形组成的数组（不包括线段）,鼠标抬起时判断是否碰到图形时 遍历要用
const paintList = [];

//从图形的起点拉出来的线的id
let beginId = '';
//从图形的终点拉出来的线的id
let endId = '';

//临时状态位 => T是从下出  F是从两侧出 !important
let isYes = true;
//鼠标事件的状态位 !important
let flag = true;
//是否按下了shift的状态位 !important
let ifShift = false;
//是否选中了左侧工具栏图形的状态位 !important
let ifSideGraph;

//从工具栏拖出来的新图型（可以理解为充当中间传递值的作用）
let middle;