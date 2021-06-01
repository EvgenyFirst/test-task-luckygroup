const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass');
const sync = require('browser-sync').create();
const csso = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');

const getCssMin = () => {
    return src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(concat('../css/style.min.css'))
        .pipe(dest('src'))
}

exports.getCssMin = getCssMin

// IndexHtmlMin
const getIndexHtmlMin = () => {
    return src('src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(concat('../index.html'))
        .pipe(dest('src'))
}

exports.getIndexHtmlMin = getIndexHtmlMin;

// AboutHtmlMin
const getAboutHtmlMin = () => {
    return src('src/about.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(concat('../about.html'))
        .pipe(dest('src'))
}

exports.getAboutHtmlMin = getAboutHtmlMin;

// Server
const runServer = done => {
    sync.init({
        server: {
            baseDir: "./"
        },
        notify: false,
    });

    watch('src/index.html', series(getIndexHtmlMin)).on('change', sync.reload)
    watch('src/about.html', series(getAboutHtmlMin)).on('change', sync.reload)
    watch('src/scss/**/*.scss', series(getCssMin)).on('change', sync.reload)
}

exports.runServer = runServer;

// Build
exports.start = series(getIndexHtmlMin, getAboutHtmlMin, getCssMin, runServer)
exports.server = series(runServer)
