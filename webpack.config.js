var webpack = require('webpack');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        './app/root.js'
    ],
    output: {
        // 这里如果用./dist，npm start会报错， throw new Error("`output.path` needs to be an absolute path or `/`.");
        // path: './dist',
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 3030
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style!css'
            },
            {
                test: /\.less/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    }
}