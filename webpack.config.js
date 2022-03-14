const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

module.exports = {
  mode: mode,
  entry: {
    main: './src/index.js',
  },
  devtool: 'source-map',
  // здесь описаны настройки для разработки
  devServer: {
    open: true,
    hot: true,
    port: 'auto',
    static: {
        directory: './src',
        watch: true,
    },
  },
  // здесь описывается 
  plugins: [
    new MiniCSSExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HTMLWebpackPlugin({
      template: "./src/index.pug"
    }),
  ],
  // здесь описываются последовательность для обработки файлов разных расширений
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader", 
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          (mode === 'development') ? "style-loader" : MiniCSSExtractPlugin.loader,
          "css-loader",
          { loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          },
          "sass-loader",
        ]
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },

      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /(node_modules|bower_components)/,
      },

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  // здесь выходные файлы (весь проект автоматически собирается в папку dist)
  output: {
    filename: 'bundle.[contenthash].js',
    assetModuleFilename: "assets/[name][ext]",
    clean: false,
  }
}