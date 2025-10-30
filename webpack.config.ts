import path from "path";
import { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";

const config: Configuration = {
    entry: "./src/server.ts",
    target: "node",
    mode: process.env.NODE_ENV === "production" ? "production" : "development",

    externals: [nodeExternals()],

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true
                        }
                    }
                ],
                exclude: /node_modules/
            },
        ],
    },

    resolve: {
        extensions: [".ts", ".js", ".json"],
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "server.js",
        clean: true,
    },

    // Better debugging support
    devtool: process.env.NODE_ENV === "production" ? false : "source-map",
};

export default config;