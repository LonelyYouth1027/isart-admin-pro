# isart-admin-pro

> 本模板参考 arco pro 需要掌握 vite + vue3 + arco design + ts + es2015+ 详细内容请参考 https://arco.design/vue/docs/start

### 开始使用

```bash
# clone the project
git clone https://gitee.com/qrqy/isart-admin-pro.git

# enter the project directory
cd isart-admin-pro

# 没有pnpm请先安装 npm install -g pnpm

# install dependency
pnpm install

# develop
pnpm run dev

# 小tips: 这里推荐使用pnpm管理工具和webstorm编辑器
# 注: 作者node版本为14.19.1 node版本>=14.18均可 推荐使用14.19.1
# 安装失败请删除根目录pnpm-lock.yaml文件然后重新安装
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

### 框架组件

在`components/pro`的目录下，目前封装了 model-form、pro-from 和 search-form，简化了铺页面的过程，大部分的 crud 的页面，可以通过配置 config.ts 来实现

之所以在当前框架中，自己封装了一下的好处是有一定的扩展性，因为之前也有小伙伴推荐过`Avue`之类的框架，思路其实是一样的，但是由于是 NPM 安装包的模式，导致如果需要修改的话，是没法操作的

所以我们自己实现了一些简化的通用组件，如果组件不满足你的需求，你可以在项目中调整

### 工具脚本

2023 年 3 月，TerryQi 在宋岳明的思路上，开发了综合工具平台，主要解决如何根据后端的 Swagger 文档生成 ts 的 api 接口调用文件。

[综合工具平台](http://tools-web.admin.wlone6.isart.me/#/apiTool)

[TeamBlog 说明](https://teamblog.isart.me/paas/tools/)

### 打包构建

```bash
# build for develop environment
yarn build:stag

# build for production environment
yarn build:prod

# 小tips: 请分别到 .env.development 和 .env.production文件 修改 VITE_API_BASE_URL
```

### git 提交

> 本模板使用 commitlint + husky 提交规范 详细内容请参考 https://blog.csdn.net/m0_67401134/article/details/123420687

先取消了 Husky 的提交前校验，目前规则给的太死，提交报错，等稍后我们再探讨

```bash
# 例子
git add .

git commit -m 'ci: 持续化集成'

git push -u origin 'master'

# 提交类型 ci表示持续化集成 fix表示bug修复
```

### mock 模拟

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

##### 好用的话建议点个 star 哦~
