const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const homeConfigs = {
  mode: "development",
  entry: './src/home.js',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      //use: "babel-loader"
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  output: {
    filename: 'home.js',
    path: path.resolve(__dirname, 'public')
  }
};

const userConfigs = {
  mode: "development",
  entry: './src/user/user.js',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' 
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
      test: /\.(js|jsx)$/,
      //use: "babel-loader"
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin()
  ],
  output: {
    filename: 'user.js',
    path: path.resolve(__dirname, 'views/users/dist')
  }
};




module.exports = [homeConfigs,userConfigs];