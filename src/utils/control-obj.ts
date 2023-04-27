import _ from 'lodash';

export default function controlObj(firstObj: any, secondObj: any) {
  const cloneSecondObj = _.cloneDeep(secondObj);
  Object.keys(firstObj).forEach((key: any) => {
    const value = cloneSecondObj[key];
    if (value) {
      firstObj[key] = value;
    }
  });
}
