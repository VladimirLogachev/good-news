const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  plugins: [new HtmlWebpackPlugin({ title: 'Good News' })],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      { test: /\.(t|j)sx?$/, use: { loader: 'awesome-typescript-loader' } },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: /node_modules/
      }
    ]
  }
};
