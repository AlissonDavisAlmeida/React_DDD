import path from "node:path";
import webpack, { WebpackPluginInstance } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import Dotenv from "dotenv-webpack";
import "webpack-dev-server";

const config: webpack.Configuration = {
    mode: "development",
    entry: "./src/main/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public/js"),
        publicPath: "/public/js/",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".scss"],
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ["style-loader", {
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                }, "sass-loader"],
            }
        ]
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "public"),
        },
        compress: true,
        port: 9000,
        client: {
            progress: true
        },
        historyApiFallback: true,
        devMiddleware: {
            writeToDisk: true
        }
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },  
    plugins: [
        new CleanWebpackPlugin(),
        new Dotenv() as unknown as WebpackPluginInstance
    ]
}

export default config;