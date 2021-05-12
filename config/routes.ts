import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/',
    component: '@/layouts',
    wrappers: ['@/wrappers/initData.tsx'],
    routes: [
      { redirect: '/mainLayout/main', path: '/' },
      {
        path: '/mainLayout',
        component: '@/layouts/mainLayout',
        routes: [
          {
            path: '/mainLayout/main',
            component: '@/pages/mainPage',
          },
        ],
      },
      {
        path: '/connectLayout',
        component: '@/layouts/connectLayout',
        routes: [
          {
            path: '/connectLayout/connect',
            component: '@/pages/connectPage',
          },
        ],
      },
    ],
  },
];
export default routes;
