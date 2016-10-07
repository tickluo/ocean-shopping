const path = require('path');

const config = {
  env: process.env.ENV || process.env.NODE_ENV || 'development',
  /*url: 'http://172.20.6.229:9889',
  localhost: 'http://172.20.6.226:3000',*/
  localhost: 'http://120.55.189.228:10030',
  custom_service_url: 'http://kefu.easemob.com/webim/im.html?tenantId=3305',
  tenantId: 3305,
  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_cli: 'src',
  dir_dist: 'dist',
};

/************************************************
 -------------------------------------------------
 All Internal Configuration Below
 Edit at Your Own Risk
 -------------------------------------------------
 ************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
};

// ------------------------------------
// Utilities
// ------------------------------------
/*const resolve = path.resolve
 const base = (...args) =>
 Reflect.apply(resolve, null, [config.path_base, ...args]);

 config.utils_paths = {
 base: base,
 client: base.bind(null, config.dir_client),
 dist: base.bind(null, config.dir_dist),
 };*/

module.exports = config;
