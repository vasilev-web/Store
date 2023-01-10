import Merge from 'webpack-merge';
import CommonConfig from './webpack.common.js';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

module.exports = function() {
    return Merge(CommonConfig, {
        mode: 'development',
        watch: true,
        output: {
            filename: 'js/[name].js'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[contenthash].css',
                chunkFilename: '[contenthash].css'
            }),
        ]
    })
};
