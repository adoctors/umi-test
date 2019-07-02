import React from 'react';

// export default (): React.ReactNode => (
//   <p style={{ textAlign: 'center' }}>
//     123
//   </p>
// );

// 布尔类型 -----------------------------------------
let isDone: boolean = false;

// 数字 -----------------------------------------
let age: number = 18;

// 字符串 -----------------------------------------
let name: string = 'adcotors';

// 数组 -----------------------------------------
// 第一种，可以在元素类型后面接上[]，表示由此类型元素组成的一个数组：
let list: number[] = [1,2,3];
let arr: string[] = ['1','2','3'];
// 第二种方式是使用数组泛型，Array<元素类型>：
let arr2: Array<number> = [1,2,3];
// 组合类型数组
let arr3:(number|string)[] = [1,2,'abc'];
// 任意类型数组
let anyArr: any[] = [1,2,'abc',true];

// 元组 -----------------------------------------
// 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
// 比如，可以定义一对值分别为string和number类型的元组。
let x: [string,number];
x=['hello',12]
// x=['hello','12']    // Errr
// 当访问一个越界的元素，会使用联合类型替代：
// console.log(x[1],x[0]);
// x[2] = 'world';

// 枚举 -----------------------------------------
// enum类型是对JavaScript标准数据类型的一个补充。
// 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

// 任意值 -----------------------------------------
// 在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容
// 不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。
// 那么我们可以使用any类型来标记这些变量：
let y: any = 4;
y = 'yname';
y = false;

// 当只知道一部分数据的类型时，any类型也是有用的。 
// 比如，你有一个数组，它包含了不同的类型的数据：

let lists: any[] = [1,true,'foo'];
// list[1] = 'abc';

// 空值 -----------------------------------------
// void类型像是与any类型相反，它表示没有任何类型。
// 当一个函数没有返回值时，你通常会见到其返回值类型是void：
function warnUser(): void {
  alert("This is my warning message");
}

// 声明一个void类型的变量没有什么大用，
// 因为你只能为它赋予undefined和null：
let unusable: void = undefined;

// Null 和 Undefined  -----------------------------------------
// TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 
// 和void相似，它们的本身的类型用处不是很大：
let u: undefined = undefined;
let n: null = null;
// 默认情况下null和undefined是所有类型的子类型。
// 就是说你可以把null和undefined赋值给number类型的变量。

// Never -----------------------------------------
// never类型表示的是那些永不存在的值的类型。
// 例如，never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 
// 变量也可能是never类型，当它们被永不为真的类型保护所约束时。

// never类型是任何类型的子类型，也可以赋值给任何类型；
// 然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 
// 即使any也不可以赋值给never

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}

// 类型断言 -----------------------------------------
// 有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 
// 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

// 通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 
// 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 
// 它没有运行时的影响，只是在编译阶段起作用。 
// TypeScript会假设你，程序员，已经进行了必须的检查。

// 类型断言有两种形式。 其一是“尖括号”语法：

let someValue: any = 'this is a string';
// let strLen: number = (<string>someValue).length;

// 另一个为as语法：
let strLene : number = (someValue as string).length;
// 两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；
// 然而，当你在TypeScript里使用JSX时，只有as语法断言是被允许的。


// --------------------------------------
// 解构
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2

// 作用于函数参数：
function f([first, second]: [number, number]) {
  console.log(first);
  console.log(second);
}
let [first2, ...rest] = [1, 2, 3, 4];
console.log(first2); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]

// 属性重命名
let o = {
  a: "foo",
  b: 12,
  c: "bar"
};
let { a: newName1, b: newName2 } = o;
console.log(newName1,newName2)  //o.a("foo")     o.b(12)

// 就像数组解构，你可以用没有声明的赋值：
// ({ v, e } = { v: "baz", e: 101 });


// 默认值
function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001 } = wholeObject;
}

// 函数声明
// 解构也能用于函数声明。 看以下简单的情况：
type C = { a: string, b?: number }
function f3({ a, b }: C): void {
    // ...
}
// 但是，通常情况下更多的是指定默认值，解构默认值有些棘手。
// 首先，你需要在默认值之前设置其格式。
function f2({ a, b } = { a: "", b: 0 }): void {
  // ...
}