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
        icon: 'block',
        component: './Mock/Mock',
      },
      {
        path: '/table/columnswidth',
        name: 'columns-width',
        icon: 'block',
        component: './Table/ColumnsWidth',
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
    ],
  },
];