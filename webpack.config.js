const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const mode = process.env.MODE || 'development';
const nodemon = process.env.NODEMON;

module.exports = () => {
    const config = {
        entry: ['./src/app.ts'],
        mode,
        target: 'node',
        devtool: mode === 'development' ? 'inline-source-map' : false,
        node: {
            console: false,
            global: false,
            process: false,
            Buffer: false,
            __filename: false,
            __dirname: false
        },
        externals: [nodeExternals()],
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: ['node_modules', 'src']
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new CopyPlugin([
                {from: 'src/public', to: 'public'},
                {from: 'src/views', to: 'views'},
            ])
        ]
    };

    if (nodemon) {
        console.log(`This is ${mode} mode with nodemon`);
        config.watch = true;
        config.plugins.push(new NodemonPlugin({
            execMap: {
                // Set method to launch js code by nodemon.
                // This way node will launch dotenv config
                // and set environment variables from .env file before running app
                js: 'node -r dotenv/config'
            }
        }));
    }

    return config;
};
