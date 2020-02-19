const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        backgroundPage: path.join(__dirname, "src/backgroundPage.ts"),
        popup: path.join(__dirname, "src/popup/index.tsx"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "src/manifest.json", to: "../" },
            { from: "src/popup.html", to: "../" },
            { from: "src/icon.png", to: "../" },
        ]),
    ],
    output: {
        path: path.resolve(__dirname, "dist/js"),
        filename: "[name].js",
    },
};
