import _ from 'lodash';
export default function controlObj(firstObj, secondObj) {
    const cloneSecondObj = _.cloneDeep(secondObj);
    Object.keys(firstObj).forEach((key) => {
        const value = cloneSecondObj[key];
        if (value) {
            firstObj[key] = value;
        }
    });
}
//# sourceMappingURL=control-obj.js.map