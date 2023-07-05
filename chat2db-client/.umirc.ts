import { transitionTimezoneTimestamp } from './src/utils/date';
import { defineConfig } from 'umi';
import { getLang } from '@/utils/localStorage';
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const chainWebpack = (config: any, { webpack }: any) => {
  config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
    {
      languages: ['mysql', 'pgsql', 'sql'],
    },
  ]);
};

export default defineConfig({
  title: 'Chat2DB',
  history: {
    type: 'hash',
  },
  base: '/',
  publicPath: '/',
  hash: false,
  routes: [
    { path: '/demo', component: '@/pages/demo' },
    { path: '/connections', component: 'main' },
    { path: '/workspace', component: 'main' },
    { path: '/dashboard', component: 'main' },
    { path: '/test', component: '@/pages/test' },
    { path: '/', component: 'main' },
  ],
  npmClient: 'yarn',
  dva: {},
  plugins: ['@umijs/plugins/dist/dva'],
  chainWebpack,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:10821',
      changeOrigin: true,
    },
    '/client/remaininguses/': {
      target: 'http://127.0.0.1:1889',
      changeOrigin: true,
    },
  },
  headScripts: [
    `if (localStorage.getItem('app-local-storage-versions') !== 'v2') {
      localStorage.clear();
      localStorage.setItem('app-local-storage-versions', 'v2');
    }`,
    `if (window.myAPI) { window.myAPI.startServerForSpawn() }`
  ],
  favicons: ['logo.ico'],
  define: {
    __ENV__: process.env.UMI_ENV,
    __BUILD_TIME__: transitionTimezoneTimestamp(new Date().getTime()),
    __APP_VERSION__: process.argv[3]|| '0.0.0',
    __APP_PORT__: process.argv[4]
  },
});
