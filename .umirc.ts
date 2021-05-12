import { defineConfig } from 'umi';
import routes from './config/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
    hmr: false,
  },
  antd: {
    dark: true,
  },
  routes: routes,
  history: { type: 'hash' },
  fastRefresh: {},
});
