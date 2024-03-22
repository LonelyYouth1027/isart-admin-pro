import { App } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
} from 'echarts/components';
import Chart from './chart/index.vue';
import Breadcrumb from './breadcrumb/index.vue';
import ProSearchForm from './plus/search-form/index.vue';
import ProModalForm from './plus/modal-form/index.vue';
import ProSvgIcon from './plus/svg-icon/index.vue';

// Manually introduce ECharts modules to reduce packing size

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  DataZoomComponent,
  GraphicComponent,
]);

const globalComponents: any = {
  Chart,
  Breadcrumb,
  ProSearchForm,
  ProModalForm,
  ProSvgIcon,
};

export default {
  install(Vue: App) {
    Object.keys(globalComponents).forEach((key: any) => {
      Vue.component(key, globalComponents[key]);
    });
  },
};
