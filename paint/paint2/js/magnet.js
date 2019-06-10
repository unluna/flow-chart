/**
 * 该函数是吸铁石效果+重叠检测的功能函数
 * @param {obj} oPaint 需要判断的图形对象
 * @param {obj} backup 该图形在移动之前的图形对象
 * @param {num} _backupX 该图形移动之前的X坐标
 * @param {num} _backupY 该图形移动之前的Y坐标
 * @param {arr} _backupDsCrb 该图形移动之前的所拥有的两个格子的位置
 */


let magnet = (oPaint, backup, _backupX, _backupY, _backupDsCrb) => {
    //吸铁石效果
    for (let i = 0; i < aGrids.length; i++) {
        //性能优化 => 落在了这个格子内之后 再进行操作
        if (oPaint.x >= aGrids[i].x
            && oPaint.x < aGrids[i].x + aGrids[i].width
            && oPaint.y >= aGrids[i].y
            && oPaint.y < aGrids[i].y + aGrids[i].width
        ) {
            //左上角
            if (oPaint.x >= aGrids[i].x
                && oPaint.x < aGrids[i].x + aGrids[i].width / 2
                && oPaint.y >= aGrids[i].y
                && oPaint.y < aGrids[i].y + aGrids[i].height / 2
            ) {
                //如果即将落下的地点已经被占用了
                if (aGrids[i].describe || aGrids[i + 100].describe) {
                    //如果是从工具栏拖进来的
                    if (!backup) {
                        return;
                    } else {
                        //如果是拖拽的图形

                        //1、把坐标还原
                        backup.x = _backupX;
                        backup.y = _backupY;
                        //2、把格子还原   给格子打上记号  =>  该格子已经被占用
                        aGrids[_backupDsCrb[0]].describe = true;
                        aGrids[_backupDsCrb[1]].describe = true;

                        return backup;
                    }
                } else {
                    //给格子打上记号  =>  该格子已经被占用
                    aGrids[i].describe = true;
                    aGrids[i + 100].describe = true;
                    //给图形打上记号
                    oPaint.describe = [i, i + 100];
                    //移动
                    oPaint.x = aGrids[i].x;
                    oPaint.y = aGrids[i].y;
                    return oPaint;
                }
            }
            //右上角
            else if (oPaint.x >= aGrids[i].x + aGrids[i].width / 2
                && oPaint.x < aGrids[i].x + aGrids[i].width
                && oPaint.y >= aGrids[i].y
                && oPaint.y < aGrids[i].y + aGrids[i].height / 2) {
                //如果即将落下的地点已经被占用了
                if (aGrids[i + 100].describe || aGrids[i + 200].describe) {
                    //如果是从工具栏拖进来的
                    if (!backup) {
                        return;
                    } else {
                        //如果是拖拽的图形

                        //1、把坐标还原
                        backup.x = _backupX;
                        backup.y = _backupY;
                        //2、把格子还原   给格子打上记号  =>  该格子已经被占用
                        aGrids[_backupDsCrb[0]].describe = true;
                        aGrids[_backupDsCrb[1]].describe = true;
                        return backup;
                    }
                } else {
                    //给格子打上记号  =>  该格子已经被占用
                    aGrids[i + 100].describe = true;
                    aGrids[i + 200].describe = true;
                    //给图形打上记号
                    oPaint.describe = [i + 100, i + 200];
                    //移动
                    oPaint.x = aGrids[i + 100].x;
                    oPaint.y = aGrids[i + 100].y;

                    return oPaint
                }
            }
            //左下角
            else if (oPaint.x >= aGrids[i].x
                && oPaint.x < aGrids[i].x + aGrids[i].width / 2
                && oPaint.y >= aGrids[i].y + aGrids[i].height / 2
                && oPaint.y < aGrids[i].y + aGrids[i].height) {
                //如果即将落下的地点已经被占用了
                if (aGrids[i + 1].describe || aGrids[i + 101].describe) {
                    //如果是从工具栏拖进来的
                    if (!backup) {
                        return;
                    } else {
                        //如果是拖拽的图形

                        //1、把坐标还原
                        backup.x = _backupX;
                        backup.y = _backupY;
                        //2、把格子还原   给格子打上记号  =>  该格子已经被占用
                        aGrids[_backupDsCrb[0]].describe = true;
                        aGrids[_backupDsCrb[1]].describe = true;

                        return backup;
                    }
                } else {
                    //给格子打上记号  =>  该格子已经被占用
                    aGrids[i + 1].describe = true;
                    aGrids[i + 101].describe = true;
                    //给图形打上记号
                    oPaint.describe = [i + 1, i + 101];
                    //移动
                    oPaint.x = aGrids[i + 1].x;
                    oPaint.y = aGrids[i + 1].y;
                    return oPaint;
                }
            }
            // 右下角
            else {
                //如果即将落下的地点已经被占用了
                if (aGrids[i + 101].describe || aGrids[i + 201].describe) {
                    //如果是从工具栏拖进来的
                    if (!backup) {
                        return;
                    } else {
                        //如果是拖拽的图形

                        //1、把坐标还原
                        backup.x = _backupX;
                        backup.y = _backupY;
                        //2、把格子还原   给格子打上记号  =>  该格子已经被占用
                        aGrids[_backupDsCrb[0]].describe = true;
                        aGrids[_backupDsCrb[1]].describe = true;
                        return backup;
                    }
                } else {
                    //给格子打上记号  =>  该格子已经被占用
                    aGrids[i + 101].describe = true;
                    aGrids[i + 201].describe = true;
                    //给图形打上记号
                    oPaint.describe = [i + 101, i + 201];
                    //移动
                    oPaint.x = aGrids[i + 101].x;
                    oPaint.y = aGrids[i + 101].y;

                    return oPaint
                }
            }
        }
    }

}

