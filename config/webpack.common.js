import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

import getEntries from './getEntries';

export default {
    entry: path.resolve(__dirname, '../src/'),
    output: {
        path: path.resolve('public'),
        publicPath: '/',
        filename: 'js/[name].js'
    },
    devServer: {
        port: 4003,
        historyApiFallback: true,
    },
    resolve: {
        extensions: [ '*', '.ts', '.tsx', '.js', '.scss', '.json' ],
        modules: [ 'node_modules' ],
        plugins: [ new TsconfigPathsPlugin() ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(ts|tsx)$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        allowTsInNodeModules: true,
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: {
                                localIdentName: '[local]'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [ require('autoprefixer')() ]
                            }
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {}
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                includePaths: ["./src/kit/styles","./src/"],
                            },
                            additionalData: `
                                @use "./src/kit/styles/config" as *;
                            `
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?hash=sha512&name=img/[name]-[contenthash].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                enabled: false,
                                progressive: false
                            },
                            optipng: {
                                enabled: false
                            },
                            pngquant: {
                                enabled: false,
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                enabled: false,
                                interlaced: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader:
                            'file-loader?name=fonts/[name]-[contenthash].[ext]'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, '../src/index.html'),
            chunks: ["main"]
        }),
    ],
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            minSize: 30000,
            chunks: 'all',
            maxInitialRequests: 4,
            cacheGroups: {
                default: false,
                vendors: {
                    minChunks: 2
                },
                common: {
                    chunks: 'all',
                    name: 'common-main',
                    test: 'app',
                    priority: 10
                }
            }
        }
    }
};
