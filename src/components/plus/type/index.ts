// 表单中的组件类型
type ComponentsType =
  | 'AInput'
  | 'APassword'
  | 'ASelect'
  | 'ADatePicker'
  | 'ARangePicker'
  | 'ATextArea'
  | 'textAreaEditor'
  | 'Upload';

export interface ProFormItem {
  label: string;
  field: string;
  component: ComponentsType;
  span?: number;
  formItemProps?: any;
  props?: any;
}
