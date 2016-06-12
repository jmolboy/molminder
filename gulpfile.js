var gulp = require('gulp');

// var requireDir = require('require-dir');
// var dir = requireDir('./tasks');

var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css');

var paths = {
    js: [ 
        'client.js',
		'main.js'
    ],
	css:[
	
	],
	img:[
	],
    html: [
        'index.html'
    ],
    lib: { // 第三方依赖文件
        js: [
			'bower_components/jquery/dist/jquery.js',
			'bower_components/bootstrap/dist/js/bootstrap.js',
			'bower_components/angular/angular.js',
			'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
			'bower_components/codemirror/lib/codemirror.js',
			'bower_components/codemirror/mode/xml/xml.js',
			'bower_components/codemirror/mode/javascript/javascript.js',
			'bower_components/codemirror/mode/css/css.js',
			'bower_components/codemirror/mode/htmlmixed/htmlmixed.js',
			'bower_components/codemirror/mode/markdown/markdown.js',
			'bower_components/codemirror/addon/mode/overlay.js',
			'bower_components/codemirror/mode/gfm/gfm.js',
			'bower_components/angular-ui-codemirror/ui-codemirror.js',
			'bower_components/marked/lib/marked.js',
			'bower_components/kity/dist/kity.min.js',
			'bower_components/hotbox/hotbox.js',
			'bower_components/json-diff/json-diff.js',
			'bower_components/kityminder-core/dist/kityminder.core.min.js',
			'bower_components/color-picker/dist/color-picker.js',
			'bower_components/kityminder-editor/dist/kityminder.editor.js'
        ],
        css: [
			'bower_components/bootstrap/dist/css/bootstrap.css',
			'bower_components/codemirror/lib/codemirror.css',
			'bower_components/hotbox/hotbox.css',
			'bower_components/kityminder-core/dist/kityminder.core.css',
			'bower_components/color-picker/dist/color-picker.css',
			'bower_components/kityminder-editor/dist/kityminder.editor.css'
        ],
        img: [
            'bower_components/kityminder-editor/dist/images/*'
        ],
		'fonts': [
			'bower_components/bootstrap/dist/fonts/*',
		]
    }
};



var output = "lib"; // output 
var buildoutput=__dirname;
/* develop */
gulp.task('develop', function() {
    gulp.src(paths.js)
        .pipe(gulp.dest(output + '/js'));
        
    gulp.src(paths.lib.js)
        .pipe(gulp.dest(output + '/js'));

    gulp.src(paths.css)
        .pipe(gulp.dest(output + '/css'));
        
    gulp.src(paths.lib.css)
        .pipe(gulp.dest(output + '/css'));

    gulp.src(paths.img)
        .pipe(gulp.dest(output + '/images')); 
        
    gulp.src(paths.lib.img)
        .pipe(gulp.dest(output + '/css/images/'));
		
    gulp.src(paths.lib.fonts)
        .pipe(gulp.dest(output + '/fonts'));	
		
});

var dist=__dirname+'/dist';
/* release */
gulp.task('release', function() {		 
    gulp.src('index.html')
        .pipe(useref())
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest(dist));

    gulp.src(paths.lib.img)
        .pipe(gulp.dest(dist + '/css/images/'));

    gulp.src(paths.lib.fonts)
        .pipe(gulp.dest(dist + '/fonts'));
		
    gulp.src('main.js')	
		.pipe(gulp.dest(dist));
		
    gulp.src('package.json')	
		.pipe(gulp.dest(dist));	
});


