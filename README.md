<h1 align="center">Nobibi</h1>

简体中文 | [English](./README_en.md)

> Nobibi 是一款轻量级开源社区，快速搭建属于自己的社区

> 已更新问 ts 版本，原 js 版本请访问：https://github.com/seawind8888/Nobibi/tree/js

## 关于 Nobibi

- Nobibi 是一款轻量级开源社区，包含前后台
- 前台考虑 SEO 使用 [next.js](https://github.com/zeit/next.js) + antd 服务端渲结构
- 后台系统基于[Ant Design Pro](https://pro.ant.design/index-cn)(react + dvajs + umijs)搭建开发
- 后端接口为 koa+moogoose

## 快速开始

> 保证已启动 api 项目[Nobibi-api](https://github.com/seawind8888/Nobibi-api)

1. Clone 项目

```
git clone https://github.com/seawind8888/Nobibi my-project
```

2. 安装依赖

```
cd my-porject
npm install 或 yarn
```

3. 运行项目

```
npm run start
```

## 相关项目

- [Nobibi-api](https://github.com/seawind8888/Nobibi-api) - Nobibi 后台接口
- [Nobibi-admin](https://github.com/seawind8888/Nobibi-admin) - Nobibi 管理后台
- Nobibi-taro - Nobibi 小程序（待开发）
- Nobibi-nuxt - （待开发）

## 示例项目

请移步：[http://47.244.103.124:3006/](http://47.244.103.124:3006/)

## 效果演示

- 前台
  ![image](/screenshot/screenshot1.png)
  ![image](/screenshot/screenshot2.png)
  ![image](/screenshot/screenshot3.png)
- 管理后台
  ![image](/screenshot/demo.gif)

## 项目部署

> 保证已启动 api 项目[Nobibi-api](https://github.com/seawind8888/Nobibi-api)

1. 修改.env 文件下配置

```
BASE_URL=http://yourapihost:port // 你的api的host地址
```

2. 将项目除去 node_modules 压缩，上传到服务器

```
windows&mac有异同，请自行百度或科学Goo
```

3. 在服务器项目目录下运行

```
npm run build && npm run start:pm2
```

## 技术选型

![image](/screenshot/Nobibi-structure.png)

## 目录结构

```lua
ant-cms-admin
├── api/
│ ├── index.js/         # 接口部分
├── assets/             # less目录
├── components/         # 组件目录
├── constatns/
│ ├── ActionTypes.js/   # redux-sage action-type
│ ├── ConstTypes.js/    # next 页面title 配置
│ └── CustomTheme.js    # 主题样式配置
├── pages               # 主页面
│ ├── _app.js/          # App根组件自定义
│ ├── _document.js/     # document组件自定义
├── redux               # redux目录
├── static              # 静态资源引用目录
├── .editorconfig       # 编辑器配置
├── .eslintrc           # ESlint配置
├── .gitignore          # Git忽略文件配置
├── .prettierignore     # Prettier忽略文件配置
├── .prettierrc         # Prettier配置
├── next.config.js      # next配置
├── pm2.config.js       # pm2配置
├── server              # next服务配置
```

## 功能模块

- [x] 注册
- [x] 登录（持久化）
- [x] 修改密码
- [x] 修改资料
- [x] 发布主题
- [x] 评论主题
- [x] 频道切换
- [x] 点赞
- [x] 响应式布局
- [x] 收藏
- [x] 分享（待开发）
- [x] 积分（待开发）
