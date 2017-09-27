/* babel-loader 配置 */
const process = require('process');

function output(env){
  switch(env){
    case 'development': // 开发环境
      return true;
    case 'production':  // 生产环境
      return false;
  }
}

// 根据当前环境配置debug
// development
// production
const env = process.env.NODE_ENV;
const debug = output(env);

module.exports = {
  path: 'babel-loader',
  query: {
    cacheDirectory: true,
    presets: [
      [
        'env',
        {
          targets: {
            ie: 11,
            edge: 12,
            chrome: 40,
            firefox: 40
          },
          debug: debug,
          modules: false,
          useBuiltIns: 'usage',
          uglify: false
        }
      ],
      'flow',
      'react'
    ],
    plugins: [
      'transform-decorators',
      'transform-object-rest-spread',
      [
        'import',
        {
          'libraryName': 'antd',
          'style': 'css'
        }
      ]
    ]
  }
};