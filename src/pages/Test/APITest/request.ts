import request, { extend } from 'umi-request';
import api from './apimaps';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url, type } = response;
  // console.log(response);
  if (type === 'opaqueredirect') {
    window.open(url);
  }
  console.log(`请求错误 ${status}:${url}，${errortext}`);

};

/**
 * 配置request请求时的默认参数
 */
const extendRequest = extend({
  errorHandler, // 默认错误处理
  prefix: '/api',
  redirect: 'manual',
  // credentials: 'include', // 默认请求是否带上cookie
});

// let Authorization = localStorage.getItem('token');
request.interceptors.request.use((url, options) => {
  // if (!Authorization) {
  //   Authorization = localStorage.getItem('token');
  // }
  const Authorization = localStorage.getItem('token');
  return {
    options: { ...options, headers: { Authorization } },
  };
});

request.interceptors.response.use(response => {
  // console.log(response);
  const disposition = response.headers && response.headers.get('content-disposition');
  if (disposition) {
    const filename = disposition.split('=')[1];
    response
      .clone()
      .blob()
      .then(blob => {
        // const filename = `test.xlsx`;
        const eleLink = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        eleLink.href = url;
        eleLink.download = decodeURIComponent(filename);
        eleLink.click();
        window.URL.revokeObjectURL(url);
      });
    // return { success: true, message: '下载成功～' };
  }

  return response;
});

export default async function Request(url, option) {
  const data = await extendRequest(url, option);
  // console.log(data)
  return { data };
}

/**
 * 通用请求Api方法
 * @param apiName(String)：调用的api名称
 * @param reqType(String)：请求的类型：GET | POST | PUT | DELETE
 * @param placeholerData(Object)：放在占位符上的数据
 * @param queryData(Object)：放在url上的数据
 * @param bodyData(Object)：放在body里的数据
 */

interface IReq {
  method: string;
  params?: object;
  data?: string;
}

interface IRequestApiParams {
  apiName: string;
  reqType: string;
  placeholerData?: object;
  queryData?: object;
  bodyData?: object;
  namespace: string;
}

export function requestApi({
  apiName,
  reqType,
  placeholerData,
  queryData,
  bodyData,
  namespace,
}: IRequestApiParams) {
  // const method = reqType.toLowerCase();
  let url = api[apiName];
  const req: IReq = { method: reqType };

  let params = [];
  if (placeholerData) {
    params = Object.keys(placeholerData);
    for (let i = 0; i < params.length; i += 1) {
      url = url.replace(`:${params[i]}`, placeholerData[params[i]]);
    }
  }

  if (queryData && Object.keys(queryData).length) {
    // url = `${url}?${stringify(queryData)}`;
    req.params = queryData;
  }

  if (bodyData && Object.keys(bodyData).length) {
    req.data = JSON.stringify(bodyData);
  }
  return Request(url, req);
}



