<script lang="tsx">
  import { defineComponent, h, ref, watch } from 'vue';
  import { useVModels } from '@vueuse/core';
  import useLoading from '@/hooks/loading';
  import componentsType from './config';

  export default defineComponent({
    name: 'PForm',
    props: {
      formOptions: {
        type: Object,
        required: true,
      },
      model: {
        type: Object,
        required: true,
      },
    },
    setup(props: any, { emit }) {
      const { model, formOptions } = useVModels(props, emit);
      formOptions.value = formOptions.value.map((item: any, index: number) => {
        if (index > 2 && !item.hidden) {
          item.hidden = true;
        }
        return item;
      });
      const optionsLen = formOptions.value.length;
      const responsiveSize = ref('xxl');
      const responsiveProps: any = {
        xxl: 6,
        xl: 12,
        lg: 12,
        md: 12,
        sm: 24,
        xs: 24,
      };
      const { loading, setLoading }: any = useLoading(false);
      const show = ref<boolean>(false);
      const handleReset = () => {
        console.log(1111);
      };

      const handleIsShow = () => {
        show.value = !show.value;
        formOptions.value.forEach((item: any) => {
          if (item.hidden !== undefined) {
            item.hidden = !item.hidden;
          }
        });
      };

      const onChangeOffset = () => {
        const currentGrid = responsiveProps[responsiveSize.value];
        const num = optionsLen * currentGrid;
        if (num > 24) {
          if (responsiveSize.value === 'xxl') {
            if (num % 24 === 0) return currentGrid * 3;
            if (num % 24 === currentGrid) return currentGrid * 2;
            if (num % 24 === currentGrid * 2) return currentGrid;
          }
          if (['xl', 'lg', 'md'].includes(responsiveSize.value)) {
            if (num % 24 === 0) return currentGrid;
            if (num % 24 !== 0) return currentGrid * 2;
          }
        }
        return 0;
      };

      const offSetValue = ref(onChangeOffset());

      watch(
        responsiveSize,
        (newVal: any) => {
          if (newVal) {
            offSetValue.value = onChangeOffset();
          }
        },
        {
          deep: true,
        }
      );

      // 获取窗口宽度
      function getWindowWidth() {
        return (
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth
        );
      }

      // 监听窗口宽度变化
      function handleWindowResize() {
        const windowSize = getWindowWidth();
        switch (true) {
          case windowSize >= 1600:
            responsiveSize.value = 'xxl';
            break;
          case windowSize >= 1200:
            responsiveSize.value = 'xl';
            break;
          case windowSize >= 992:
            responsiveSize.value = 'lg';
            break;
          case windowSize >= 768:
            responsiveSize.value = 'md';
            break;
          case windowSize >= 576:
            responsiveSize.value = 'sm';
            break;
          case windowSize < 576:
            responsiveSize.value = 'xs';
            break;
          default:
            responsiveSize.value = 'xxl';
            break;
        }
        // console.log('Window width changed:', getWindowWidth());
      }

      // 添加窗口宽度变化事件监听器
      window.addEventListener('resize', handleWindowResize);

      // 初始时获取一次窗口宽度
      handleWindowResize();

      return () => (
        <a-form style={{ width: '100%' }} {...props}>
          <a-row gutter={12}>
            {formOptions.value.map((item: any) => {
              return (
                <a-col
                  {...responsiveProps}
                  key={item.field}
                  class={{ hiddenClass: item.hidden }}
                >
                  <a-form-item
                    field={item.field}
                    label={item.label}
                    key={item.field}
                    {...item.formItemProps}
                  >
                    {h(componentsType[item.component], {
                      ...item.props,
                      'modelValue': model.value[item.field],
                      'onUpdate:modelValue': (val: any) => {
                        model.value[item.field] = val;
                      },
                    })}
                  </a-form-item>
                </a-col>
              );
            })}
            <a-col
              {...responsiveProps}
              offset={show.value ? offSetValue.value : 0}
              style={{ textAlign: 'right' }}
            >
              <a-space>
                <a-button onClick={handleReset}>
                  {{
                    icon: () => <icon-refresh />,
                    default: () => '重置',
                  }}
                </a-button>
                <a-button
                  html-type="submit"
                  type="primary"
                  loading={loading.value}
                >
                  {{
                    icon: () => <icon-search />,
                    default: () => '查询',
                  }}
                </a-button>
                {optionsLen > 4 ? (
                  <a-button type="text" onClick={handleIsShow}>
                    {show.value ? (
                      <span>
                        收起
                        <icon-up />
                      </span>
                    ) : (
                      <span>
                        展开
                        <icon-down />
                      </span>
                    )}
                  </a-button>
                ) : (
                  ''
                )}
              </a-space>
            </a-col>
          </a-row>
        </a-form>
      );
    },
  });
</script>

<style lang="less" scoped>
  .hiddenClass {
    display: none;
  }
</style>
