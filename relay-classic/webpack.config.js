import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-notifier'
import path from 'path'
import webpack from 'webpack'

const { NODE_ENV, PORT } = process.env

export default {
  devtool: '#cheap-inline-source-map',

  entry: {
    artworks: [
      'webpack-hot-middleware/client',
      './src/apps/artworks/client'
    ]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: '.babel-cache'
        }
      }
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: '/assets'
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`[App] Listening on http://localhost:${PORT} \n`]
      }
    }),
    new ProgressBarPlugin(),
    new WebpackNotifierPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'METAPHYSICS_BASE_URL': JSON.stringify('https://metaphysics-staging.artsy.net'),
        'NODE_ENV': JSON.stringify(NODE_ENV)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'src',
      'node_modules'
    ]
  }
}
