// 泛型
// 可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 
// 这样用户就可以以自己的数据类型来使用组件。

function identity<T>(arg: T): T {
  return arg;
}
// 定义了泛型函数后，可以用两种方法使用。 第一种是，传入所有的参数，包含类型参数：
let output = identity<string>("myString");  // type of output will be 'string'
// 这里我们明确的指定了T是string类型，并做为一个参数传给函数，使用了<>括起来而不是()。

// 第二种方法更普遍。利用了类型推论 – 即编译器会根据传入的参数自动地帮助我们确定T的类型：
let output2 = identity("myString");  // type of output will be 'string'
// 注意我们没必要使用尖括号（<>）来明确地传入类型

// 泛型类型
// 泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样：
function identity2<T>(arg: T): T {
  return arg;
}

let myIdentity: <T>(arg: T) => T = identity2;

// 泛型类
// 泛型类看上去与泛型接口差不多。 泛型类使用（<>）括起泛型类型，跟在类名后面。
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

// 泛型参数的默认类型
// 在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。
// 当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

function createArray0<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}


// 泛型约束

// 相比于操作any所有类型，我们想要限制函数去处理任意带有.length属性的所有类型。 
// 只要传入的类型有这个属性，我们就允许，就是说至少包含这一属性。 
// 为此，我们需要列出对于T的约束要求

// 定义一个接口来描述约束条件。 
// 创建一个包含.length属性的接口，使用这个接口和extends关键字还实现约束：

interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}

// 现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：

// 在泛型约束中使用类型参数

// 可以声明一个类型参数，且它被另一个类型参数所约束。 
// 比如，现在我们想要用属性名从对象里获取这个属性。 
// 并且我们想要确保这个属性存在于对象obj上，因此我们需要在这两个类型之间使用约束。

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
// getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

// 多个类型参数之间也可以互相约束：
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}
let x2 = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x2, { b: 10, d: 20 });




function createArray(length: number,value:any): Array<any> {
  let result = [];
  for(let i=0; i<length; i++){
    result[i] = value;
  }
  return result;
}

console.log(createArray(3,'x'),createArray(3,8));   // [ 'x', 'x', 'x' ] [ 8, 8, 8 ]

// 这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型：
function createArray2<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
      result[i] = value;
  }
  return result;
}

console.log(createArray2<string>(2,'x'));
console.log(createArray2(2,'x'));
// 也可以不手动指定，而让类型推论自动推算出来


// 当然也可以使用含有泛型的接口来定义函数的形状：
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>;
}

let createArray3: CreateArrayFunc;
createArray3 = function<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
      result[i] = value;
  }
  return result;
}

createArray3(3, 'x'); // ['x', 'x', 'x']


// 进一步，我们可以把泛型参数提前到接口名上：

interface CreateArrayFunc4<T> {
    (length: number, value: T): Array<T>;
}

let createArray4: CreateArrayFunc4<any>;
createArray4 = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray4(3, 'x'); // ['x', 'x', 'x']




// 多个类型参数
// 定义泛型的时候，可以一次定义多个类型参数：

function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]