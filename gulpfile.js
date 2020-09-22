var gulp = require('gulp');
var browserSync = require('browser-sync');
var cp = require('child_process');

var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn(jekyll, ['build'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

gulp.task('browser-sync', ['jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

gulp.task('watch', function () {
  const list = [
    '*.css',
    '*.html',
    '_config.yml',
    '_data/*.yml',
    '_includes/*.html',
    '_layouts/*.html',
    '_posts/*.md'
  ];
  gulp.watch(list, ['jekyll-rebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);
