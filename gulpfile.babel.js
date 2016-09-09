/*
 var gulp = require('gulp');
 var webpack = require('webpack-stream');
 var watch = require('gulp-watch');
 var batch = require('gulp-batch');
 var connect = require('gulp-connect');
 var copy = require('gulp-copy');

 // Run webpack
 gulp.task('webpack', function(){
 return gulp.src('src/main.js')
 .pipe(webpack( require('./build/webpack.dev.js') ))
 .pipe(gulp.dest('dist/js/'))
 .pipe(connect.reload());
 });

 // Run the webserver
 gulp.task('webserver', function() {
 connect.server({
 livereload: true,
 root: 'dist'
 });
 });

 // Copy index.html file
 gulp.task('build.index', function(){
 return gulp.src('./src/index.html')
 .pipe(gulp.dest('./dist'));
 });

 // Default task
 gulp.task('default', ['webpack', 'webserver', 'build.index']);
 */

const gulp = require('gulp'),
  gutil = require('gulp-util'),
  replace = require('gulp-replace'),
  zip = require('gulp-zip'),
  path = require('path'),
  del = require('del'),
  connect = require('gulp-connect'),
  colorsSupported = require('supports-color'),
  webpack = require('webpack'),
  portfinder = require('portfinder'),
  WebpackDevServer = require("webpack-dev-server");

let pkg = require('./package.json'),
  zipName = pkg.name + '.zip',
  isUseCDN = true,
  root = path.join(__dirname, 'dist'),
  dest = {},
  source = {
    nginx: path.join(__dirname, 'nginx.conf'),
    checkFile: path.join(__dirname, 'check.sh'),
    makefile: path.join(__dirname, 'Makefile'),
    package: path.join(__dirname, 'package.json')
  },
  config;

function getOSSUrl(name, env, version) {
  return isUseCDN ? `//carkey-cdn.oss-cn-hangzhou.aliyuncs.com/${name}/${env}/${version}` : '';
}

gulp.task('config', function () {
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'pro';
  }

  let env = process.env.NODE_ENV;
  let cdn_host = getOSSUrl(pkg['cdn-directory'], env, pkg.version);

  if (isUseCDN) {
    dest.dist = path.join(root, env);
    dest.app = path.join(dest.dist, pkg.version);
  } else {
    dest.app = root;
  }

  process.env.HOST = pkg.site_url[env];
  process.env.PORT = pkg.site_port[env];
  process.env.CDN_HOST = cdn_host;

  config = require('./build/webpack.prod.js');

  config.output.path = dest.app;
  config.output.publicPath = process.env.CDN_HOST;
});


gulp.task('webpack', ['clean', 'config'], function (cb) {
  webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError("webpack", err);
    }

    gutil.log(gutil.colors.magenta("[webpack]"), stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true
    }));

    cb();
  });
});

gulp.task('copy:others', function () {
  return gulp.src([
    source.package,
    source.makefile
  ]).pipe(gulp.dest(dest.dist));
});

gulp.task('copy:checkFile', function () {
  const env = process.env.NODE_ENV;

  return gulp.src(source.checkFile)
    .pipe(replace(/\{site_port\}/g, pkg.site_port[env]))
    .pipe(replace(/\{site_url\}/g, pkg.site_url[env]))
    .pipe(gulp.dest(dest.dist));
});

gulp.task('copy:nginx', function () {
  const env = process.env.NODE_ENV;

  return gulp.src(source.nginx)
    .pipe(replace(/\{app_name\}/g, pkg.name))
    .pipe(replace(/\{site_env\}/g, env))
    .pipe(replace(/\{site_version\}/g, pkg.version))
    .pipe(replace(/\{site_port\}/g, pkg.site_port[env]))
    .pipe(replace(/\{site_url\}/g, pkg.site_url[env]))
    .pipe(gulp.dest(dest.dist));
});

gulp.task('copy', ['copy:nginx', 'copy:checkFile', 'copy:others']);

gulp.task('build', ['webpack', 'copy'], function () {
  gulp.src(path.join(root, '**/*'))
    .pipe(zip(zipName))
    .pipe(gulp.dest('.'));
});

gulp.task('clean', function () {
  return del.sync([root, zipName]);
});

gulp.task('watch', function (cb) {
  process.env.CDN_HOST = '';

  // Start a webpack-dev-server
  var compiler = webpack(require('./build/webpack.dev'));

  var server = new WebpackDevServer(compiler, {
    stats: {
      colors: colorsSupported,
      chunks: false,
      modules: false
    },
    // server and middleware options
  });

  portfinder.getPort({
    port: pkg.site_port.dev
  }, function (err, port, host) {
    server.listen(port, host, function (err) {
      if (err) throw new gutil.PluginError("webpack-dev-server", err);
      // Server listening
      gutil.log(gutil.colors.magenta("[webpack-dev-server]"),
        gutil.colors.green.bold(`Server started at http://localhost:${port}`));

      // keep the server alive or continue?
      // callback();
    });
  });
});

gulp.task('dev', function () {
  isUseCDN = false;

  return gulp.start('webpack');
});

gulp.task('dev:server', ()=> {
  return connect.server({
    livereload: true,
    root: 'dist'
  });
});

gulp.task('default', ['dev']);
