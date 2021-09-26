// https://umijs.org/config/
import { defineConfig } from 'umi';
import proxy from './proxy';
import router from './router';
import theme from './theme';

const { REACT_APP_ENV, NODE_ENV } = process.env;

let config = {
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: router,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme,
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
}

if (NODE_ENV === 'development') {
  config = {
    ...config,
    mfsu: {},
    webpack5: {},
  }
} else {
  config = {
    ...config,
    // mfsu: { production: { output: '.mfsu-production' } },
    extraBabelPlugins: ['transform-remove-console']
  }
}

export default defineConfig(config);
