// ref: https://umijs.org/config/
import { primaryColor } from '../src/defaultSettings';

import routesConfig from './routes.config';
import webpackPlugin from './plugin.config';

export default {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        targets: {
          ie: 11,
        },
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
        },
      },
    ],
    [
      'umi-plugin-pro-block',
      {
        moveMock: false,
        moveService: false,
        modifyRequest: true,
        autoAddMenu: true,
      },
    ],
  ],
  targets: {
    ie: 11,
  },

  /**
   * 路由相关配置
   */
  routes:routesConfig,
  disableRedirectHoist: true,

  /**
   * webpack 相关配置
   */
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  externals: {
    '@antv/data-set': 'DataSet',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,    // 修改webpack默认配置
  base:'/dist',       // 非根目录配置,影响(打包后与开发时)路由
  publicPath: '/dist/', // 非根目录配置,影响(打包后与开发时)静态资源的加载
  treeShaking: true,
  hash: true,
  // uglifyJSOptions(opts) {
  //   opts.uglifyOptions.compress.drop_debugger = true;   // 删除debugger语句
  //   opts.uglifyOptions.compress.drop_console = true;    // 删除所有console.*
  //   opts.uglifyOptions.compress.pure_funcs= ['console.log'];  // 针对console.log进行删除，也可是console.info,或其他函数
  //   return opts;
  // },
};
