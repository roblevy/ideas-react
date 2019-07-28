const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
          use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};
