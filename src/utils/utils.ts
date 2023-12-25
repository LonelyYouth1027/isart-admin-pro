import cloneDeep from 'lodash/cloneDeep';

/**
 * 合并行 (仅支持前两列)
 * @param table
 * @param columnCollections
 */
const mergeTheSameRow = (table: any, columnCollections: any) => {
  const firstColArr = [];
  const secondColArr = [];
  let firstPos = 0;
  let secondPos = 0;
  for (let i = 0; i < table.length; i += 1) {
    if (i === 0) {
      firstColArr.push(1);
      firstPos = 0;
      secondColArr.push(1);
      secondPos = 0;
    } else {
      if (
        table[i][columnCollections[0]] === table[i - 1][columnCollections[0]]
      ) {
        firstColArr[firstPos] += 1;
        firstColArr.push(0);
      } else {
        firstColArr.push(1);
        firstPos = i;
      }
      if (
        table[i][columnCollections[1]] === table[i - 1][columnCollections[1]] &&
        table[i][columnCollections[0]] === table[i - 1][columnCollections[0]]
      ) {
        secondColArr[secondPos] += 1;
        secondColArr.push(0);
      } else {
        secondColArr.push(1);
        secondPos = i;
      }
    }
  }
  return [firstColArr, secondColArr];
};

/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */

const recursionRouter = (userRouter = [], allRouter = []) => {
  const cloneAllRouter: any = cloneDeep(allRouter);
  const realRoutes: any = [];
  cloneAllRouter.forEach((v: any) => {
    userRouter.forEach((item: any) => {
      if (item.name === v.name) {
        if (item.children && item.children.length > 0) {
          v.children = recursionRouter(item.children, v.children);
        }
        realRoutes.push(v);
      }
    });
  });
  return realRoutes;
};

export default {
  mergeTheSameRow,
  recursionRouter,
};
