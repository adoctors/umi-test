// 为函数类型定义
function add(x: number, y: number): number {
  return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y; };
// 上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的
// 可以给每个参数添加类型之后再为函数本身添加返回值类型。 
// TypeScript能够根据返回语句自动推断出返回值类型，因此我们通常省略它

// 书写完整函数类型
let myAdd2: (x: number, y:number) => number = function(x: number, y:number): number {return x+y;};
let myAdd3: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
// 只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。

// 第二部分是返回值类型。 
// 对于返回值，我们在函数和返回值类型之前使用(=>)符号，使之清晰明了。 
// 如之前提到的，返回值类型是函数类型的必要部分，
// 如果函数没有返回任何值，你也必须指定返回值类型为void而不能留空。

// 可选参数和默认参数
// JavaScript里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是undefined。 
// 在TypeScript里我们可以在参数名旁使用?实现可选参数的功能。

function buildName(firstName: string, lastName?: string) {
  if (lastName)
      return firstName + " " + lastName;
  else
      return firstName;
}

let result1 = buildName("Bob");  // works correctly now
// let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");  // ah, just right


function buildName3(firstName: string = 'Tom', lastName: string) {
    return firstName + ' ' + lastName;
}
let tomcat = buildName3('Tom', 'Cat');
let cat = buildName3(undefined, 'Cat');



// 剩余参数
// 你想同时操作多个参数，或者你并不知道会有多少参数传递进来。 
// 在JavaScript里，你可以使用arguments来访问所有传入的参数
function buildName2(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName2("Joseph", "Samuel", "Lucas", "MacKinzie");

// 重载
// JavaScript本身是个动态语言。 JavaScript里函数根据传入不同的参数而返回不同类型的数据是很常见的。

let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

// 为同一个函数提供多个函数类型定义来进行函数重载。 编译器会根据这个列表去处理函数的调用
// 前几次是定义，最后一次是实现
function pickCard2(x: {suit: string; card: number; }[]): number;
function pickCard2(x: number): {suit: string; card: number; };
function pickCard2(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck2 = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard12 = myDeck[pickCard2(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard22 = pickCard2(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

// 注意，function pickCard(x): any并不是重载列表的一部分，因此这里只有两个重载：
// 一个是接收对象另一个接收数字。 以其它参数调用pickCard会产生错误。


// 异常
// 如果某些函数内部一定会抛出错误, 或者永远不会执行完毕, 请用never来表示

function error(msg: string): never {
  msg = `您的程序运行出现异常, 错误信息为: ${msg}`;
    throw new Error(msg);
}




