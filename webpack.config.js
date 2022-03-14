const path = require('path');

module.export = {
  mode: 'development',
  entry: ['./client/index.js'],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: 'build',
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js' 
  },
  
}
