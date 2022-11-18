# winkey-cli 一个vite的脚手架

## 轻量化脚手架，简单上手，便捷开发

### 安装
- npm i winkey-cli -g 

### 执行命令
- winkey dev (path)
  本地执行

- winkey build (path)
  打包

- winkey init (path)
  初始化项目

- winkey list
  查看所有命令

- winkey list --seeds | -s 
  查看所有seeds包

- winkey update
  更新seeds包

- winkey install (seeds包名称可带版本号)
  直接安装seed包

### 包类型
- vite-project 项目模板

- vite-component 组件模板

- vite-qiankun 微前端qiankun子应用模板

### winkey.config 配置
```
/** 根目录 */
root?: string
/** 项目名称 */
name?: string
/** 项目工具 */
workflow: 'vite'
/** 项目环境 */
platform?: 'pc' | 'mobile'
/** 版本号 */
version?: string
/** 是否使用yarn */
yarn?: boolean
/**  */
cacheDir?: string
/** 打包配置 */
dest?: {
  /** 是否采用默认方式,开启这个，下面几个配置均无效 */
  default?: boolean
  /** 基础路径 */
  basePath?: string
  /** js文件路径 */
  jsPath?: string
  /** css文件路径 */
  cssPath?: string
  /** html文件路径 */
  htmlPath?: string
  /** 图片文件路径 */
  imagesPath?: string
  /** manifast文件路径 */
  revPath?: string
}
/** alias 配置 */
alias?:
  | {
      /** 根目录 */
      srcRoot?: string
    }
  | {
      find: string
      replacement: string
    }[]
/** 服务端开发 */
server?: {
  /** 本地开发端口号 */
  port?: number
  /** 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。 */
  strictPort?: boolean
  /** 需要一个合法可用的证书。 */
  https?: boolean
  /** 在开发服务器启动时自动在浏览器中打开应用程序。 */
  open?: string | boolean
  /** 为开发服务器配置 CORS。 */
  cors?: boolean | CorsOptions
  /** 指定服务器响应的 header。 */
  headers?: OutgoingHttpHeaders
  /** 禁用或配置 HMR 连接（用于 HMR websocket 必须使用不同的 http 服务器地址的情况）。 */
  hmr?:
    | boolean
    | {
        protocol?: string
        host?: string
        port?: number
        path?: string
        timeout?: number
        overlay?: boolean
        clientPort?: number
        server?: Server
      }
  /** 传递给 chokidar 的文件系统监听器选项。 */
  watch?: WatchOptions
}
/** 是否启用样式模块化 */
cssModules?: boolean
/** 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息 */
clearScreen?: boolean
/** 小于此阈值的导入或引用资源将内联为 base64 编码 */
limitSize?: number
/** 输出目录 */
outDir?: string
/** 自定义插件 */
plugins?: PluginOption[]
/** 自定义css */
css?: CSSOptions
/** 是否启用小助手 */
winkeyTool?: boolean
/** 是否是qiankun */
qiankun?: 'child'
```