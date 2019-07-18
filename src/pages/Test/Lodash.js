import React from 'react';
import Lodash from 'lodash';
import Moment from './Moment';

const obj = {};
const obj2 = {a:1};
// isEmpty判断是否为空对象
// console.log(Lodash.isEmpty(obj),Lodash.isEmpty(obj2));

// isEqual
// _.isEqual(value, other)
// 这个方法支持比较 arrays, array buffers, booleans, date objects, error objects, maps, numbers,
//  Object objects, regexes, sets, strings, symbols, 
//  以及 typed arrays. Object 对象值比较自身的属性，不包括继承的和可枚举的属性。 
//  不支持函数和DOM节点比较。

// _.flattenDeep(array)
// 将array递归为一维数组。

// 文档地址：https://www.html.cn/doc/lodash/#_chunkarray-size1


export default ()=> 
  <div>
    <p>lodash - about</p>
    <Moment />
  </div>