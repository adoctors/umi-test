class Greeter {
  greeting: string;
  constructor(message: string) {
      this.greeting = message;
  }
  greet() {
      return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

// 继承
class Animal {
  move(distanceInMeters: number = 0) {
      console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof! Woof!');
  }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

// 公共，私有与受保护的修饰符
// 默认为public
class Animal2 {
  public name: string;
  public constructor(theName: string) { this.name = theName; }
  public move(distanceInMeters: number) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

// private
// 当成员被标记成private时，它就不能在声明它的类的外部访问。比如
class Animal3 {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

// new Animal3("Cat").name; // 错误: 'name' 是私有的.

// protected
// protected修饰符与private修饰符的行为很相似，但有一点不同，protected成员在派生类中仍然可以访问

class Person {
  protected name: string;
  constructor(name: string) { this.name = name; }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
      super(name)
      this.department = department;
  }

  public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name); // 错误

// 静态属性
// 这些属性存在于类本身上面而不是类的实例上

// 抽象类
// 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 
// 不同于接口，抽象类可以包含成员的实现细节。 
// abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。

// 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 
// 抽象方法的语法与接口方法相似。 两者都是定义方法签名但不包含方法体。 
// 然而，抽象方法必须包含abstract关键字并且可以包含访问修饰符。

abstract class Department {
  constructor(public name: string) {
  }
  printName(): void {
    console.log('Department name: ' + this.name);
  }
  abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor() {
    super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
  }
  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am.');
  }
  generateReports(): void {
    console.log('Generating accounting reports...');
  }
}

let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在

// 把类当做接口使用
// class Point {
//   x: number;
//   y: number;
// }

// interface Point3d extends Point {
//   z: number;
// }

// let point3d: Point3d = {x: 1, y: 2, z: 3};