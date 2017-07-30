// Generated on 2016-01-28 using generator-angular 0.15.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-tomcat-deploy');
  grunt.loadNpmTasks('grunt-properties-reader');
    
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    war: 'grunt-war',
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn',
    tomcat_deploy: 'grunt-tomcat-deploy',
    properties:'grunt-properties-reader'
  });

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };
    
  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all', 'newer:jscs:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'newer:jscs:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'postcss']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/styles',
                connect.static('./app/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js',
          '!<%= yeoman.app %>/scripts/edl-components.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Make sure code styles are up to par
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js',
          '!<%= yeoman.app %>/scripts/edl-components.js'
        ]
      },
      test: {
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({browsers: ['last 1 version']})
        ]
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },
      
    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/scripts/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/img',
          '<%= yeoman.dist %>/styles',
          '<%= yeoman.dist %>/fonts'
        ],
        patterns: {
          js: [[/(img\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/img',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/img',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/img'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    ngtemplates: {
      dist: {
        options: {
          module: 'yeomanApp',
          htmlmin: '<%= htmlmin.dist.options %>',
          usemin: 'scripts/scripts.js'
        },
        cwd: '<%= yeoman.app %>',
        src: 'views/{,*/}*.html',
        dest: '.tmp/templateCache.js'
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt,properties}',
            '*.html',
            'img/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*',
            'fonts/{,*/}*.*' 
          ]
        }, {
          expand: true,
          cwd: '.tmp/img',
          dest: '<%= yeoman.dist %>/img',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      corefiles: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'bower_components',
          dest: '<%= yeoman.dist %>/bower_components',
          src: [
            '*/**.js',
            '*/**.css',
            'jquery/dist/jquery.js',
			'angular-modal-service/dst/angular-modal-service.js'
          ]
        },{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*/**',
            './*'
          ]
        }]
      },
    },
      
    properties: {
        props: './tomcat.properties'
    },
      
    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    gitinfo: {
        local: {
            branch: {
                current: {
                    SHA: "Current HEAD SHA",
                    shortSHA: "Current HEAD short SHA",
                    name: 'webviewer14ui',
                    desc: 'Web Viewer 14 UI',
                    currentUser: "Current git user",
                    lastCommitTime: "Last commit time",
                    lastCommitMessage: "Last commit message",
                    lastCommitAuthor: "Last commit author",
                    lastCommitNumber: "Last commit number"
                }
            }
        }
    },
    war: {
         // war file creation and configuration
         target: {
          options: {
            war_dist_folder: 'dist',
            war_name:  '<%= gitinfo.local.branch.current.name %>',
            war_verbose : true,
            webxml_welcome: 'index.html',
            webxml_display_name: '<%= gitinfo.local.branch.current.desc %>',
            webxml_mime_mapping: [{
            extension: 'woff',
                mime_type: 'application/font-woff'
            }]
           },
           files: [{
            expand: true,
            cwd: 'dist',
            src: '**',
            dest: ''
          }]
        }
    },
    tomcat_deploy: {
         // auto deploy to a tomcat server. server configuration required.
         host: '<%= props.host %>',
         port: '<%= props.port %>',
         login: '<%= props.login %>',
         password: '<%= props.password %>',
         
         path: '/<%= gitinfo.local.branch.current.name %>', 
         war: 'dist/<%= gitinfo.local.branch.current.name %>.war',
         deploy: '/manager/text/deploy',
         undeploy: '/manager/text/undeploy',
    },
    tomcat_redeploy: {
         war: 'dist/<%= gitinfo.local.branch.current.name %>.war'
    }
  });


    
 /* 
  * These tasks will auto deploy the war file to your tomcat server.
  * - MUST enable a new user with manager-script role in tomcat-users.xml
  * - Create tomcat.properties file with host, port, login, and password.
  * - Install required package: 'npm install grunt-tomcat-deploy'
  */
  grunt.registerTask('deploy', [
    'named-build',
    'tomcat_redeploy'
  ]); 
  grunt.registerTask('deploy-quick', [
    'named-quick-build',
    'tomcat_redeploy'
  ]);    
    
  
 /* 
  * These tasks add the git branch name to the war filename.
  * - Install required package: 'npm install grunt-gitinfo'
  */
  grunt.registerTask('update-name', 'Rename values for war file.', function () {
      var desc = 'gitinfo.local.branch.current.desc';
      var name = 'gitinfo.local.branch.current.name';
      var lastCommit = 'gitinfo.local.branch.current.shortSHA';
      
      // get values from init config
      var branch_name = grunt.config.get(name);

      // if gitinfo was executed properly, the branch_name will not be the initial value
      if (branch_name !== 'webviewer14ui') {
          // copy branch name, update values
          grunt.config.set(name, 'wv14ui_' + branch_name);
          grunt.config.set(desc, 'Web Viewer 14 UI (' + branch_name + ', Commit ' + grunt.config.get(lastCommit) + ')');
      }
  });
    
  grunt.registerTask('named-build', [
      'gitinfo', 
      'update-name', 
      'build'
  ]);
    
  grunt.registerTask('named-quick-build', [
      'gitinfo', 
      'update-name', 
      'quick-build'
  ]);


    
  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
      if (target === 'dist') {
          return grunt.task.run(['build', 'connect:dist:keepalive']);
      }

      grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'postcss:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
      grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
      grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'postcss',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
	'properties',
    'useminPrepare',
    'concurrent:dist',
    'postcss',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin',
    'war'
  ]);

  grunt.registerTask('quick-build', [
     'clean:dist',
     'copy:corefiles',
	 'properties',
     'war'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'newer:jscs',
    'test',
    'build'
  ]);
};
