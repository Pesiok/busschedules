module.exports = {
    entry: {
        App: __dirname + "/app/assets/scripts/app.js"
    },
    output: {
        path: __dirname + "/app/temp/scripts",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['latest']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}