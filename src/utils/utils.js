/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}


const development=process.env.NODE_ENV==="development";

export const Log=(()=>{
  let prefix = {
    error: ()=> {}, 
    info: ()=> {}, 
    warn: ()=> {}, 
  }
  if(development){
    prefix = {
      error: (...arg)=> {
        console.error(...arg);
      }, 
      info: (...arg)=> {
        console.info(...arg);
      }, 
      warn: (...arg)=> {
        console.warn(...arg);
      }, 
    }
  }
  return prefix;
})();


export const Logs=(...arg)=>{
  if(development){
    console.log(...arg)
  }
}

// 数组相关----------------------------------------------------------

// 简单的数据拷贝，适用于json类型的数组
export const deepCopy= (obj)=>JSON.parse(JSON.stringify(obj));

// 根据指定的属性名返回两个数组不相同的部分
export const deWeight=(arr1Name, arr2Name,name)=>{
  const arr1=arr1Name.map(item=>item[name]);
  const arr2=arr2Name.map(item=>item[name]);
  const diff=arr1.concat(arr2).filter((v, i, arr)=> arr.indexOf(v) === arr.lastIndexOf(v));
  const list= arr1.length>=arr2.length?arr1Name:arr2Name;
  let arr=[];
  for(let i=0;i<list.length;i++){
    for(let j=0;j<diff.length;j++){
      if(list[i][name]===diff[j]){
        arr.push(list[i])
      }
    }
  }
  return arr;
}


// 本地存储相关 ---------------------------------------------------

export function getLocalItem(key) {
  const localItem = localStorage.getItem(key);
  let result;
  try {
    result = JSON.parse(localItem);
  } catch (e) {
    result = localItem;
  }
  return result;
}

export function setLocalItem(key, item) {
  if (!item) {
    return localStorage.removeItem(key);
  }
  return localStorage.setItem(key, JSON.stringify(item));
}
