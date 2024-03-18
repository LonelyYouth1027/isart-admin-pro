<script lang="tsx">
  import { defineComponent, h, ref, watch } from 'vue';
  import { useVModels } from '@vueuse/core';
  import { proComponents } from '../config';

  export default defineComponent({
    name: 'ModalForm',
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
      visible: {
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
    emits: ['cancel', 'ok'],
    setup(props: any, { emit }) {
      const { model, formOptions, loading } = useVModels(props, emit);
      const modalFormRef = ref<any>();
      const layout = ref<any>('horizontal');

      /**
       * @description 重置表单
       */
      const handleCancel = () => {
        modalFormRef.value?.resetFields();
        // const timer = setTimeout(() => {
        //   modalFormRef.value?.resetFields();
        //   clearTimeout(timer);
        // }, 700);
        emit('cancel');
      };

      const handleOk = () => {
        modalFormRef.value?.validate((errors: any) => {
          if (!errors) {
            emit('ok', modalFormRef.value?.resetFields);
          }
        });
      };

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

      return () => (
        <a-modal
          {...props}
          mask-closable={false}
          esc-to-close={false}
          closable={false}
          okLoading={loading.value}
          onCancel={() => handleCancel()}
          onOk={() => handleOk()}
        >
          <a-form
            ref={modalFormRef}
            style={{ width: '100%' }}
            {...props}
            layout={layout.value}
          >
            <a-row gutter={12}>
              {formOptions.value.map((item: any) => {
                return (
                  <a-col key={item.field} span={item.span}>
                    <a-form-item
                      field={item.field}
                      label={item.label}
                      key={item.field}
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
              <a-col style={{ textAlign: 'right', display: 'none' }}>
                <a-space className="m-b-20">
                  <a-button>取消</a-button>
                  <a-button
                    html-type="submit"
                    type="primary"
                    loading={loading.value}
                  >
                    确定
                  </a-button>
                </a-space>
              </a-col>
            </a-row>
          </a-form>
        </a-modal>
      );
    },
  });
</script>

<style lang="less" scoped></style>
