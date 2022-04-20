var gulp = require('gulp');
var browser = require('browser-sync');
var cp = require('child_process');

var port = process.env.SERVER_PORT || 8080;

gulp.task('build', gulp.series(function(callback) {
  var opts = ['build']
  var jekyll = cp.spawn('jekyll', opts, { stdio: 'inherit' })
  return jekyll.on('close', callback)
}))

gulp.task('browser', gulp.series('build', function() {
  browser.init({ server: './_site', port: port })
}))

gulp.task('browser:reload', gulp.series('build', function() {
  browser.reload()
}))

gulp.task('watch', function() {
  const list = [
    '*.css',
    '*.html',
    '_config.yml',
    '_data/*.yml',
    '_includes/*.html',
    '_layouts/*.html',
    '_posts/*.md'
  ]
  gulp.watch(list, gulp.series('build', 'browser:reload'))
})

gulp.task('default', gulp.series('browser', 'watch'))
