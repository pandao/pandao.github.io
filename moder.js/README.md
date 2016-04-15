# moder.js

Front-end AMD/CMD/CommonJS Module (locale) Loader. 

前端（AMD/CMD/CommonJS）（本地）模块加载解决方案

### 简介

- 基于 [https://github.com/fex-team/mod](https://github.com/fex-team/mod) 改造；
- 通过结合 Ajax + LocalStorage 本地存储避免重复请求模块资源；
- 配合 Gulp 插件 [gulp-moder](https://github.com/pandao/gulp-moder) 实现自动生成模块 Map，避免引入整个 [Fis](https://github.com/fex-team/fis) 架构；
- 支持模块包和加载 CSS 模块文件；
- 特别适用于移动端项目；

### 使用方法

1、设置模块资源地图

```javascript
/**
 * 设置模块资源 Map
 * 
 * @param  {Key/Value Object|JSON String} map   模块地图键值对对象或 JSON String
 * @return {Void}                         void  无返回值
 */

require.map({
    // 模块资源列表，注意每个模块都应该定义
    res: {
        '模块A': {
            url : '模块文件地址', // 必须定义 URL，跨域请求需要服务器支持配置
            deps:  ['依赖模块1', '依赖模块2', ...]
        },
        '模块B': {
            url : '模块文件地址',
            deps:  ['依赖模块1', '依赖模块2', ...]
        },
        // CSS 模块文件
        'css/test' : {
            url : 'css/test.css', // CSS 必须加上扩展名 .css
            deps: ['css/dep']     // CSS 模块定义依赖无效
        },
        '包A模块1': {
            pkg: '包名A', // 所属包
            deps:  ['依赖模块1', '依赖模块2', ...]
        }
        //...
    },
    // 包模块列表
    pkg: {
        '包名A': {
            url: '合并打包后的包文件地址，即一个文件里有多个 define',
            deps:  ['依赖模块1', '依赖模块2', ...]
        }
    }
});
```

2、使用某个模块

```javascript
// 同步请求
// require.async 另外 require.load
require.async(['模块A'], function(mod) {
    console.log(mod);
});

// 模块文件内使用
define("模块名", function(require, exports, module){
    var mod = require('某个依赖模块');
    
    module.exports = {
        a : 23456
    };
});
```

3、相关配置

```javascript
// 不使用本地存储
require.saveToLocalStorage = false; // 默认为 true
```

> **本地存储后如何动态更新？**
> 只要模块文件的 URL 有变动，就会自动更新本地存储。所以每个模块都要定义 URL。

### 辅助构建工具

Gulp 插件 [gulp-moder](https://github.com/pandao/gulp-moder)

### 参考项目

感谢 [https://github.com/fex-team/mod](https://github.com/fex-team/mod) 项目的工作。

### Changes

[更新日志](https://github.com/pandao/moder.js/blob/master/CHANGE.md)

### License

The [MIT](https://github.com/pandao/moder.js/blob/master/LICENSE) License.