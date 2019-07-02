// 编译代码
// 尝试使用tsc 1.ts 编译ts文件生成新的js文件
// function greeter( person ){
//   return "hello, " + person;
// }
// let user = "adcotors";


// 类型注解
// 给函数参数添加类型，并传入一个错误的参数，编译时就会报错,且编译器也会提示
// function greeter( person:string ){
//   return "hello, " + person;
// }
// let user = [1,2,3];
// document.body.innerHTML = greeter(user);
// Argument of type 'number[]' is not assignable to parameter of type 'string'.
// 要注意的是尽管有错误，greeter.js文件还是被创建了


// 接口
// 在TypeScript里，只在两个类型内部的结构兼容那么这两个类型就是兼容的。
// interface Persson {
//   firstName: string;
//   lastName: string;
// }
// function fun( person:Persson ){
//   return "hello, " + person.firstName + "" + person.lastName;
// }
// let users = { firstName:'adc', lastName:'octor'};
// console.log(fun(users))


// 类
// class Student {
//   fullName: string;
//   constructor(
//     public firstName: string,
//     public middleInitial: string,
//     public lastName: string,
//   ){
//     this.fullName = firstName + " " + middleInitial + " " + lastName;
//   }
// }

// let names = new Student('Jane','M.','User');
// console.log(names)
// Student {
//   firstName: 'Jane',
//   middleInitial: 'M.',
//   lastName: 'User',
//   fullName: 'Jane M. User' }
// console.log(fun(names)) // hello, JaneUser

// 无状态组件 ---------------------------------------------------------------------------------------
// 我们在某些情况下会使用到无状态组件（也就是一个函数），这个无状态组件函数使用 TypeScript 来定义几乎与 JavaScript 很像，如：
// import * as React from "react";
// const TestPage: React.SFC = () => {
//   return (
//     <div>
//       this is test page.
//     </div>
//   );
// };
// export default TestPage;

// 如：
// export interface IHeaderProps {
//   localImageSrc: string;
//   onLineImageSrc: string;
// }

// export const Header: React.SFC<IHeaderProps> = (props: IHeaderProps) => {
//   const { localImageSrc, onLineImageSrc } = props;
//   return (
//     <div className={styles["header-container"]}>
//       <img src={localImageSrc} />
//       <img src={onLineImageSrc} />
//     </div>
//   );
// };


// 有状态组件   ----------------------------------------------------------------------------------
// 假设当我们需要使用到一个有状态的组件，
// 如：因为某些操作（onClick）来改变 state时，我们需要给 state 定义一个接口，
// 与上述的 props 类似，在编写有状态组件时，需要给 React.Component的范型传递你的类型：
// export interface IHomePageState {
//   name: string;
// }
// class HomeComponent extends React.Component<{}, IHomePageState> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       name: "",
//     };
//   }
//   public setName = () => {
//     this.setState({
//       name: "icepy",
//     });
//   }

//   public render(){
//     const { name } = this.state;
//     return (
//       <div>
//          <div onClick={this.setName}> set name </div>
//          <div>{name}</div>
//       </div>
//     )
//   }
// }

// 类型断言 ----------------------------------------
// 类型断言（Type Assertion）可以用来手动指定一个值的类型。
// 语法：
// <类型>值 
// 或：    值 as 类型
// 在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种。
// 有时候，我们确实需要在还不确定类型的时候就访问其中一个类型的属性或方法，比如：
function getLength(something: string | number): number {
  if (something.length) {
      return something.length;
  } else {
      return something.toString().length;
  }
}
// 上例中，获取 something.length 的时候会报错。
// 此时可以使用类型断言，将 something 断言成 string：
function getLength2(something: string | number): number {
  if ((<string>something).length) {
      return (<string>something).length;
  } else {
      return something.toString().length;
  }
}
// 类型断言的用法如上，在需要断言的变量前加上 <Type> 即可
// 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的


// 字符串字面量类型
// 字符串字面量类型用来约束取值只能是某几个字符串中的一个。

// 简单的例子
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'

// 上例中，我们使用 type 定了一个字符串字面量类型 EventNames，它只能取三种字符串中的一种。
// 注意，类型别名与字符串字面量类型都是使用 type 进行定义。


// 无状态的函数式写法（纯组件 SFC） -------------------------------------
// 只负责展示的纯组件出现了，它的特点是不需要管理状态state，数据直接通过props传入，
// 这也符合 React 单向数据流的思想。