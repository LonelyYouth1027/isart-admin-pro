<script lang="tsx">
  import { defineComponent, h, onMounted, ref, watch } from 'vue';
  import { useVModels } from '@vueuse/core';
  import {
    proComponents,
    responsiveProps,
    responsiveHiddenProps,
  } from '../config';

  export default defineComponent({
    name: 'SearchForm',
    props: {
      formOptions: {
        type: Object,
        required: true,
      },
      model: {
        type: Object,
        required: true,
      },
      loading: {
        type: Boolean,
        require: true,
      },
      extra: {
        type: Object,
        require: false,
        default: () => {
          return ref({});
        },
      },
    },
    emits: ['reset', 'update:formOptions'],
    setup(props: any, { emit }) {
      const { model, formOptions, loading } = useVModels(props, emit);
      const formRef = ref<any>();
      const layout = ref<any>('horizontal');
      const optionsLen = formOptions.value.length;
      const responsiveSize = ref('xxl');
      const show = ref<boolean>(false);

      /**
       * @description 隐藏多余搜索项
       * @param hiddenNum 从第几个开始隐藏
       */
      const handleFilterOptions = (hiddenNum = 2) => {
        formOptions.value = formOptions.value.map(
          (item: any, index: number) => {
            item.hidden = index > hiddenNum;
            return item;
          }
        );
      };

      /**
       * @description 重置表单
       */
      const handleReset = () => {
        formRef.value?.resetFields();
        emit('reset');
      };

      /**
       * @description 是否展开所有搜索项
       */
      const handleIsShow = () => {
        show.value = !show.value;
        if (show.value) {
          formOptions.value.forEach((item: any) => {
            item.hidden = false;
          });
        } else {
          handleFilterOptions(responsiveHiddenProps[responsiveSize.value]);
        }
      };

      /**
       * @description 计算操作列的偏移量
       */
      const onChangeOffset = () => {
        const currentGrid = responsiveProps[responsiveSize.value];
        const num = optionsLen * currentGrid;
        if (num >= 24) {
          if (responsiveSize.value === 'xxl') {
            if (num % 24 === 0) return currentGrid * 3;
            if (num % 24 === currentGrid) return currentGrid * 2;
            if (num % 24 === currentGrid * 2) return currentGrid;
          }
          if (responsiveSize.value === 'xl') {
            if (num % 24 === 0) return currentGrid * 2;
            if (num % 24 === currentGrid) return currentGrid;
            if (num % 24 === currentGrid * 2) return 0;
          }
          if (['lg', 'md'].includes(responsiveSize.value)) {
            if (num % 24 === 0) return currentGrid;
            if (num % 24 !== 0) return currentGrid * 2;
          }
        }
        return 0;
      };

      const offSetValue = ref(onChangeOffset()); // 操作列偏移量

      // 监听窗口尺寸
      watch(
        responsiveSize,
        (newVal: any) => {
          if (newVal) {
            offSetValue.value = onChangeOffset();
            if (show.value) return;
            handleFilterOptions(responsiveHiddenProps[newVal]);
          }
        },
        {
          deep: true,
          // immediate: true,
        }
      );

      watch(
        props.extra,
        (newVal) => {
          if (newVal) {
            formOptions.value = formOptions.value.map((item: any) => {
              if (item.component === 'ASelect' && item?.optionsServer) {
                item.props.options = newVal[item.field];
              }
              return item;
            });
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

      onMounted(() => {
        // 初始时获取一次窗口宽度
        handleWindowResize();
        handleFilterOptions();
      });

      return () => (
        <a-form
          ref={formRef}
          style={{ width: '100%' }}
          {...props}
          layout={layout.value}
        >
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
                    label-col-props={{ span: 7 }}
                    wrapper-col-props={{ span: 17 }}
                    {...item.formItemProps}
                  >
                    {h(proComponents[item.component], {
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
              <a-space class="m-b-20">
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
                {optionsLen >= 4 ? (
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
