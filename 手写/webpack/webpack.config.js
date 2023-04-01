const path = require('path');
const HTMLplugin = require('html-webpack-plugin');
module.exports = {
	mode: 'production', //development
	entry: './src/index.js', //打包时的入口文件，默认为/src/index.js  另外的入口文件书写方式：{m1:'./src/m1.js,m2:'./src/m2.js} ['./src/m1.js','./src/m2.js']
	output: {
		path: path.resolve(__dirname, 'hello'), //指定打包路径，需要时绝对路径
		filename: 'main.js', //打包后的文件名   [name]多个入口可以指定变量名进行命名 [id],[hash]
		clean: true, //是否自动清理目录
	},
	//loader webpack默认只处理js文件，想要处理其他类型文件需要使用loader
	module: {
		rules: [
			{ test: /\.css$/i, use: ['style-loader', 'css-loader'] }, //匹配css结尾的文件,用cssloader进行解析,有顺序要求，从右往左
			{ test: /\.jpg$/i, type: 'asset/resource' }, //图片直接资源类型的数据，指定type处理
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/, //排除其中的文件
				use: {
					//详细配置需要使用加载器
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			}, //babel预设配置
		],
	},
	plugins: [
		new HTMLplugin({
			title: 'hello webpack',
		}),
	],
	devtool: 'inline-source-map',
};
