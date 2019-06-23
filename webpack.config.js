const path = require('path');

const nodeExternals = require('webpack-node-externals');

module.exports = env => ({
  entry: './index.ts',
  context: path.join(__dirname, 'src'),
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  devtool: 'source-map',
  externals: [nodeExternals()],
  target: 'node',
  resolve: {
    extensions: ['.ts']
  },
  plugins: [],
  module: {
    rules: [
      { test: /\.ts(x?)$/, use: 'ts-loader' /*, exclude: '/node_modules/' */ },
      { test: /\.graphql$/, use: 'raw-loader' }
    ]
  }
});