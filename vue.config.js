//path common.js
const path = require('path')
// console.log('项目的决定路径',__dirname)
// console.log('项目中某个目录的绝对路径',path.resolve(__dirname,'./src/components'))

module.exports  = {
	lintOnSave: false,//是否开启语法检测
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true,
		// 开启 CSS source maps?
		sourceMap: true,
		// css预设器配置项
		loaderOptions: {
            scss: {
                prependData: `@import "./src/styles/main.scss";`
            }
		},
	},
	//配置目录的别名
	configureWebpack: (config) => {
		config.resolve = {
			extensions:['.js','.json','.vue'],//引入文件的时候不写后缀名 默认加载文件类型
			alias:{
				"@c":path.resolve(__dirname,'./src/components'),//绝对路径
				"@p":path.resolve(__dirname,'./src/public'),
				"@a":path.resolve(__dirname,'./src/assets'),
				vue$:"vue/dist/vue.esm.js"
			}
		}
	  },
}