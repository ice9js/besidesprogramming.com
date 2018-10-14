var path = require( 'path' );
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );

var APP_DIR = path.resolve( __dirname, 'client' );
var ASSETS_DIR = path.resolve( __dirname, 'assets' );
var BUILD_DIR = path.resolve( __dirname, 'build' );

var isProd = process.argv.indexOf( '-p' ) !== -1;
var shouldMinify = isProd;

var extractTextPlugin = new ExtractTextPlugin( 'css/styles.min.css' );

var config = {
	name: 'besidesprogramming',
	entry: {
		styles: ASSETS_DIR + '/stylesheets/styles.scss',
		app: APP_DIR + '/index.jsx',
	},
	output: {
		filename: 'js/[name].js',
		path: BUILD_DIR,
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: APP_DIR,
				loader: 'babel-loader'
			},
			{
				test: /stylesheets\/styles\.scss$/,
				loader: extractTextPlugin.extract( {
					fallback: 'style-loader',
					publicPath: '/',
					use: [
						{ loader: 'css-loader', options: { url: false, minimize: true } },
						'sass-loader',
					],
				} )
			}
		]
	},
	resolve: {
		extensions: [ '.json', '.js', '.jsx' ],
		modules: [ APP_DIR, ASSETS_DIR, path.resolve( __dirname, 'node_modules' ) ]
	},
	plugins: [
		extractTextPlugin,
	]
};

if ( shouldMinify ) {
	config.plugins.push( new UglifyJsPlugin( {
		parallel: true,
		uglifyOptions: { ecma: 5 },
		sourceMap: true,
	} ) );
}

if ( ! isProd ) {
	config.devServer = {
		host: '0.0.0.0',
		port: 3000,
		disableHostCheck: true,
		contentBase: [ ASSETS_DIR + '/public' ]
	};

	config.plugins.push(
		new HtmlWebpackPlugin( {
			template: ASSETS_DIR + '/public/index.html',
			inject: 'body',
		} )
	);
}

module.exports = config;
