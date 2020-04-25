const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
module.exports = {
    publicPath: "./",
    // 输出文件目录
    outputDir: 'dist',
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        port: 8000,
        host: "localhost",
        https: false,
        // open:true,
        proxy: { //开发环境配置
            [process.env.VUE_APP_BASE_API]: {
                //目标服务器地址
                target: process.env.VUE_APP_SERVICE_URL,
                changeOrigin: true, //开启代理服务器
                pathRewrite: {
                    //将请求地址 /dev-api替换为空的
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
    },
    configureWebpack: config => {
        const plugins = [];
        // Begin 生成 gzip 压缩文件
        plugins.push(
            new CompressionWebpackPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: productionGzipExtensions,
                threshold: 10240,
                minRatio: 0.8,
            })
        );
        config.plugins = [...config.plugins, ...plugins];
    },
    css: {
        loaderOptions: {
            stylus: {
                'resolve url': true,
                'import': [
                    './src/theme'
                ]
            }
        }
    },
    pluginOptions: {
        'cube-ui': {
            postCompile: true,
            theme: true
        },
    },
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }
}