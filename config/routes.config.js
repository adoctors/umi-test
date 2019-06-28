export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [{ path: '/user', component: './Welcome' }],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/welcome' },
      // dashboard
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      {
        path: '/mock/test',
        name: 'mock-test',
        icon: 'database',
        component: './Mock/Mock',
      },
      {
        path: '/table/columnswidth',
        name: 'columns-width',
        icon: 'block',
        component: './Table/ColumnsWidth',
      },
      {
        path: '/table/v2',
        name: 'MyTableV2',
        icon: 'table',
        component: './Table/MyTableV2/MyTableV2',
      },
      {
        path: '/dnd',
        name: 'react-dnd',
        icon: 'block',
        component: './Dnd/index',
      },
      {
        path: '/transfer',
        name: 'transfer',
        icon: 'block',
        component: './Transfer/Transfer',
      },
      {
        path: '/carousel',
        name: 'carousel',
        icon: 'block',
        component: './Carousel/index',
      },
      {
        path: '/test',
        name: 'test',
        icon: 'block',
        component: './Test/index',
      },
      {
        path: '/list',
        name: 'list',
        icon: 'ordered-list',
        component: './List/List',
      },
      {
        path: '/hooks',
        name: 'hooks',
        icon: 'paper-clip',
        component: './Hooks/Index',
      },
      {
        path: '/ts',
        name: 'ts',
        icon: 'alert',
        component: './TS/Index',
      },
    ],
  },
];