const path = require('path');
const { babel } = require('@rollup/plugin-babel');
const { uglify } = require("rollup-plugin-uglify");

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

const babelOptions = {
  "presets": ['@babel/preset-env'],
}
module.exports = [
  {
    input: resolveFile('src/index.js'),
    output: {
      file: resolveFile('lib/datejs.js'),
      format: 'umd',
      name: 'dateJs',
      amd: {
        id: 'lib/dateJs'
      },
    },
    plugins: [
      babel(babelOptions),
      uglify()
    ],
  },

]
