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

export const deepCopy= (obj)=>JSON.parse(JSON.stringify(obj));
