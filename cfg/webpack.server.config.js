const path = require("path");
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	target: 'node',
	mode: 'development',
	entry: path.resolve(__dirname, '../src/server/index.js'),
	output: {
		path: path.resolve(__dirname, '../build/server'),
		filename: 'index.js'
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{from: path.resolve(__dirname, "../src/server/views"), to: path.resolve(__dirname, "../build/server/views")},
			],
		}),
	],
	externals: [nodeExternals()],
}