'use strict';

module.exports = function(grunt){

	// project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		//删除目录
		clean: {
			build: {
				src: ['build/*', 'assets/*']
			}
		},

		//javascript语法校验
		jshint: {
			options: {
                //大括号包裹
                curly: true,
                //对于简单类型，使用===和!==，而不是==和!=
                eqeqeq: true,
                //对于首字母大写的函数（声明的类），强制使用new
                newcap: true,
                //禁用arguments.caller和arguments.callee
                noarg: true,
                //对于属性使用aaa.bbb而不是aaa['bbb']
                sub: true,
                //查找所有未定义变量
                undef: true,
                //查找类似与if(a = 0)这样的代码
                boss: true,
                //指定运行环境为node.js
                node: true
            },
            //具体任务配置
            files: {
                src: ['src/js/custom/*.js']
            }
		},

		//jsavscrpt文件混淆压缩插件
		uglify: {
			options: {
				sourceMap: false,
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			/*build: {
				src: 'src/*.js',
				dest: 'build/app.min.js'
			}*/
			build: { //按原文件结构压缩文件
				files: [{
					expand: true,
					cwd: 'src',
					src: ['**/*.js', '!**/*.min.js'], // 过滤掉min.js
					dest: 'build/',
					ext: '.min.js'
					/*rename: function (dest, src) {  
                      var folder = src.substring(0, src.lastIndexOf('/'));  
                      var filename = src.substring(src.lastIndexOf('/'), src.length);  
                      //  var filename=src;  
                      filename = filename.substring(0, filename.lastIndexOf('.'));  
                      var fileresult=dest + folder + filename + '.min.js';  
                      grunt.log.writeln("现处理文件："+src+"  处理后文件："+fileresult);  

                      return fileresult;  
                      //return  filename + '.min.js';  
                  }*/
				}]
			}
		},
		// css压缩
		cssmin: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				//美化代码
                beautify: {
                    //中文ascii化，非常有用！防止中文乱码的神配置
                    ascii_only: true
                }
			},
			build: {
				files: [{
					expand: true,
					cwd: 'src',
					src: ['**/*.css', '!**/*.min.css'],
					dest: 'build',
					ext: '.min.css'
				}]
			}
		},

		//复制文件或目录
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'build',
					src: ['**/*'],
					dest: 'assets'
				}]
			}
		},
		// bower 组件copy
		bowercopy: {
	      options: {
	        clean: false
	      },

	      libs: {
	        options: {
	          destPrefix: 'assets/vendor'
	        },
	        files: {
	          'jquery/jquery.min.js': 'jquery/dist/jquery.min.js',
	          'bootstrap/js': 'bootstrap/dist/js/bootstrap.min.js',
	          'bootstrap/css': 'bootstrap/dist/css/bootstrap.min.css',
	          'bootstrap/fonts': 'bootstrap/dist/fonts/*'
	        }
	      }
	    }



	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	// 加载uglify任务插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.loadNpmTasks('grunt-bowercopy');


	// grunt版helloworld
	grunt.registerTask('helloworld', function(){
		console.log('grunt ->> helloworld');
		grunt.log.writeln('grunt---log.....');
	});

	//测试任务
	grunt.registerTask('test', ['helloworld', 'jshint']);

	grunt.registerTask('compress', ['uglify', 'cssmin']);

	//默认被执行的任务列表
	grunt.registerTask('default', ['clean', 'test', 'compress', 'copy', 'bowercopy']);

}
