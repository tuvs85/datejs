const path = require('path');
const serve = require('rollup-plugin-serve');
const configList = require('./rollup.config');
const filesize = require('rollup-plugin-filesize');

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}
const PORT = 3000;


configList.map((config, index) => {

  config.output.sourcemap = true;

  if( index === 0 ) {
    config.plugins = [
      ...config.plugins,
      ...[
        filesize(),
        serve({
          port: PORT,
          contentBase: [resolveFile('')]
        })
      ]
    ]
  }

  return config;
})


module.exports = configList;
