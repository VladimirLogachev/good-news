/**
 * This config is designed to suit all kind of build tasks.
 * Target-specific values should be set in .env files
 */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const dotenvSafe = require('dotenv-safe');
const basicConfigFactory = require('./webpack.config.js');

const buildConfig = env => {
  const basicConfig = basicConfigFactory(env);
  const parsedEnv = dotenvSafe.config({
    path: `./src/environments/.env.${env.ENVIRONMENT}`,
    example: './src/environments/.env.example',
    allowEmptyValues: true
  }).parsed;

  return {
    ...basicConfig,
    mode: 'production',
    output: {
      path: path.join(__dirname, parsedEnv.BUILD_DIRECTORY),
      filename: 'bundle.js',
      publicPath: parsedEnv.PUBLIC_PATH
    },
    plugins: [...basicConfig.plugins, new CleanWebpackPlugin([parsedEnv.BUILD_DIRECTORY])]
  };
};

module.exports = buildConfig;
