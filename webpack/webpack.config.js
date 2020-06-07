module.exports = {

    mode: 'development',

    entry: './src/index.js',

    module: {

        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },
        ]
        
    }

}