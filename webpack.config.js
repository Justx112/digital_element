const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const sourcePath = (filePath) => path.resolve(__dirname, 'src', ...filePath);

module.exports = {
  entry: sourcePath(['scripts', 'controller.js']),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: sourcePath(['index.html']),
  }),
  new ESLintPlugin({}),
  new StylelintPlugin({}),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: ['src/'],
    compress: true,
  },
};
