var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: "./app/controllers/index.client.js",
  output: {
    path: __dirname + "/public",
    filename: "index.min.js"
  },
};