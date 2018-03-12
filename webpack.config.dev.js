import webpack from 'webpack';
import path from 'path';

const SOURCE_PATH = path.resolve(__dirname, 'src');
const OUTPUT_PATH = path.resolve(__dirname, 'dist');
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  'global.IS_BROWSER': true
};
export default {
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    './src/index'
  ],
  target: 'web',
  output: {
    path: OUTPUT_PATH, // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './src'
  },
  plugins: [
    new webpack.DefinePlugin({'process.env.API_HOST': process.env.API_HOST}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel']
      },
      {
        test: /.jsx?$/, loader: 'babel-loader', exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'es2017'],
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread',
            'transform-decorators-legacy',
            'transform-react-jsx',
            'transform-runtime'
          ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {test: /(\.css)$/, loaders: ['style', 'css']},

      {test: /\.(eot||png||jpg||jpeg||ttf||ico)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.gif$/, loader: 'file?name=[name].[ext]'},
      {
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap'
      }

    ]
  }
};
