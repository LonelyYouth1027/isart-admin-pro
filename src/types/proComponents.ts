// 表单中的组件类型
type ProFormType =
  | 'input'
  | 'password'
  | 'select'
  | 'mention'
  | 'datePicker'
  | 'dateRangePicker'
  | 'textArea'
  | 'textAreaEditor'
  | 'slot';

type Layout = 'horizontal' | 'vertical' | 'inline'; // 表单的布局方式，包括水平、垂直、多列
type Size = 'mini' | 'small' | 'medium' | 'large'; // 表单控件的尺寸

// 表单所需要的数据类型
// field：双向绑定关键字
// type：表单中组件的类型（通过type进行匹配：比如：input 是一个输入框，password则是密码框）
// label  标签名称
// rules 验证规则
// placeholder 提醒文字
// options  数据（比如select ）
// slotName 插槽名字
export interface ProFormItem {
  field: string;
  type: ProFormType;
  span?: number | string;
  label: string;
  rules?: any[];
  placeholder?: string | any[];
  options?: any[];
  fieldNames?: any;
  slotName?: string;
  labelConfig?: any;
}

// 表单的配置
export interface ProFormConfig {
  layout?: Layout;
  size?: Size;
  labelColProps?: any;
  wrapperColProps?: any;
  labelAlign?: any;
  disabled?: boolean;
  rules?: any;
  autoLabelWidth?: boolean;
}

// 模态表单的配置
export interface ModalFormConfig extends ProFormConfig {
  visible: boolean;
  title?: string;
  width?: string | number;
  top?: string | number;
  alignCenter?: boolean;
  footer?: boolean;
}
