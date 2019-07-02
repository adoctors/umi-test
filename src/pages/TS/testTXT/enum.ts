// 枚举

enum Direction{
  Up = 1,
  Down,
  Left,
  Right,
}
// 枚举成员具有一个数字值，它可以是常数或是计算得出的值 当满足如下条件时，
// 枚举成员被当作是常数：
console.log(Direction.Up,Direction.Down,Direction.Left,Direction.Right) // 1234

enum FileAccess {
  // constant members
  None,
  Read    = 1 << 1,
  Write   = 1 << 2,
  ReadWrite  = Read | Write,
  // computed member
  G = "123".length
}
console.log(FileAccess.None,FileAccess.Read,FileAccess.Write,FileAccess.ReadWrite,FileAccess.G) // 0 2 4 6 3

// 枚举是在运行时真正存在的一个对象。 
// 其中一个原因是因为这样可以从枚举值到枚举名进行反向映射。
enum Enum {
  A
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"
console.log(a,nameOfA)  // 0 'A'

const enum Directions2 {
  Up,
  Down,
  Left,
  Right
}

let directions = [Directions2.Up, Directions2.Down, Directions2.Left, Directions2.Right]
// 生成代码
// var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];



// ----------------------小结---------------------------
// 枚举是typeScript扩展的一种数据类型, 这种类型可以用来存储有限且不可变的数据
// 枚举类型需要使用新的关键字enum来定义, 语法有点类似与类或接口, 但是作用完全不同
// 枚举类型也算一种对象类型, 定义时首字母最好大写
// 枚举中元素的key必须是字符串, value可以是字符串或数字

enum Gender { man = '男', woman = '女' };
enum Gender2 { man, woman };     // 如果不赋值, 那么会从0开始给他们赋默认值

// 通过key取值
console.log(Gender.man);              // 男
console.log(Gender2.man);            // 0

// 报错, 值不可变
// Gender.man = '公';
// Gender2.man = 10;


//    枚举的特殊特性
// 如果元素的value为数字, 那么可以反向获取key
// 默认的数字值从0开始, 这里我们也自己指定
enum Directions  { 左 = 37, 上 = 38, 右 = 39, 下 = 40 };
console.log(Directions[37]);            // 左
console.log(Directions[38]);            // 上

// 指定value为字符串
enum Directions3  { 左 = 'left', 上 = 'top', 右 = 'right', 下 = 'bottom' };
// console.log(Directions.left);           // 报错, 不能通过字符串反向获取key
// console.log(Directions.top);           // 报错, 不能通过字符串反向获取key


//    作用
// 1、显示变量的赋值范围
// 假如我有一个color变量, 要求这个变量的值只能为'红', '黄',' 蓝', '绿', '紫', 不能为其他
// 像这样的需求我们可以使用枚举来解决
// 先把有限的值定义成枚举类型, 并给每个值取个名字
enum Color {red = '红', yellow = '黄', blue = '蓝', green = '绿', purple = '紫'};
// 然后定义一个变量, 指明这个变量只能存储Color里面的东西
let color: Color = Color.red;
color = Color.yellow;          // 正常
// color = '白';                        // 报错
// color = '黑';                        // 报错
// color = '紫';                        // 报错, 必须用Color给其赋值

// 2、定义固定数据, 拟补const不足

// 我们知道enum定义的数据内容是不可变的, 它的表现与const不同
// 如果使用const变量保存一个对象, 那么就不能给变量赋新值, 但是却可以给变量存储的对象的属性赋新值
// 所以要是有一些固定不变的数据, 比如: 周一到周日, 中国所有省, 四季, 人种等等, 我们都可以使用enum来定义
// 他们的默认值为0, 1, 2, 3
enum Season { '春', '夏', '秋', '冬' };

// console.log(Season.length)  // undefined
// 枚举有个特性, 如果值为数字, 可以反向取值, 利用这个特性我们可以遍历取出所有值
for(let i = 0; i < 2; i++) {
    console.log(Season[i]);
}

enum colors { red, blue, green };   // 默认从0开始
let e:colors = colors.blue;
console.log(e)    // 1
enum colors2 {red=3, blue, green};  // 这样将按顺序，从3递增
let f:string = colors2[4];    
console.log(f)    // blue

enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

// 如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的：

enum Days2 {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days2["Sun"] === 3); // true
console.log(Days2["Wed"] === 3); // true
console.log(Days2[3] === "Sun"); // false
console.log(Days2[3] === "Wed"); // true

// 手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)：
enum Days3 {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};
// 手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1：
enum Days4 {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};

console.log(Days4["Sun"] === 7); // true
console.log(Days4["Mon"] === 1.5); // true
console.log(Days4["Tue"] === 2.5); // true
console.log(Days4["Sat"] === 6.5); // true
