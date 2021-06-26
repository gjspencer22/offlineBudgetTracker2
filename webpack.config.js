


// const WebpackPwaManifest = require("webpack-pwa-manifest");


// new WebpackPwaManifest({
//   name: "Budget Tracker",
//   short_name: "Tracker",
//   description: "A quick budget tracking app! Input amounts to keep track of your spending!",
//   start_url: "http://localhost:8080/",
//   background_color: "#3367D6",
//   theme_color: "##3367D6",
//   fingerprints: false,
//   inject: false,
//   icons: [{
//     src: path.resolve("public/icons/icon-512x512.png"),
//     sizes: [96, 128, 192, 256, 384, 512],
//     destination: path.join("assets", "icons")
//   }]
// })

module.exports = {
  entry: './public/js/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  mode: 'development'
};