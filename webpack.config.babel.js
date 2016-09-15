import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const webpackConfig = {
  entry: {
    index: './app/index'
  },
  output: {
    path: path.resolve(__dirname, '__build__'),
    publicPath: '__build__/',
    filename: 'bundle.[hash].js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.[hash].js'
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './app/index_template.ejs',
      title: 'React Modal'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, exclude: /flexboxgrid/, loader: 'style!css' },
      { test: /\.css$/, include: /flexboxgrid/, loader: 'style!css?modules' },
      { test: /\.png$/, loader: 'url?limit=13000' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)$/, loader: 'url?limit=8192'}
    ]
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));
}

module.exports = webpackConfig
