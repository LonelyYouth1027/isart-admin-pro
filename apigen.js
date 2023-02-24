const fs = require('fs');
const path = require('path');
const parse = require('swagger-parser');
const beautify = require('js-beautify').js_beautify;
const swaggerUrl = 'http://127.0.0.1:4523/export/openapi/4?version=3.0'; // apiFox导出openapi文件类型地址

// api接口方法存放目录
const API_PATH = path.resolve(__dirname, './src/api');

// 判断目录是否存在
const isExist = (lastPath = '') => {
  const privatePath = `${lastPath ? API_PATH + '/' + lastPath : API_PATH}`;
  const stat = fs.existsSync(privatePath);
  if (!stat) {
    fs.mkdirSync(privatePath);
  }
  if (!lastPath) {
    const configPath = `${API_PATH}/config.tsx`;
    // api 目录下写入 config文件
    fs.access(configPath, function (err) {
      if (err && err.code === 'ENOENT') {
        fs.writeFileSync(
          `${API_PATH}/config.ts`,
          "export const ip = 'https://test.××××.com/'"
        );
      }
    });
  }
};
// 模块名称整理
// const moduleName = (operationId) => {
//   return operationId.replace(/Using|_/g, '')
// }
// 数据类型
const dataType = (key) => {
  const type = {
    string: 'string',
    integer: 'number',
    int: 'number',
    long: 'string',
    Array: 'array',
    file: 'Blob',
    boolean: 'boolean',
  };
  return type[key] ? type[key] : 'any';
};

// 整理出相同模块路径
const getModules = (map) => {
  let moduleList = [];
  map.forEach((value, key) => {
    const module = writeFileApi(key, value);
    moduleList = [...moduleList, ...module];
  });
  return moduleList;
};

// 参数模板参数数组
const interfaceParamsList = (params) => {
  let str = '';
  params.forEach((item) => {
    str = `${str}
      /** ${item.description ? item.description : ''} **/
      ${item.name}${item.required ? '?' : ''}: ${dataType(item.type)};
    `;
  });
  return str;
};

// 参数模板
const interfaceParamsTpl = (params, interfaceName) => {
  if (!params || params.length === 0) {
    return '';
  } else {
    return `interface ${interfaceName} {
      ${interfaceParamsList(params)}
    }`;
  }
};

// 截取函数名称
const splitFunctionStr = (str) => {
  const parts = str.split('/');
  let firstStr = '';
  let lastStr = parts[parts.length - 1];
  lastStr = lastStr[0].toUpperCase() + lastStr.substr(1);
  if (parts.length > 1) {
    firstStr = parts[parts.length - 2];
  }
  return firstStr + lastStr;
};

// 写入模板
const tplInsertApi = (apiInfo) => {
  const keys = Object.keys(apiInfo);
  const method = keys[0];
  const methodParams = apiInfo[method];
  const parameters = methodParams.parameters;
  // const operationId = methodParams.operationId
  const allPath = apiInfo.allPath;
  const requestName = splitFunctionStr(apiInfo.allPath);
  const genericParadigmName = '<GlobalResponse>';
  let interfaceName = 'any';
  let interfaceParams = 'data?:any';
  let parametersType = 'data';
  if (parameters && parameters.length > 0) {
    // interfaceName = `${requestName}Ife`
    interfaceParams = `data: ${interfaceName}`;
  }
  if (method.toLocaleLowerCase() === 'get') {
    parametersType = 'params';
    interfaceParams = `params: ${interfaceName}`;
  }

  return `/**
    * @description ${methodParams.summary}
    */
    ${interfaceParamsTpl(parameters, interfaceName)}
    export async function ${requestName}(${interfaceParams}) {
      return axios.post${genericParadigmName}('${allPath}', ${parametersType});
    }
  `;
};

// 模板名
const getModulesName = (apiInfo) => {
  const keys = Object.keys(apiInfo);
  const method = keys[0];
  const methodParams = apiInfo[method];
  const operationId = methodParams.operationId;
  return operationId;
};

// 写入tsx
const writeFileApi = (fileName, apiData) => {
  // index.tsx
  let tplIndex = `import axios from 'axios';\nimport { GlobalResponse } from '@/types/global';\n`;
  const apiDataLen = apiData.length;
  const moduleList = [];
  for (let i = 0; i < apiDataLen; i++) {
    const item = apiData[i];
    tplIndex = `${tplIndex}\n${tplInsertApi(item)}\n`;
    moduleList.push(getModulesName(item));
  }
  tplIndex = beautify(tplIndex, { indent_size: 2, max_preserve_newlines: 2 });
  // fs.writeFileSync(`${API_PATH}/${fileName}/index.ts`, tplIndex)
  fs.writeFileSync(`${API_PATH}/${fileName}.ts`, tplIndex);
  return moduleList;
};

const gen = async () => {
  isExist();
  try {
    // 解析url 获得
    const parsed = await parse.parse(swaggerUrl);
    const paths = parsed.paths;
    const pathsKeys = Object.keys(paths); // 获取url路径
    const pathsKeysLen = pathsKeys.length;
    const modulesMap = new Map();
    for (let i = 0; i < pathsKeysLen; i++) {
      const item = pathsKeys[i];
      const itemAry = item.split('/');
      const pathsItem = paths[item];
      let fileName = itemAry[3];
      if (!fileName) continue;
      fileName = fileName.toLowerCase();
      // 创建模块文件
      isExist();
      // isExist(fileName) 创建模块目录
      // 完整路径
      pathsItem.allPath = item;
      if (modulesMap.has(fileName)) {
        const fileNameAry = modulesMap.get(fileName);
        fileNameAry.push(pathsItem);
        modulesMap.set(fileName, fileNameAry);
      } else {
        modulesMap.set(fileName, [pathsItem]);
      }
    }
    getModules(modulesMap);
  } catch (e) {
    console.log(e);
  }
};

gen();
