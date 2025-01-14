import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import AutoImport from 'unplugin-auto-import/vite';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    },
    server: {
      open: true,
      fs: {
        strict: true,
      },
      host: '0.0.0.0',
    },
    build: {
      sourcemap: false, // 关闭 Source Maps
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      AutoImport({
        // 自动导入vue相关函数，如: ref、reactive、toRef等
        imports: ['vue', 'vue-router', '@vueuse/core'],
        dts: 'src/auto-import.d.ts',
        eslintrc: {
          enabled: true,
        },
      }),
    ],
  },
  baseConfig
);
