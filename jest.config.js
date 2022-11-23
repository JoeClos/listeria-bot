const {defaults} = require('jest-config');
/* @type {import('jest').Config} */
const config = {
    verbose: true,
    // transformIgnorePatterns: ['/node_modules/(?!(axios)/)'],
    // moduleNameMapper: {
    //     'axios': 'axios/dist/node/axios.cjs'
    //   },
  };
  
  module.exports = config;