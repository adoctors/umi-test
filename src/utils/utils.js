/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

// export const Log=(()=>{
//   if(process.env.NODE_ENV==="development"){
//     return {
//       error: (...arg)=> {
//         console.error(...arg);
//       }, 
//       info: (...arg)=> {
//         console.info(...arg);
//       }, 
//       warn: (...arg)=> {
//         console.warn(...arg);
//       }, 
//     }
//   }
// })();


export const Log=(...arg)=>{
  if(arg){
    console.log(...arg)
  }
}

