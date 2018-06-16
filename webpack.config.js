const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    index: [path.join(__dirname, '/web/index.js')],
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                return 'images/[name].[ext]';
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'web')],
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  {
                    targets: {
                      browsers: ['last 2 versions', 'safari >= 7']
                    }
                  }
                ],
                'react',
                'stage-2'
              ],
              plugins: ['babel-plugin-transform-object-rest-spread'],
              babelrc: false
            }
          }
        ]
      }
    ]
  }
}

/* const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// the path(s) that should be cleaned
let pathsToClean = [
  'assets/dist/*.*',
  'assets/dist/main.bundle.js.map',
  'build/*.*'
];

module.exports = {
  // entry: ['babel-polyfill', './web/component.js'],
  entry: {
    main: './web/component.js'
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: '[name].bundle.js'
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              name(file) {
                return 'images/[name].[ext]';
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'web')],
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  {
                    targets: {
                      browsers: ['last 2 versions', 'safari >= 7']
                    }
                  }
                ],
                'react',
                'stage-2'
              ],
              plugins: ['babel-plugin-transform-object-rest-spread'],
              babelrc: false
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    alias: {
      leaflet_search:
        __dirname + '/node_modules/leaflet-search/dist/leaflet-search.min.js',
      leaflet_search_css:
        __dirname + '/node_modules/leaflet-search/dist/leaflet-search.min.css',
      marker_cluster_css:
        __dirname +
        '/node_modules/leaflet.markercluster/dist/MarkerCluster.css',
      marker_cluster_default_css:
        __dirname +
        '/node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css',
      leaflet_css: __dirname + '/node_modules/leaflet/dist/leaflet.css'
    }
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    new HtmlWebpackPlugin({
      inlineSource: '(main.bundle.js)',
      template: './web/leafletReact.html',
      inject: 'body'
    }),
    new HtmlWebpackInlineSourcePlugin()
  ]
};
 */