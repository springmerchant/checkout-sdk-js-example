module.exports = {
    entry: [
        './src/index.jsx',
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use:  [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    output: {
        libraryTarget: "umd"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
