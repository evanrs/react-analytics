const preset = require('babel-preset-react-app');


module.exports = Object.assign({}, preset, {
    plugins: [
        'lodash',
        'external-helpers',
        ...preset.plugins,
    ]
})
