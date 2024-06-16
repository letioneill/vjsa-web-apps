var gulp = require('gulp'),
		path = require('path'),
		packageJSON = require('./package.json'),
		sassGlob = require('gulp-sass-glob'),
		sass = require('gulp-sass')(require('node-sass'));
		postcss = require('gulp-postcss'),
    cssnano = require('gulp-cssnano'),
		svgSprite = require('gulp-svg-sprite');

var source = {
	icon: 'src/icons/*',
  logo: 'src/logos/*'
};

var watch = {
	sass: 'src/css/**',
	icon: 'src/icons/*',
  logo: 'src/logos/*'
};


// Process, lint, and minify Sass files
gulp.task('sass', function () {

  return gulp.src(packageJSON.css)
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      require('postcss-pxtorem')({
        propList: [
          'font-size',
          'letter-spacing'
        ],
        replace: false
      }),
      require('autoprefixer')()
    ]))
    .pipe(cssnano({
      reduceIdents: {
        counter: false,
        keyframes: false,
      }
    }))
    .pipe(gulp.dest('./'))
});


gulp.task('s-icon', function() {

	return gulp.src(source.icon)
		.pipe(svgSprite({
			svg: {
				xmlDeclaration: false,
				doctypeDeclaration: false,
				namespaceIDs: false,
				dimensionAttributes: true
			},
			mode: {
				inline: true,
				symbol: {
					dest: 'i',
					sprite: 'icons.svg',
				}
			}
		}))
		.pipe(gulp.dest('.'));

});

gulp.task('s-logo', function() {

  return gulp.src(source.logo)
    .pipe(svgSprite({
      svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
        namespaceIDs: false,
        dimensionAttributes: true
      },
      mode: {
        inline: true,
        symbol: {
          dest: 'i',
          sprite: 'logos.svg',
        }
      }
    }))
    .pipe(gulp.dest('.'));

});


gulp.task('watch', function() {
	gulp.watch(watch.sass, gulp.series('sass'));
	gulp.watch(watch.icon, gulp.series('s-icon'));
  gulp.watch(watch.logo, gulp.series('s-logo'));
});
