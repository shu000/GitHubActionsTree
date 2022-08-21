const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./src/main.ts",
    output: {
        filename: "main.js",
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
            patterns: [{ from: "manifest.json" }, { from: "index.js" }],
        }),
    ],
    resolve: {
        extensions: [".ts", ".js"],
    },
};
