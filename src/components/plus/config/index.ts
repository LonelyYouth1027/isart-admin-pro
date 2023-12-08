import {
  Input,
  Select,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  RangePicker,
  Textarea,
} from '@arco-design/web-vue';

const proComponents: any = {
  AInput: Input,
  ASelect: Select,
  ARadio: Radio,
  ARadioGroup: RadioGroup,
  ACheckbox: Checkbox,
  ACheckboxGroup: CheckboxGroup,
  ADatePicker: DatePicker,
  ARangePicker: RangePicker,
  ATextarea: Textarea,
  div: 'div',
  span: 'span',
};

const responsiveProps: any = {
  xxl: 6,
  xl: 8,
  lg: 12,
  md: 12,
  sm: 24,
  xs: 24,
};
const responsiveHiddenProps: any = {
  xxl: 2,
  xl: 1,
  lg: 0,
  md: 0,
  sm: 0,
  xs: 0,
};

export { proComponents, responsiveProps, responsiveHiddenProps };
