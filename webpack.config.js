var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'script!jquery/dist/jquery.min.js',
        './app/app.jsx'
    ],
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery'
        })
    ],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        root: __dirname,
        modulesDirectories: [
            'node_modules',
            './app/components',
            './app/api'
        ],
        alias: {
            App: 'app/',
            Main: 'app/components/Main.jsx',
            AppCss: 'app/styles/app.scss',
            reducers: 'app/reducers',
            actions: 'app/actions',
            configureStore: 'app/store/configureStore'

        },
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // loader: "url?limit=10000"
                loader: "url"
              },
              {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                loader: 'file'
              },
        ]
    },
    devtool: 'inline-source-map'
};
