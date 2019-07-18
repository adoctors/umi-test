import request from './request';
import requestV2 from './requestV2';
import api from './api.config';

/**
 * 通用请求Api方法
 * @param apiName(String)：调用的api名称
 * @param reqType(String)：请求的类型：GET | POST | PUT | DELETE
 * @param placeholerData(Object)：放在占位符上的数据
 * @param queryData(Object)：放在url上的数据
 * @param bodyData(Object)：放在body里的数据
 */
export function requestApiV2({ apiName, reqType, placeholerData, queryData, bodyData }) {
  // const method = reqType.toLowerCase();
  let url = api[apiName];
  const req = { method: reqType };
  const params = placeholerData ? Object.keys(placeholerData) : [];
  if (params.length) {
    for (let i = 0; i < params.length; i += 1) {
      url = url.replace(`:${params[i]}`, placeholerData[params[i]]);
    }
  }

  if (queryData && Object.keys(queryData).length) {
    req.params = queryData;
  }

  if (bodyData && Object.keys(bodyData).length) {
    req.data = JSON.stringify(bodyData);
  }

  return requestV2(url, req);
}


/**
 * 通用请求Api方法
 * @param apiName(String)：调用的api名称
 * @param reqType(String)：请求的类型：get | post | delete
 * @param data(Object)：数据的内容
 * @param placeholerParams(Object)：占位符内容
 */
export function requestApi({ apiName, reqType, data, placeholerParams }) {
  const method = reqType.toUpperCase();
  let url = api[apiName];
  const req={ method };
  const params = placeholerParams ? Object.keys(placeholerParams) : [];
  if (params.length) {
    for(let i=0;i<params.length;i+=1){
      url = url.replace(`:${params[i]}`, placeholerParams[params[i]]);
    }
  }
  if (method === 'GET' && data) {
    req.data=data;
  }
  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    req.body=JSON.stringify(data);
  }
  return request(url, req);
}

// dispatch({
//   type: 'modal/effectName',
//   payload: {
//     apiName: '',
//     reqType: 'get',
//     data: {
//       bid,
//     },
//     placeholerParams: {
//       offset,
//       size,
//     },
//   },
//   successCallback: ({ data, total }) => {
//     // console.log(data.calls)
//   },
// });



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

export const fun = (arr1,arr2) => [1,3];
