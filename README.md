# isart-admin-pro

> 本模板参考 arco pro 需要掌握vite + vue3 + arco design + ts + es2015+ 详细内容请参考 https://arco.design/vue/docs/start

### 开始使用

```bash
# clone the project
git clone https://gitee.com/qrqy/isart-admin-pro.git

# enter the project directory
cd isart-admin-pro

# 没有yarn请先安装 npm install -g yarn

# install dependency
yarn

# develop
yran dev

# 小tips: 这里推荐使用yarn管理工具和webstorm编辑器
# 注: 作者node版本为14.19.1 node版本>=14.18均可 推荐使用14.19.1
# 安装失败请删除根目录yarn.lock文件然后重新安装 
```

### 目录结构

```bash
├── README.md
├── package.json
├── index.html
├── logo.ico
├── .eslintrc.js # eslint 配置
├── .prettierrc.js # prettierrc 配置
├── .stylelintrc.js # stylelintrc 配置 
├── .env.development # 开发 or 测试 环境配置
├── .env.production # 生产环境配置
├── apigen.js # apigen 生成接口请求脚本文件(可自定义)
├── config # 打包构建配置
├── src
│   ├── api  # 请求接口
│   ├── assets  # 静态资源
│          └── style 全局样式
│   ├── components  # 通用业务组件
│   ├── config  # 全局配置(包含echarts主题)
│          └── settings.json  # 配置文件
│   ├── directives # 指令集（如需，可自行补充）
│   ├── filters # 过滤器（如需，可自行补充）
│   ├── hooks # 全局hooks
│   ├── layout  # 布局
│   ├── locale  # 国际化语言包
│   ├── mock  # 模拟数据
│   ├── views  # 页面模板
│   ├── router # 路由配置
│   ├── store  # 状态管理中心
│   ├── types  # Typescript 类型
│   └── utils  # 工具库
│   └── App.vue  # 视图入口
│   └── main.ts  # 入口文件
└── tsconfig.json
```

### 工具脚本

```bash
# 生成ts请求文件
yarn api

# 对typescript语法进行类型检查
yarn type:check

# 小tips: 请务必保证规范书写ts语法，否则会影响打包
```

### 打包构建

```bash
# build for develop environment
yarn build:stag

# build for production environment
yarn build:prod

# 小tips: 请分别到 .env.development 和 .env.production文件 修改 VITE_API_BASE_URL
```

### git提交

> 本模板使用 commitlint + husky 提交规范 详细内容请参考 https://blog.csdn.net/m0_67401134/article/details/123420687

```bash
# 例子
git add .

git commit -m 'ci: 持续化集成'

git push -u origin 'master'

# 提交类型 ci表示持续化集成 fix表示bug修复
```

### mock模拟

```bash
# 注: 未接接口之前，所有数据均为mock数据 在调接口时需要关闭mock模拟

# 在mock目录下的user.ts中的setupMock函数传入的对象中加上 mock: false
setupMock({
  mock: false,
})
```

### 规范约束

```bash
# 本模板使用eslint,stylelint,prettier 来进行语法约束，请务必遵守哦~
```

### 写在最后

##### 有什么好的建议请联系作者 songyueming@yisa.art

##### 好用的话建议点个star哦~



