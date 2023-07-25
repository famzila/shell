const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, "tsconfig.json"), [
    /* mapped paths to share */
]);

module.exports = {
    output: {
        uniqueName: "shell",
        publicPath: "auto",
    },
    optimization: {
        runtimeChunk: false,
    },
    resolve: {
        alias: {
            ...sharedMappings.getAliases(),
        },
    },
    experiments: {
        outputModule: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            library: { type: "module" },

            // For hosts (please adjust)
            remotes: {
                mfe1: "mfe1@https://mfe1-famzila.vercel.app/remoteEntry.js",
                mfe2: "mfe2@https://mfe2-famzila.vercel.app/remoteEntry.js",
            },

            shared: share({
                "@angular/core": {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: "auto",
                },
                "@angular/common": {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: "auto",
                },
                "@angular/common/http": {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: "auto",
                },
                "@angular/router": {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: "auto",
                },
                "@ngx-translate/core": {
                    singleton: false,
                    strictVersion: true,
                    requiredVersion: "auto",
                },
                "@ngx-translate/http-loader": {
                    singleton: false,
                    strictVersion: true,
                    requiredVersion: "auto",
                },
                "@ngx-translate/core": {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: "auto",
                },
                "@ngx-translate/http-loader": {
                    singleton: true,
                    strictVersion: true,
                    requiredVersion: "auto",
                },

                ...sharedMappings.getDescriptors(),
            }),
        }),
        sharedMappings.getPlugin(),
    ],
};
