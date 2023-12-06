// 表单中的组件类型
type ProFormType =
  | 'AInput'
  | 'APassword'
  | 'ASelect'
  | 'ADatePicker'
  | 'ADateRangePicker'
  | 'ATextArea'
  | 'textAreaEditor'
  | 'upload';

export interface ProFormItem {
  label: string;
  field: string;
  component: ProFormType;
  span?: number;
  formItemProps?: any;
  props?: any;
}
