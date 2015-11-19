var where = require('./lib/wherio');
var path = require('path');

var paths = {
  dashboard_src: '/home/ivc/evt/dashboard'
};

var executables = {
  'karma': path.resolve(where('karma')[0]),
  'node': path.resolve(where('nodejs')[0])
};

module.exports = {
  engines: {
    'p': 'prod',
    't': 'test',
    'd': 'dev'
  },
  paths: paths,
  test: {
    executable: 'karma',
    args: [
      'start', 'karma.conf.js',
      '--auto-watch',
      '--no-single-run'
    ],
    opts: {
      cwd: paths.dashboard_src,
      detach: true
    }
  },
  serve: {
    executable: 'grunt',
    args: [
      'serve',
      '--engine-target=prod'
    ],
    opts: {
      cwd: paths.dashboard_src,
      detach: true
    }
  }
};