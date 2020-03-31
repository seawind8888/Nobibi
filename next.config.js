/* eslint-disable */
const withLess = require('@zeit/next-less');
const lessToJS = require('less-vars-to-js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const fs = require('fs');
const path = require('path');
const withCSS = require('@zeit/next-css');
const { DefinePlugin } = require('webpack');
const withTypescript = require('@zeit/next-typescript');
const { parsed } = require('dotenv').config();
const { BASE_URL } = parsed;
// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8'),
);

const isDev = process.env.NODE_ENV !== 'production';

// fix antd bug in dev development
const devAntd = '@import "~antd/dist/antd.less";\n';
const stylesData = fs.readFileSync(
  path.resolve(__dirname, './assets/_styles.less'),
  'utf-8',
);
fs.writeFileSync(
  path.resolve(__dirname, './assets/self-styles.less'),
  isDev ? `${devAntd}${stylesData}` : stylesData,
  'utf-8',
);

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

module.exports = withTypescript(
  withLess(
    withCSS({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
        localIdentName: '[local]___[hash:base64:5]',
      },

      webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
        if (!dev) {
          config.plugins.push(
            ...[
              new BundleAnalyzerPlugin({
                analyzerMode: 'disabled',
                // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
                generateStatsFile: true,
                // Will be available at `.next/stats.json`
                statsFilename: 'stats.json',
              }),
              // 代替uglyJsPlugin
              new TerserPlugin({
                terserOptions: {
                  ecma: 6,
                  warnings: false,
                  extractComments: false, // remove comment
                  compress: {
                    drop_console: true, // remove console
                  },
                  ie8: false,
                },
              }),
              new DefinePlugin({
                'process.env': {
                  BASE_URL: JSON.stringify(BASE_URL),
                },
              }),
            ],
          );
          config.devtool = 'source-map';
        } else {
          config.module.rules.push({
            test: /\.js$/,
            enforce: 'pre',
            include: [
              path.resolve('components'),
              path.resolve('pages'),
              path.resolve('utils'),
              path.resolve('constants'),
              path.resolve('redux'),
              path.resolve('containers'),
            ],
            options: {
              configFile: path.resolve('.eslintrc'),
              eslint: {
                configFile: path.resolve(__dirname, '.eslintrc'),
              },
            },
            loader: 'eslint-loader',
          });
          config.plugins.push(
            ...[
              new DefinePlugin({
                'process.env': {
                  BASE_URL: JSON.stringify('http://localhost:3001'),
                },
              }),
            ],
          );

          config.devtool = 'cheap-module-inline-source-map';
        }
        return config;
      },

      webpackDevMiddleware: config => {
        // Perform customizations to webpack dev middleware config
        // console.log(config, '@@')
        // Important: return the modified config
        return config;
      },
      serverRuntimeConfig: {
        // Will only be available on the server side
        rootDir: path.join(__dirname, './'),
        PORT: isDev ? 3006 : process.env.PORT || 3006,
      },
      publicRuntimeConfig: {
        // Will be available on both server and client
        staticFolder: '/static',
        isDev, // Pass through env variables
      },
    }),
  ),
);
