const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const dotenvSafe = require('dotenv-safe');

module.exports = env => {
  const parsedEnv = dotenvSafe.config({
    path: `./src/environments/.env.${env.ENVIRONMENT}`,
    example: './src/environments/.env.example',
    allowEmptyValues: true
  }).parsed;

  // map values to strings
  const envKeys = Object.keys(parsedEnv).reduce(
    (acc, v) => ({ ...acc, [`process.env.${v}`]: JSON.stringify(parsedEnv[v]) }),
    {}
  );

  return {
    entry: './src/index.tsx',
    mode: 'development',
    plugins: [new HtmlWebpackPlugin({ title: 'Good News' }), new DefinePlugin(envKeys)],
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
};
