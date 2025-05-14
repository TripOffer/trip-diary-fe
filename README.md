# Trip Diary Client README

## 项目介绍

Trip Diary 客户端是一个基于 React 和 Tauri 构建的跨平台旅游日记应用，旨在为用户提供一个便捷、高效的平台，用于记录和分享旅行经历。通过精心设计的用户界面和强大的功能支持，该应用不仅满足了用户在移动端发布和查看游记的需求，还为审核人员提供了高效的审核管理系统，确保平台内容的健康与安全。

## 功能特点

- **游记发布与管理**：用户可以轻松发布新游记，编辑已有游记，并查看游记的各项数据指标。支持一键发布、存入草稿箱、删除等功能，满足用户的多样化需求。
- **内容展示与交互**：游记详情页支持图片左右滑动查看、放大查看原图、视频全屏播放等功能，提升了用户查看游记的体验。同时，提供游记分享功能，支持分享到 QQ、微信等社交媒体，扩大内容传播范围。
- **用户登录与注册**：实现简单的用户名/密码登录注册功能，支持用户头像上传和昵称重复校验，确保用户信息的唯一性和完整性。
- **国际化支持**：通过 i18next + react-i18next 实现多语言支持和动态语言切换，为平台的国际化拓展奠定了基础。
- **性能优化**：
  - 瀑布流布局与虚拟滚动：游记列表采用瀑布流布局，支持动态调整内容缩放，适配不同设备屏幕。结合虚拟滚动技术，仅渲染当前视口内的日记项，有效减少 DOM 元素数量和内存占用。
  - 图片与视频处理：在前端对图片进行压缩处理，减少上传文件大小，并支持动态切图功能，以适配不同设备和屏幕形态下的图片展示需求。
  - KeepAliveOutlet 组件：赋予页面 KeepAlive 能力，实现内容缓存，显著加快页面二次打开的加载速度。

## 技术栈

- **框架与构建工具**：
  - React + TypeScript：使用 React 作为前端框架，结合 TypeScript 提供类型安全和代码可维护性，构建高效、可扩展的前端应用。
  - Vite：作为构建工具，提供快速的热模块更新（HMR）和高效的构建能力，显著提升开发效率。
  - Tauri：用于构建跨平台的原生应用，支持一次开发、多端部署，同时提供丰富的原生功能，如文件系统操作。
- **UI 组件与样式**：
  - TDesign Mobile React：作为主要的 UI 组件库，提供丰富的移动端组件，支持响应式设计，满足项目中各种界面需求。
  - Tailwind CSS：采用原子化 CSS 框架，通过预定义的类名实现快速样式开发，减少自定义 CSS 编写，提升开发效率。
  - SCSS：用于编写模块化样式，通过变量系统和嵌套规则实现组件样式隔离，便于维护和扩展。
  - Iconify：集成按需加载的 SVG 图标库，支持超过 4 万种图标，优化前端资源加载，提升性能。
- **数据交互与状态管理**：
  - Axios：封装 HTTP 请求，支持请求/响应拦截、错误处理和取消请求，确保数据交互的稳定性和灵活性。
  - React Router v7：实现声明式路由管理，支持路由懒加载和权限控制，优化应用的加载性能和用户体验。
  - Zustand：轻量级状态管理库，基于 hooks API 简化状态访问，解决组件间通信问题，提升状态管理的效率。
- **国际化**：
  - i18next + react-i18next：用于实现多语言支持，支持动态语言切换，确保应用在不同地区具有良好的用户体验。
- **数据处理与功能增强**：
  - Browser Image Compression：在前端对图片进行压缩处理，减少上传文件大小，提升上传速度和应用性能。
  - Day.js：轻量级的日期处理库，用于处理日期和时间，支持多种日期格式化和操作，提升开发效率。
- **动画与交互**：
  - Framer Motion：用于实现复杂的动画效果，支持动画的链式调用和交互式动画，增强应用的视觉效果和用户体验。
- **开发工具与规范**：
  - ESLint + Prettier：用于代码规范和格式化，确保代码风格一致，提升代码质量。
  - TypeScript：提供静态类型检查，减少运行时错误，提升代码的可维护性和可扩展性。
  - Vite 插件：
    - @vitejs/plugin-react：支持 React 项目开发，提供高效的开发服务器和构建优化。
    - @vitejs/plugin-react-swc：使用 SWC 提升构建速度，优化开发体验。

## 项目结构

```
trip-diary-fe/
├── docs/                        # 接口文档
├── public/                      # 静态资源目录
├── scripts/                     # 脚本文件
├── src/
│   ├── assets/                  # 图片、图标等资源
│   ├── components/              # 可复用组件
│   ├── hooks/                   # 自定义 hooks
│   ├── locales/                 # 国际化资源
│   ├── mock/                    # mock 数据
│   ├── pages/                   # 页面组件
│   ├── routes/                  # 路由配置
│   ├── service/                 # API 请求封装及工具
│   │   ├── api/
│   │   └── utils/
│   ├── store/                   # 状态管理
│   ├── styles/                  # 样式文件
│   ├── types/                   # 类型定义
│   ├── utils/                   # 工具函数
│   ├── App.tsx                  # 应用入口
│   ├── index.css                # 全局样式
│   ├── main.tsx                 # 主入口文件
│   ├── vite-env.d.ts            # Vite 环境变量声明
│   └── vite.config.ts           # Vite 配置文件
├── src-tauri/                   # Tauri 配置与原生代码
├── .eslintrc.cjs                # ESLint 配置
├── .prettierrc                  # Prettier 配置
├── .gitignore                   # Git 忽略文件
├── index.html                   # HTML 模板
├── LICENSE                      # 许可证
├── package.json                 # 项目依赖
├── pnpm-lock.yaml               # pnpm 锁定文件
├── README.md                    # 项目说明
├── tsconfig.json                # TypeScript 配置
├── tsconfig.node.json           # Node.js 环境下的 TypeScript 配置
└── vite.config.ts               # Vite 配置文件
```

## 开发环境搭建

1. **安装 Node.js 和 pnpm**：确保你已经安装了 Node.js 和 pnpm。推荐使用 [nvm](https://github.com/nvm-sh/nvm) 来管理 Node.js 版本。
2. **克隆项目仓库**：
   ```bash
   git clone https://github.com/TripOffer/trip-diary-fe.git
   cd trip-diary-fe
   ```
3. **安装项目依赖**：
   ```bash
   npm install
   ```
4. **启动开发服务器**：
   ```bash
   npm run dev
   ```
   项目将在 [http://localhost:1420](http://localhost:1420) 启动，你可以通过浏览器访问。

## 构建与打包

1. **构建生产环境**：
   ```bash
   pnpm run build
   ```
   构建完成后，生成的文件将位于 `dist` 目录中。
2. **打包为原生应用**：
   ```bash
   pnpm run tauri android build
   ```
   打包完成后，生成的原生应用将位于 `src-tauri/gen/android/app/build/outputs/apk/universal/release/` 目录中。

## 国际化支持

项目支持多语言，通过 `i18next` 和 `react-i18next` 实现。你可以通过以下方式切换语言：

```tsx
import { useTranslation } from 'react-i18next';

const { t, i18n } = useTranslation();

// 切换语言
i18n.changeLanguage('en'); // 切换到英文
i18n.changeLanguage('zh'); // 切换到中文
```

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. **Fork 仓库**：点击右上角的 Fork 按钮，将仓库 fork 到你的 GitHub 账号。
2. **创建分支**：在你的 fork 仓库中创建一个新的分支：
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **提交代码**：在你的分支上进行开发，并提交代码：
   ```bash
   git add .
   git commit -m "Add your feature"
   ```
4. **创建 Pull Request**：将你的分支推送到你的 fork 仓库，并创建一个 Pull Request 到主仓库的 `dev` 分支。

## 问题反馈

如果你在使用过程中遇到任何问题，欢迎通过 [GitHub Issues](https://github.com/TripOffer/trip-diary-fe/issues) 提交问题。
