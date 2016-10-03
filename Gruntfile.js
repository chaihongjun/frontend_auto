	    //   1. 原始html,CSS,JS和图片分别在html,css,js,img目录内
	    //   2. 如果有多个JS/CSS，则合并之后仍然分别在JS，CSS目录
	    //   3. 如果只有单一JS/CSS，则分别压缩之后在opt_js,opt_css目录里
	    //   4.优化后的图片在opt_img里面
	    //   5.压缩后的html文件在opt_html里面
	    module.exports = function(grunt) {
	        'use strict';
	        require('time-grunt')(grunt);
	        // do whatever you want with the stats


	        // be sure to let grunt know when to exit


	        // var mozjpeg = require('imagemin-mozjpeg');
	        grunt.initConfig({
	            /************       CSS文件处理     ************/
	            /*****    检查 CSS 语法  ****/
	            csslint: {
	                options: {
	                    'import': true, //不允许使用'@import'
	                    'underscore-property-hack': true, //不允许使用— 如_width: 200px;
	                    'adjoining-classes': true, //不允许两个类相连
	                    'box-sizing': false, //不允许使用box-sizing。Internet Explorer 6和7不支持
	                    'box-model': false, //不允许使用box-model
	                    'compatible-vendor-prefixes': false, //必须添加前缀
	                    'vendor-prefix': true, //检查标准属性是否是在最后 -moz-border-radius: 5px; border-radius: 5px
	                    'duplicate-properties': true, //不允许重复的属性
	                    'empty-rules': true, //不允许空标签
	                    'known-properties': true, //不允许错误的属性，但是忽略带供应商的前缀-moz-foo: bar;的属性值
	                    'outline-none': true, //不允许使用outline:none   
	                    'qualified-headings': true, //h1-h6 前不允许被其他的标签包含 
	                    'regex-selectors': true, //不允许选择器看起来像正则表达式
	                    'shorthand': true, //需要简写属性
	                    'text-indent': true, //text-indent的值不能是负数
	                    'unique-headings': true, //标题只能定义一次
	                    'unqualified-attributes': true, //不允许不合格的属性选择器
	                    'zero-units': true, //不允许值为0加单位  
	                    'overqualified-elements': true, //不允许权重过高的元素
	                    'floats': true, //不要使用太多的浮动
	                    'font-sizes': true, //不要过多的设置字体大小
	                    'font-faces': true, // 不要使用太多的web字体
	                    'display-property-grouping': true, //检查同一个元素下有冲突的属性，比如行内元素，不用设置高宽
	                    'bulletproof-font-face': true, //使用 @font-face的时候要在第一个字体url后添加?#iefix
	                    'duplicate-background-images': true, //不允许使用重复的背景图
	                    'fallback-colors': true, //需要回退颜色 回退应该总是在新的颜色,确保旧浏览器看到并正确地使用它,并且更新浏览器继续使用新的颜色格式。
	                    'star-property-hack': true, //不要使用过多的*
	                    'ids': true, //尽量不使用id选择器
	                    'order-alphabetical': false, //按字母顺序排序
	                    'gradients': false, //   要求所有梯度定义
	                    'important': true, //不允许使用important
	                    'universal-selector': true // 不允许通用选择器* 

	                },
	                src: ['html/*.css']
	            },
	            /****    清理无用 CSS    ****/
	            uncss: {
	                dist: {
	                    files: [
	                        { src: 'html/index.html', dest: 'opt_html/tidy.css' }
	                    ]
	                },
	                options: {
	                    report: 'min'
	                }
	            },
	            /****     压缩 CSS    ****/
	            cssmin: {
	                options: {
	                    report: 'gzip',
	                    keepSpecialComments: 0 /* 移除 CSS 文件中的所有注释 */
	                },
	                minify: {
	                    expand: true,
	                    cwd: 'opt_html/',
	                    src: ['*.css'],
	                    dest: 'opt_html/',
	                    ext: '.min.css'
	                }
	            },
	            sass: {
	                dist: {
	                    files: [{
	                        expand: true,
	                        cwd: 'html/',
	                        src: ['*.scss'],
	                        dest: 'opt_html/',
	                        ext: ['.css']
	                    }]
	                }
	            },
	            /************       CSS文件处理     ************/
	            /************       JS文件处理     ************/
	            /****      检查 js 语法    ****/
	            jshint: {
	                options: {
	                    jshintrc: '.jshint'
	                },
	                files: {
	                    src: ['Gruntfile.js', 'html/*.js']
	                },
	            },
	            /****        最小化、混淆、合并 JavaScript 文件       ****/
	            uglify: {
	                target: {
	                    files: {
	                        'html/all_in_one.js': ['html/*.js']
	                    }
	                },
	                //最小化、混淆所有 js/ 目录下的 JavaScript 文件
	                minjs: {
	                    files: [{
	                        expand: true,
	                        cwd: 'html/',
	                        src: ['**/*.js', '!**/*.min.js'],
	                        dest: 'opt_html/',
	                        ext: '.min.js'
	                    }]
	                },
	                options: {
	                    mangle: false, //不混淆变量名
	                    preserveComments: 'false', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
	                    report: 'gzip'
	                }
	            },
	            /************       JS文件处理     ************/
	            /************       图片文件处理     ************/
	            /****        压缩优化图片大小        ****/
	            imagemin: {
	                dist: {
	                    options: {
	                        optimizationLevel: 7,
	                        progressive: true,
	                        interlaced: true,
	                        pngquant: { quality: "65-80" }
	                    },
	                    files: [{
	                        expand: true,
	                        cwd: 'html/images/',
	                        src: ['**/*.{png,jpg,jpeg|gif|svg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
	                        dest: 'opt_html/images/' // 优化后的图片保存位置，默认覆盖
	                    }]
	                }
	            },
	            /************       图片文件处理     ************/
	            /************      CSS JS 文件处理     ************/
	            /****    合并 JS/CSS 文件    ****/
	            concat: {
	                /****    合并 CSS 文件    ****/
	                css: {
	                    // src: ['css/*.css' ],
	                    src: ['html/**/*.css'],
	                    /* 根据目录下文件情况配置 */
	                    dest: 'opt_html/all_in_one.min.css'
	                },
	                /****    合并 JS 文件    ****/
	                js: {
	                    src: ['html/**/*.js'],
	                    /* 根据目录下文件情况配置 如果可以使用 require.js/LABjs 等配置更佳 */
	                    dest: 'opt_html/all_in_one.js'
	                }
	            },
	            /****    合并 JS/CSS 文件    ****/
	            /************      CSS JS 文件处理     ************/
	            /************     HTML 文件处理     ************/
	            //压缩HTML
	            htmlmin: {
	                options: {
	                    //ignoreCustomFragments: [/{dede:[\s\S]*?}/, /\[field:[\s\S]*?\/]/, /{\/dede:[\s\S]*?}/, /<\?[\s\S]*?\?>/],
	                    // ignoreCustomComments: [/<!--[\s]{dede:[\s\S]*?}[\s]-->/],
	                    /* 忽略dedecms {dede: ...} [field:.../]  {/dede:..} <? ... ?>  标签*/
	                    removeScriptTypeAttributes: true,
	                    /* 删除 type="text/javascript"  */
	                    removeStyleLinkTypeAttributes: true,
	                    /* 删除 type="text/css" */
	                    // removeComments: true,
	                    /*删除注释*/
	                    removeCommentsFromCDATA: true,
	                    /* 删除 script 和style标签内的HTML注释*/
	                    collapseWhitespace: true,
	                    /*压缩空白*/
	                    collapseBooleanAttributes: true,
	                    /*压缩布尔属性*/
	                    //removeAttributeQuotes: true,
	                    /*删除属性引号*/
	                    removeRedundantAttributes: true,
	                    /*删除冗余属性*/
	                    useShortDoctype: true,
	                    /*使用短文档类型声明*/
	                    removeEmptyAttributes: true,
	                    /*删除空属性*/
	                    // removeEmptyElements: true,
	                    /*删除空元素*/
	                    removeOptionalTags: true,
	                    /*删除可选标签*/
	                    keepClosingSlash: true,
	                    /*保持反斜杠*/
	                    includeAutoGeneratedTags: true,
	                    /*  */
	                    collapseInlineTagWhitespace: true,
	                    /* display:inline 属性不间隙 */
	                    html5: true,
	                    report: 'gzip'
	                },
	                html: {
	                    files: [{
	                        expand: true,
	                        cwd: 'html/',
	                        src: ['**/*.htm', '**/*.html'],
	                        dest: 'opt_html/'
	                    }]
	                }
	            },

	            autoprefixer: {
	                options: {
	                    // Task-specific options go here.
	                    browserslist: ['last 2 versions', 'chrome', 'ie'],

	                    safe: true,
	                    expand: true,
	                },
	                single_file: {
	                    // Target-specific file lists and/or options go here.
	                    src: 'html/css.css',
	                    dest: 'opt_html/css.css',
	                },

	                mutiple_files: {
	                    // Target-specific file lists and/or options go here.
	                    expand: true,
	                    flatten: true, //是否取代原先文件名
	                    src: 'html/*.css',
	                    dest: 'opt_html/',
	                },

	            },

	            /************     HTML 文件处理     ************/
	            /************     监控文件变化     ************/
	            watch: {
	                /* 监控文件变化并执行相应任务 */
	                img: {
	                    files: ['html/*.{png,jpg,jpeg}'],
	                    options: {
	                        livereload: true
	                    }
	                },
	                css: {
	                    options: {
	                        event: ['changed', 'added'],
	                        livereload: true
	                    },
	                    files: ['html/*.css']
	                },
	                js: {
	                    options: {
	                        livereload: true
	                    },
	                    files: ['html/*.js']
	                },
	                html: {
	                    options: {
	                        livereload: true
	                    },
	                    files: ['html/*.html']
	                }
	            },

	            clean: {

	                contents: ['html/*', 'opt_css/*', 'html/*', 'opt_html/*', 'js/*', 'opt_js/*', 'img/*', 'opt_img/*'],

	            },

	            datauri: {
	                default: {
	                    options: {
	                        classPrefix: 'data-'
	                    },
	                    src: [
	                        "html/*.css",

	                    ],
	                    dest: [
	                        "opt_html/css.base64.css",

	                    ]
	                }
	            },

	            css_img_2_data_uri: {
	                options: {

	                    expand: true,

	                    files: [{
	                            src: 'html/css.css',
	                            dest: 'opt_html/css_datauri.css'
	                        },

	                    ]
	                }
	            },

	            htmlhint: {
	                options: {
	                    "tagname-lowercase": true,    
	                    "attr-lowercase": true,
	                    "attr-value-double-quotes": true,
	                    "attr-no-duplication": true,
	                    "doctype-first": true,
	                    "tag-pair": true,
	                    "spec-char-escape": true,
	                    "id-unique": true,
	                    "src-not-empty": true,
	                    "title-require": true,
	                    "attr-value-not-empty": false,
	                    "tag-self-close": false,
	                    "head-script-disabled": true,
	                    "alt-require": true,
	                    "doctype-html5": true,
	                    "space-tab-mixed-disabled": true,
	                    "href-abs-or-rel": "abs"
	                },
	                html1: {
	                    src: ['path/to/**/*.html']
	                },
	                html2: {
	                    src: ['path/to/**/*.html']
	                }
	            },

	            // min: {
	            //     dist: {
	            //         src: ['src/foo.js', 'src/bar.js'],
	            //         dest: 'build/foobar.min.js'
	            //     }
	            // },
	            // cssmin: {
	            //     dist: {
	            //         src: ['html/css.css'],
	            //         dest: 'opt_html/css.yuimin.css'
	            //     }
	            // },

	            ucss: {
	                target: {
	                    options: {
	                        //  whitelist: ['.some-ok-selector'],
	                        auth: null
	                    },
	                    pages: {
	                        crawl: 'html/index.html', //爬取的地址
	                        //额外爬取 include: ['http://localhost/extra-not-reachable-by-crawl'] 
	                    },
	                    css: ['html/css.css']
	                }
	            },


	        });
	        /************     监控文件变化     ************/
	        /************     加载frunt模块     ************/
	        grunt.loadNpmTasks('grunt-contrib-csslint');
	        grunt.loadNpmTasks('grunt-contrib-cssmin');
	        grunt.loadNpmTasks('grunt-contrib-sass');
	        grunt.loadNpmTasks('grunt-contrib-jshint');
	        grunt.loadNpmTasks('grunt-contrib-uglify');
	        //  grunt.loadNpmTasks('grunt-yui-compressor');
	        grunt.loadNpmTasks('grunt-contrib-imagemin');
	        grunt.loadNpmTasks('grunt-spritesmith'); //雪碧图
	        grunt.loadNpmTasks('grunt-contrib-htmlmin');
	        grunt.loadNpmTasks('grunt-autoprefixer');
	        grunt.loadNpmTasks('grunt-uncss');
	        grunt.loadNpmTasks('grunt-ucss');
	        grunt.loadNpmTasks('grunt-contrib-concat');
	        grunt.loadNpmTasks('grunt-contrib-watch');
	        grunt.loadNpmTasks('grunt-contrib-clean');
	        grunt.loadNpmTasks('grunt-htmlhint');
	        grunt.loadNpmTasks('grunt-datauri');
	        grunt.loadNpmTasks('grunt-css-img-2-data-uri');
	        ////////////////////////////////////////////////////////////////////
	        grunt.registerTask('check_gf', ['jshint']);
	        grunt.registerTask('prefixer', ['autoprefixer:mutiple_files']);
	        grunt.registerTask('default', ['csslint', 'cssmin', 'jshint', 'uglify:minjs', 'imagemin', 'htmlmin']);
	        grunt.registerTask('clean_css', ['uncss']);
	        grunt.registerTask('unuse_css', ['ucss']);
	       //  grunt.registerTask('yui_css', ['cssmin']);  
	        grunt.registerTask('check_css', ['csslint']);
	        grunt.registerTask('css', ['cssmin', 'concat:css']);
	        grunt.registerTask('scss', ['sass']);
	        grunt.registerTask('xuebi', ['sprite']);
	        grunt.registerTask('image', ['imagemin']);
	        grunt.registerTask('html', ['htmlmin']);
	        grunt.registerTask('js', ['concat:js', 'uglify:minjs']);
	        grunt.registerTask('compress_js', ['uglify:minjs']);
	        grunt.registerTask('compress_css', ['cssmin']);
	        grunt.registerTask('clean_all', ['clean']);
	        grunt.registerTask('data_uri', ['datauri']);
	        grunt.registerTask('img_data_uri', ['css_img_2_data_uri']);

	        // 专题任务
	        // 1.检查CSS，JS语法
	        // 2.剔除没有使用的CSS
	        // 3.补全CSS前缀
	        // 4.压缩CSS，JS，图片，HTML

	        grunt.registerTask('zhuantiye', ['autoprefixer:single_file', 'unuse_css', 'cssmin', 'imagemin', 'htmlmin']);


	        // 定义默认任务
	        // grunt.registerTask('dev', ['csslint', 'jshint']);
	        // grunt.registerTask('dest', ['imagemin', 'concat:css', 'cssmin', 'uglify:minjs']);
	        /************    注册frunt 任务    ************/
	    };
