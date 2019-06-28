
interface LabelValue {
  label: string;
  age: number
}

function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

function IprintLabel(labelledObj: LabelValue) {
  console.log(labelledObj.label);
}

function fun(labelledObj:LabelValue): { label:string; area:number}{
  return {
    label:'abc',
    area:4
  }
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

// 可选属性
// 接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。 
// 可选属性在应用“option bags”模式时很常用，即给函数传入的参数对象中只有部分属性赋值了。
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});

// 只读属性
// 一些对象属性只能在对象刚刚创建的时候修改其值。 
// 可以在属性名前用readonly来指定只读属性:
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // error!
// TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，
// 只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!
// 可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。
// 但是你可以用类型断言重写：
a = ro as number[];

// 判断该用readonly还是const的方法是
// 看要把它做为变量使用还是做为一个属性。 
// 做为变量使用的话用const，若做为属性则使用readonly。

// 对象字面量会被特殊对待而且会经过额外属性检查，当将它们赋值给变量或作为参数传递的时候。 
// 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。