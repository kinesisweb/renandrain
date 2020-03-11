const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	chainWebpack: config => {
		config.module
			.rule("eslint")
			.use("eslint-loader")
			.tap(options => {
				options.configFile = path.resolve(__dirname, ".eslintrc.js");
				return options;
			});
	},
	css: {
		loaderOptions: {
			postcss: {
				config: {
					path: __dirname
				}
			},
			scss: {
				prependData: `@import "@/scss/transitions.scss";`
			}
		}
	},
	outputDir: path.resolve(__dirname, "../client"),
	transpileDependencies: ["vuetify"],
	devServer: {
		proxy: {
			"/api": {
				target: "http://127.0.0.1:8080",
				secure: false,
				changeOrigin: true
			},
			"/static": {
				target: "http://127.0.0.1:8080",
				secure: false,
				changeOrigin: true
			}
		}
	},
	configureWebpack: {
		optimization: {
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						output: {
							beautify: false
						},
						compress: {
							drop_console: true
						}
					}
				})
			]
		}
	}
};
