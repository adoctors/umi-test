
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

// 函数类型 ----------------------------------------------------------------
// 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 
// 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。
interface SearchFnuc {
  (source: string, subSting: string): boolean;
}

// 这样定义后，我们可以像使用其它接口一样使用这个函数类型的接口。 
// 下例展示了如何创建一个函数类型的变量，并将一个同类型的函数赋值给这个变量。
let mySearch: SearchFnuc;
mySearch = function(source: string, subSting: string){
  let result = source.search(subSting);
  return result > -1;
}

// 或
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}

// 可索引的类型
// 与使用接口描述函数类型差不多，我们也可以描述那些能够“通过索引得到”的类型，
// 比如a[10]或ageMap["daniel"]。
interface StringArray {
  [index: number]: string;
}
let myArr : StringArray;
myArr = ['a','b'];
let myStr: string = myArr[0];

interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
// NumberArray 表示：只要 index 的类型是 number，那么值的类型必须是 number。

// 类类型
interface ClockInterface {
  currentTime: Date;
}

class Clock implements ClockInterface {
  currentTime: Date;
}

// 继承接口
// 和类一样，接口也可以相互继承。 
// 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;

// 一个接口可以继承多个接口，创建出多个接口的合成接口
interface PenStroke {
  penWidth: number;
}

interface Square2 extends Shape, PenStroke {
  sideLength: number;
}
let square2 = <Square2>{};
square2.color = "blue";
square2.sideLength = 10;
square2.penWidth = 5.0;

// 混合类型
// 有时会希望一个对象可以同时具有上面提到的多种类型。
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;


interface Test {
  name: string;
  age?: number;
  [propName: string]: string;
  // [propName: string]: string|number;
}

// 上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。

// 使用 [propName: string] 定义了任意属性取 string 类型的值。
// 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：





// 接口的合并

// 接口中的属性在合并时会简单的合并到一个接口中：
interface Alarm {
  price: number;
}
interface Alarm {
  weight: number;
}
// 相当于
interface Alarm {
  price: number;
  weight: number;
}

// 合并的属性的类型必须是唯一的：
interface Alarm2 {
  price: number;
  alert(s: string): string;
}
interface Alarm2 {
  weight: number;
  alert(s: string, n: number): string;
}
// 相当于
interface Alarm {
  price: number;
  weight: number;
  alert(s: string): string;
  alert(s: string, n: number): string;
}


// interface 和 type interface 和 type 都可以用来定义一些复杂的类型结构，最很多情况下是通用的，
// 最初我一直没能理解它们二者之间区别在哪里，后来发现，二者的区别在于：


// interface创建了一种新的类型，而 type 仅仅是别名，是一种引用；
// 如果 type 使用了 union operator （|） 操作符，则不能将 type implements 到 class 上；
// 如果 type 使用了 union（|） 操作符 ，则不能被用以 extends interface
// type 不能像 interface 那样合并，其在作用域内唯一； 

// interfaces 和 types 在 Typescript 中是不同的，
// 不过就目前在 React 中使用到的方面来看，他们的作用用法和作用非常相似，这里提供一份何时使用它们的经验法则：

// 当允许库或第三方开发者定义类型时，要给这些公共的 API 定义使用 interface。
// 考虑为 React 组件的 Props 和 State 使用 type ，因为它有更多的限制。

// 表单事件
// onChange = (e: React.FormEvent<HTMLInputElement>): void => {
//   this.setState({text: e.currentTarget.value})
// }


// 高阶组件 / render props --------------------------
// 有时你想写一个接受 React 元素或者字符串或者其他的类型的 prop，
// 这种情况下最好的 Type 方式是使用 React.ReactNode，React Node 可以匹配任何合适的类型：
// import * as React from 'react';
// export interface Props {
//   label?: React.ReactNode;
//   children: React.ReactNode;
// }
// export const Card = (props: Props) => {
//   return (
//     <div>
//       {props.label && <div>{props.label}</div>}
//       {props.children}
//     </div>
//   );
// };

// 如果你使用函数作为渲染的 prop

// export interface Props {
//   children: (foo: string) => React.ReactNode;
// }