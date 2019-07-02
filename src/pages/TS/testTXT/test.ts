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