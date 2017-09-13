"use strict";

var gulp = require("gulp");
var plugins = require("gulp-load-plugins")({
    pattern: ["gulp-*", "gulp.*", "main-bower-files", "del"],
    replaceString: /\bgulp[\-.]/
});

var dest = "assets/";
var bower_path = "./bower_components";

var sassPaths = [
    "bower_components/foundation-sites/scss",
    "bower_components/motion-ui/src"
];

var paths = {
    "styles": "src/scss/app.scss",
    "js": ["src/js/lib/particles.min.js","src/js/app.js"],
    "images": "src/images/**/*"
};

gulp.task("sass", function() {
    return gulp.src(paths.styles)
        .pipe(plugins.sass({
                includePaths: sassPaths,
                outputStyle: "compressed" // if css compressed **file size**
            })
            .on("error", plugins.sass.logError))
        .pipe(plugins.autoprefixer({
            browsers: ["last 2 versions", "ie >= 9"]
        }))
        .pipe(gulp.dest(dest + "css"))
        .pipe(plugins.notify({ message: "SASS task complete" }));
});

gulp.task("scripts", function() {
    var vendorFiles = plugins.mainBowerFiles("**/*.js", { base: bower_path });
    return gulp.src(vendorFiles.concat(paths.js))
        .pipe(plugins.jshint(".jshintrc"))
        .pipe(plugins.jshint.reporter("default"))
        .pipe(plugins.concat("main.js"))
        // .pipe(gulp.dest(dest + "js"))
        .pipe(plugins.rename({ suffix: ".min" }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dest + "js"))
        .pipe(plugins.notify({ message: "Scripts task complete" }));
});

gulp.task("images", function() {
    return gulp.src(paths.images)
        .pipe(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(dest + "img"))
        .pipe(plugins.notify({ message: "Images task complete" }));
});

gulp.task("copy-index-html", function() {
    gulp.src("./index.html")
        // Perform minification tasks, etc here
        .pipe(gulp.dest("./dist"))
        .pipe(plugins.notify({ message: "Copied index.html" }));
});

gulp.task("clean", function() {
    return plugins.del([dest + "css", dest + "js", dest + "img"]);
});

gulp.task("default", ["clean"], function() {
    gulp.start(["sass", "scripts", "images"]);
});

gulp.task("watch", function() {

    // Watch .scss files
    gulp.watch("src/scss/**/*.scss", ["sass"]);

    // Watch .js files
    gulp.watch("src/js/**/*.js", ["scripts"]);

    // Watch image files
    gulp.watch("src/images/**/*", ["images"]);
});

gulp.task("deploy", function() {
    return gulp.src("./dist/**/*")
        .pipe(plugins.ghPages());
});
