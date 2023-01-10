import Merge from 'webpack-merge';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import cssnano from 'cssnano';
import CommonConfig from './webpack.common.js';
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

module.exports = function() {
    return Merge(CommonConfig, {
        mode: 'production',
        performance: {
            hints: false
        },
        optimization: {
            minimize: true,
            minimizer: [
                new OptimizeCSSAssetsPlugin({
                    cssProcessor: cssnano,
                    cssProcessorOptions: {
                        map: {
                            inline: false
                        }
                    }
                }),
                new TerserPlugin({
                    extractComments: false
                })
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[name]-[contenthash].css',
                chunkFilename: 'css/[name]-[contenthash].css'
            }),
            new CleanWebpackPlugin(),
            new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
                openAnalyzer: false,
                analyzerMode: 'static'
            }),
        ]
    })
};
