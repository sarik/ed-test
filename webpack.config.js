const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		main: 'src/portal.js',
	},
	output: {
		publicPath: '',
		filename: '[name].js',
		path: path.resolve(__dirname, 'release'),
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: [path.resolve(__dirname, 'node_modules')],
				loader: 'babel-loader',
			},
			{
		        test: /\.css$/i,
		        use: ['style-loader', 'css-loader'],
		    }
		],
	},
	node: {
		fs: 'empty'
	},
	resolve: {
		modules: [
			__dirname,
			'node_modules',
		],
	},
	plugins: [
        new CopyWebpackPlugin([
            {from: path.resolve(__dirname, 'src/index.html')},
            {from: path.resolve(__dirname, 'libs/system.js')},
            {from: path.resolve(__dirname, 'src/assets')},
        ]),
		new CleanWebpackPlugin(['release']),
		new webpack.ProvidePlugin({
		    IntlMessageFormat: ['intl-messageformat', 'default'],
		})
	],
	devtool: 'source-map',
	externals: [
	],
    mode: 'development',
    devServer: {
		contentBase: './release',
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
		// Proxy config for development purposes. In production, you would configure you webserver to do something similar.
        proxy: {
            "/attendance": {
                target: "http://localhost:8234",
                pathRewrite: {"^/attendance" : ""}
            },
            "/account": {
                target: "http://localhost:8235",
                pathRewrite: {"^/account" : ""}
            },
             "/home": {
                target: "http://localhost:8236",
                pathRewrite: {"^/home" : ""}
            },
             "/discover": {
                target: "http://localhost:8237",
                pathRewrite: {"^/discover" : ""}
            },
             "/video": {
                target: "http://localhost:8238",
                pathRewrite: {"^/video" : ""}
            },
             "/reset-password": {
                target: "http://localhost:8239",
                pathRewrite: {"^/reset-password" : ""}
            }
        }
    }
};
