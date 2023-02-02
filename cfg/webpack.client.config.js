const path = require("path");
const {HotModuleReplacementPlugin} = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const {NODE_ENV} = process.env;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

const APP_ENTRY = path.resolve(__dirname, '../src/client/index.js');
const WEBPACK_HOT_ENTRY = 'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr';

module.exports = {
	mode: NODE_ENV,
	entry: IS_DEV ? [APP_ENTRY, WEBPACK_HOT_ENTRY] : APP_ENTRY,
	output: {
		path: path.resolve(__dirname, '../build/client'),
		publicPath: '/static/',
		filename: 'index.js',
		assetModuleFilename: 'assets/images/[name][ext]'
	},
	plugins: [
		IS_DEV && new HotModuleReplacementPlugin(),
		IS_PROD && new ImageMinimizerPlugin({
			minimizer: {
				implementation: ImageMinimizerPlugin.imageminMinify,
				options: {
					plugins: [['mozjpeg', {quality: 50}], 'imagemin-svgo']
				}
			}
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/main.css'
		}),
	].filter(Boolean),
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.(svg|png|jpg|jpeg)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(woff|woff2)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'assets/fonts/[name][ext]'
				}
			}
		]
	},
	devtool: IS_DEV ? 'eval' : false,
	stats: 'errors-only',
}