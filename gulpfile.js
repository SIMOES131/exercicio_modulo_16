const gulp = require('gulp'); // Estamos importando o gulp

const sass = require('gulp-sass')(require('sass')); //Aqui fizemo uma importação do gulp sass e do pacote do sass. A primeira integra o sass com o gulp e quem faz a compilação é o segundo pacote.

const sourcemaps = require('gulp-sourcemaps');

const uglify =require('gulp-uglify'); //comprime js

const obfuscate = require('gulp-obfuscate');     // para ocutar o código

const imagemin = require('gulp-imagemin');   // para comprimir imagens 


function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles'));
}


exports.default = function() {
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImagens));
}

exports.images = comprimeImagens;