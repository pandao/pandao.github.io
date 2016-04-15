/*
 * moder.js v0.1.0
 *
 * @file        moder.js 
 * @description Front-end AMD/CMD/CommonJS Module (locale) Loader. 
 * @license     MIT License
 * @author      Pandao
 * {@link       https://github.com/pandao/moder.js}
 * @updateTime  2016-04-15
 */

(function(window) {
    // 避免重复加载而导致已定义模块丢失
    if (window.require) {
        return ;
    }
    
    /**
     * 判断对象是否为函数
     * 
     * @param  {Mixed}   fn   判断对象
     * @return {Boolean} bool 返回一个布尔值
     */

    function isFunction(fn) {
        return (typeof fn === "function");
    }
    
    /**
     * 判断对象是否为字符串
     * 
     * @param  {Mixed}   str   判断对象
     * @return {Boolean} bool  返回一个布尔值
     */

    function isString(str) {
        return (typeof str === "string");
    }
    
    /**
     * 获取模块（别）名
     * 
     * @param  {String}  id    模块 ID
     * @return {String}  str   返回别名
     */

    function alias(id) {
        return id.replace(/\.js$/i, '');
    }
    
    /**
     * 判断是否为 JS 文件
     * 
     * @param  {String}   url   模块 URL 地址
     * @return {Boolean}  bool  返回一个布尔值
     */

    function isJSFile(url) {
        return /\.js$/.test(url);
    }
    
    /**
     * 判断是否为 CSS 文件
     * 
     * @param  {String}   url   模块 URL 地址
     * @return {Boolean}  bool  返回一个布尔值
     */

    function isCSSFile(url) {
        return /\.css$/.test(url);
    }
    
    var ext       = ".js",
        logPrefix = '[Moder.js]',
        head      = document.getElementsByTagName('head')[0],
        // 资源集合对象
        map       = {
            css     : {},
            pkg     : {},
            res     : {},
            deps    : {},
            factory : {},
            modules : {},
            loading : {},
            scripts : {}
        };

    /**
     * 通过 Ajax 或 LocalStorage 加载，获取模块文件内容
     * 
     * @param  {String}    id        模块 ID
     * @param  {String}    url       模块文件地址
     * @param  {Function}  callback  加载完成后的回调处理函数
     * @return {Void}      void      无返回值
     */ 

    function ajaxLoader(id, url, callback) {
        
        if (map.scripts[url]) return ;
        
        if (!(url in map.scripts))  {
            map.scripts[url] = true;
        }
        
        var store   = window.localStorage,
            content = store.getItem(url);

        if (content) {
            if (!store.getItem(id)) {
                store.setItem(id, url);
            }

            callback(content);
        } else {
            var xhr = new XMLHttpRequest();

            xhr.addEventListener("load", function() {
                if (xhr.status === 200) {
                    var oldURL = store.getItem(id);

                    if (oldURL) {
                        store.removeItem(oldURL);
                    }

                    content = xhr.responseText;
                    store.setItem(url, content);
                    store.setItem(id, url);

                    callback(content);
                } else {
                    throw new Error(logPrefix + ' _load() `' + url + '` not found.');
                }
            }, false);

            xhr.open('get', url);
            xhr.send(null);
        }
    }

    /**
     * 模块文件加载器
     * 
     * @param  {String}    id        模块 ID
     * @param  {Function}  callback  加载完成后的回调处理函数
     * @param  {Function}  onerror   加载失败或错误后的回调处理函数
     * @return {Void}      void      无返回值
     */ 

    function loader(id, callback, onerror) {
        var url,
            queue = map.loading[id] || (map.loading[id] = [])
            res   = map.res[id]     || map.res[id + ext]      || {},
            pkg   = res.pkg;

        queue.push(callback);

        if (pkg) {
            url = map.pkg[pkg].url   || map.pkg[pkg].uri;
        } else {
            url = res.url || res.uri || id;
        }

        // 没有扩展名时加上 .js，并约定 CSS 文件必须加上 .css 扩展名
        if (!isJSFile(url) && !isCSSFile(url)) {
            url += ext;
        }
        
        if (require.saveToLocalStorage) {
            ajaxLoader(id, url, function(content) {
                if (isCSSFile(url)) {
                    if (map.css[url]) return ;

                    map.css[url] = true;
                
                    loadCSS({content : content});

                    return ;
                }

                script = document.createElement('script');
                script.type = 'text/javascript';
                script.setAttribute("data-module", id);
                script.innerHTML = content;
                head.appendChild(script);
            });
        } else {
            if (isCSSFile(url)) {
                loadCSS({url : url});
                return ;
            }

            loadScript(url, onerror && function () {
                onerror(id);
            });
        }
    }

    /**
     * 加载脚本文件
     * 
     * @param  {String}      url       模块文件 URL
     * @param  {Function}    onerror   加载失败或错误后的回调处理函数
     * @return {HTMLElement} script    返回 Script 元素对象
     */ 

    function loadScript(url, onerror) {
        if (url in map.scripts) {
            return ;
        }

        map.scripts[url] = true;

        var script = document.createElement('script');

        if (onerror) {
            var tid = setTimeout(onerror, require.timeout);

            script.onerror = function () {
                clearTimeout(tid);
                onerror();
            };

            var onload = function () {
                clearTimeout(tid);
            };

            if ('onload' in script) {
                script.onload = onload;
            } else {
                script.onreadystatechange = function () {
                    if (this.readyState === 'loaded' || this.readyState === 'complete') {
                        onload();
                    }
                };
            }
        }
        
        script.type = 'text/javascript';
        script.src  = url;
        head.appendChild(script);

        return script;
    }

    /**
     * 加载 CSS 样式文件
     * 
     * @param  {Object}    config    加载配置
     * @return {Void}      void      无返回值
     */ 

    function loadCSS(config) {
        if (config.content) {
            var style  = document.createElement('style');
            style.type = 'text/css';

            if (style.styleSheet) { // IE
                style.styleSheet.cssText = config.content;
            } else {
                style.innerHTML = config.content;
            }

            head.appendChild(style);
        } else if (config.url) {
            if (map.css[config.url]) return ;

            map.css[config.url] = true;

            var link = document.createElement('link');
            link.href = config.url;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        }
    }
    
    /**
     * 模块定义方法
     * 
     * @param  {String}    id        模块 ID
     * @param  {Function}  factory   实现模块的闭包函数
     * @return {Void}      void      无返回值
     */

    function define(id, factory) {
        id = alias(id);
        map.factory[id] = factory;

        var queue = map.loading[id];

        if (queue) {
            for (var i = 0, n = queue.length; i < n; i++) {
                queue[i]();
            }

            delete map.loading[id];
        }
    }
    
    /**
     * 请求模块方法
     * 
     * @param  {String|Array}    id        请求的模块 ID 或模块 ID 数组
     * @return {Mixed}           mixed     返回模块
     */
    
    function require(id) {
        if (id && id.join) {
            return require.async.apply(this, arguments);
        }

        id = alias(id);

        var module = map.modules[id];

        if (module) {
            return module.exports;
        }

        var factory = map.factory[id];

        if (!factory) {
            throw new Error(logPrefix + ' Cannot find module `' + id + '`');
        }

        module = map.modules[id] = {
            exports: {}
        };

        var m = isFunction(factory) ? factory.apply(module, [require, module.exports, module]) : factory;

        return m ? m : module.exports;
    }
    
    /**
     * 同步请求模块方法
     * 
     * @param  {String|Array}    modules   请求的模块 ID 或模块 ID 数组
     * @param  {Function}        onload    加载成功后的回调处理函数
     * @param  {Function}        onerror   加载失败或出错后的回调处理函数
     * @return {Mixed}           mixed     返回模块
     */
    
    require.async = function (modules, onload, onerror) {
        onload = onload || function() {};

        if (isString(modules)) {
            modules = [modules];
        }

        var needMap = {}, needNum = 0;

        function findNeed(depArr) {
            var child;

            for (var i = 0, n = depArr.length; i < n; i++) {
                var dep = alias(depArr[i]);

                if (dep in needMap) {
                    continue;
                }

                if (dep in map.factory) {
                    child = map.res[dep] || map.res[dep + ext];

                    if (child && 'deps' in child) {
                        findNeed(child.deps);
                    }

                    continue;
                }

                needMap[dep] = true;
                needNum++;
                loader(dep, updateNeed, onerror);

                child = map.res[dep] || map.res[dep + ext];

                if (child && 'deps' in child) {
                    findNeed(child.deps);
                }
            }
        }

        function updateNeed() {
            if (0 === needNum--) {
                var args = [];

                for (var i = 0, n = modules.length; i < n; i++) {
                    args[i] = require(modules[i]);
                }

                onload && onload.apply(window, args);
            }
        }

        findNeed(modules);
        updateNeed();
    };
    
    /**
     * 定义模块 Map 方法
     * 
     * @param  {String|Object}   obj     模块 Map 键值对对象或 JSON String
     * @return {Void}            void    无返回值
     */

    require.map = function (obj) {
        var key, col;
        
        if (isString(obj)) {
            obj = JSON.parse(obj);
        }

        col = obj.res;

        for (key in col) {
            if (col.hasOwnProperty(key)) {
                map.res[key] = col[key];
            }
        }

        col = obj.pkg;

        for (key in col) {
            if (col.hasOwnProperty(key)) {
                map.pkg[key] = col[key];
            }
        }
    };

    /**
     * Ajax 请求超时时间，单位毫秒
     */

    require.timeout = 5000;
    
    /**
     * require.async 方法别名
     */ 

    require.load = require.async;
    
    /**
     * 模块加载器
     */ 

    require.loader = loader;
    
    /**
     * CSS 样式文件加载方法
     */

    require.loadCSS = loadCSS;
    
    /**
     * Ajax + LocalStorage 加载方法
     */ 

    require.ajaxLoader = ajaxLoader;
    
    /**
     * 加载脚本文件方法
     */ 

    require.loadScript = loadScript;
    
    /**
     * 是否使用本地存储模块内容
     */ 

    require.saveToLocalStorage = true;
    
    window.require             = require;
    window.define              = define;
})(this);