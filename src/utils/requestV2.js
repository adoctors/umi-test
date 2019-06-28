import request, { extend } from 'umi-request';
// import { message } from 'antd';
// import router from 'umi/router';
// import { getPageQuery, getQueryPath } from '@/utils/utils';

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
  // if (status === 401) {
  //   notification.error({
  //     message: '未登录或登录已过期，请重新登录。',
  //   });
  //   // @HACK
  //   /* eslint-disable no-underscore-dangle */
  //   window.g_app._store.dispatch({
  //     type: 'login/logout',
  //   });
  //   // return;
  // }
  console.log(`请求错误 ${status}:${url}，${errortext}`);
  // notification.error({
  //   message: `请求错误 ${status}: ${url}`,
  //   description: errortext,
  // });
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
  // const data = await response.clone().json();
  // if(data && data.NOT_LOGIN) {
  //   location.href = 'login url';
  // }
  return response;
});

export default async function Request(url, option) {
  const data = await extendRequest(url, option);
  if (data.code === 10004) {
    // notification.error({
    //   message: '未登录或登录已过期，请重新登录。',
    //   maxCount: 1,
    // });
    // message.error('未登录或登录已过期，请重新登录！');
    /* eslint-disable no-underscore-dangle */
    // localStorage.removeItem('authority');
    // localStorage.removeItem('token');
    // window.g_app._store.dispatch({
    //   type: 'login/logout',
    // });
    localStorage.setItem('logout', true);
    // const params = getPageQuery();
    // const { token } = params;
    // delete params.token;
    // router.push({
    //   pathname: '/user/login',
    //   query: {
    //     token,
    //     redirect: getQueryPath(window.location.pathname, params),
    //   },
    // });

    // return { data: { code: 10004 } };
  }
  return { data };
}

/**
 const data = request(url, {
      method: 'get',  // 请求方式
      params,   // url 中的请求参数
      requestType, // 请求的数据类型，默认是json
      data,   //  body中的请求参数
      responseType,  //  如何解析返回的数据，默认是json,text
      timeout, // 超时，默认毫秒
      useCache,  // 是否使用缓存，默认false
      ttl,  // 缓存持续时间
    });

    data即上面返回的{data}对象

 */
