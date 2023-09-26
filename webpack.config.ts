import path from "node:path";
import webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
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
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
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
        new CleanWebpackPlugin()

    ]
}

export default config;