const preset = require("babel-preset-react-app");

module.exports = Object.assign({}, preset, {
  plugins: [
    "@babel/plugin-external-helpers",
    "babel-plugin-lodash",
    ...preset.plugins
  ]
});
