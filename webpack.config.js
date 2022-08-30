const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        index: "./src/index.ts",
        main: "./src/app/main.ts",
    },
    output: {
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "manifest.json" }, { from: "./icons/*" }],
        }),
    ],
    resolve: {
        extensions: [".ts", ".js"],
    },
};
