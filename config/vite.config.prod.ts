import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';
// import configCompressPlugin from './plugin/compress';
// import configVisualizerPlugin from './plugin/visualizer';
// import configArcoResolverPlugin from './plugin/arcoResolver';
// import configStyleImportPlugin from './plugin/styleImport';
// import configImageminPlugin from './plugin/imagemin';

// export default mergeConfig(
//   {
//     mode: 'production',
//     plugins: [
//       configCompressPlugin('gzip'),
//       configVisualizerPlugin(),
//       configArcoResolverPlugin(),
//       configStyleImportPlugin(),
//       configImageminPlugin(),
//     ],
//     build: {
//       rollupOptions: {
//         output: {
//           manualChunks: {
//             arco: ['@arco-design/web-vue'],
//             chart: ['echarts', 'vue-echarts'],
//             vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
//           },
//         },
//       },
//       chunkSizeWarningLimit: 2000,
//     },
//   },
//   baseConfig
// );

export default mergeConfig(
  {
    mode: 'production',
    server: {
      open: true,
      fs: {
        strict: true,
      },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConfig
);
