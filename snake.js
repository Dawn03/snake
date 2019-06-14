
/**
 * 进一步功能要求
 * 
 * 1. 需要在游戏界面的左边添加游戏说明，和玩法介绍
 * 
 * 2. 统计游戏分值
 * 当分值大于 xx 的时候 改变游戏难度。
 * 
 * 3. 设置游戏等级（1级最简单，2级难度大于一级，依次类推）
 * 根据统计的分值进行升级规划，升级分值多少自行决定， 每次游戏升级后，更新需要修改的左侧的游戏介绍内容。
 
 * 4. 当游戏等级 大于等于 2 的时候不允许蛇穿墙。
 * 蛇一旦穿墙，蛇当即死亡，游戏结束。
 * 
 * 5. 地图内添加障碍物， 根据难度的等级添加相应的障碍物。（注意新增食物的处理）
 * 触碰到障碍物，蛇死亡，游戏结束。
 * 
 * 6. 允许自由选择游戏难度，确定难度选择后，游戏从对应的难度等级开始。
 * 
 * 提示：游戏分为3个基本难度
 *  难度为 1: 允许穿墙；
 *  难度为 2：不允许穿墙；
 *  难度为 3：添加障碍物；
 *  难度为 4：添加多个障碍物 ......；
 *  
 * 
 *  在完成此基础内容的情况下可以自由进行扩展升级，增加游戏可玩性，具体内容自己设计。 
 **/
let gameTimer;
let snakeS = new Snake();
let food = new Food();
//开始游戏
function beginGame() {
    clearInterval(gameTimer);
    gameTimer = setInterval(function () {
        snakeS.move();
        draw();
    }, 200);
}
// 渲染到页面
function draw() {
    // 画布大小 720 x 480， 每个元素半径12
    // X = 0 ~ 29 , Y = 0 ~ 19
    var canvas = document.getElementById('canvas1'); //获取canvas画布
    var ctxt = canvas.getContext('2d'); //以后就用ctxt来在canvas画布上绘画
    ctxt.clearRect(0, 0, canvas.width, canvas.height);
    ctxt.beginPath();
    ctxt.rect(0, 0, canvas.width, canvas.height);
    ctxt.fillStyle = 'black';
    ctxt.closePath();
    ctxt.fill();
    //蛇
    for (let i = 0; i < snakeS.body.length; i++) {
        ctxt.beginPath();
        // arc(X, Y, Radius, StartAngle, endAngle, anticlockwise)
        ctxt.arc(snakeS.body[i].x * 24 + 12, snakeS.body[i].y * 24 + 12, 12, 0, Math.PI * 2, true);
        ctxt.fillStyle = "red";
        ctxt.closePath();
        ctxt.fill();
    }
    //食物
    for (let i = 0; i < food.dot.length; i++) {
        ctxt.beginPath();
        ctxt.arc(food.dot[i].x * 24 + 12, food.dot[i].y * 24 + 12, 12, 0, Math.PI * 2, true);
        ctxt.fillStyle = "greenyellow";
        ctxt.closePath();
        ctxt.fill();
    }
}
//每个点的坐标
function Pos(x, y) {
    this.x = x;
    this.y = y;
}

function Snake() {
    this.head = new Pos(19, 15);
    this.body = [
        new Pos(14, 15), new Pos(15, 15), new Pos(16, 15), new Pos(17, 15), new Pos(18, 15), new Pos(19, 15),
        new Pos(20, 15), new Pos(21, 15), new Pos(22, 15), new Pos(23, 15), new Pos(24, 15), new Pos(25, 15)
    ];
    this.dir = 'left';
}
//移动方向对应坐标变化 left right up down
Snake.prototype.move = function () {
    // 改变移动方向
    if (this.dir == 'up') {
        this.head = new Pos(this.body[0].x, this.body[0].y - 1);
    }
    else if (this.dir == 'down') {
        this.head = new Pos(this.body[0].x, this.body[0].y + 1);
    }
    else if (this.dir == 'left') {
        this.head = new Pos(this.body[0].x - 1, this.body[0].y);
    }
    else if (this.dir == 'right') {
        this.head = new Pos(this.body[0].x + 1, this.body[0].y);
    }
    // 允许穿墙
    if (this.head.x < 0) {
        this.head.x = 29;
    }
    if (this.head.x > 29) {
        this.head.x = 0;
    }
    if (this.head.y < 0) {
        this.head.y = 19;
    }
    if (this.head.y > 19) {
        this.head.y = 0;
    }
    this.snakeDied(this.head);
    food.hadEeated();
    for (let i = this.body.length - 1; i >= 0; i--) {
        if (i == 0) {
            this.body[i].x = this.head.x;
            this.body[i].y = this.head.y;
        } else {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
    }
}
// 蛇 死亡
Snake.prototype.snakeDied = function (head) {
    for (let i = 0, len = this.body.length; i < len; i++) {
        // console.log(101, head.x, head.y, body[i].x, body[i].y)
        if (head.x == this.body[i].x && head.y == this.body[i].y) {
            alert('游戏结束');
            clearInterval(gameTimer);
            return
        }
    }
}
// 食物
function Food() {
    this.dot = [new Pos(5, 15), new Pos(1, 1), new Pos(12, 8), new Pos(8, 10)];
}
// 当食物被蛇吃掉后
Food.prototype.hadEeated = function () {
    for (let i = 0, len = this.dot.length; i < len; i++) {
        if (this.dot[i].x == snakeS.head.x && this.dot[i].y == snakeS.head.y) {
            snakeS.body.push(new Pos(this.dot[i].x, this.dot[i].y));
            this.dot.splice(i, 1);
            this.addFood();
            return
        }
    }
}

// 创建一个食物
Food.prototype.creatNew = function () {
    let newDotX = Math.floor(Math.random() * 30);
    let newDotY = Math.floor(Math.random() * 20);
    return new Pos(newDotX, newDotY)

}
// 新增食物到数据 (需要处理食物出现的位置是否和蛇所在位置重叠, 以及和已经存在的食物是否重叠)
Food.prototype.addFood = function () {
    let food = this.creatNew();
    let flag = false
    do {
        for (let i = 0, len = snakeS.body.length; i < len; i++) {
            if (snakeS.body[i].x == food.x && snakeS.body[i].y == food.y) {
                flag = true;
                break;
            }
        }
        for (let i = 0, len = this.dot.length; i < len; i++) {
            if (this.dot[i].x == food.x && this.dot[i].y == food.y) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            this.dot.push(food);
        }
    } while (!flag)
}
// 键盘操作
function keyDownCheck(e) {
    //38 40 37 39 分别对应上下左右
    // console.log(e.keyCode)
    //需要注意禁止原地掉头
    switch (e.keyCode) {
        case 38:
            if (snakeS.dir == 'down') {
                return;
            }
            snakeS.dir = 'up';
            break;
        case 40:
            if (snakeS.dir == 'up') {
                return;
            }
            snakeS.dir = 'down';
            break;
        case 37:
            if (snakeS.dir == 'right') {
                return;
            }
            snakeS.dir = 'left';
            break;
        case 39:
            if (snakeS.dir == 'left') {
                return;
            }
            snakeS.dir = 'right';
            break;
    }

}