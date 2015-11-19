// Exports
module.exports = {
  test: test,
  serve: serve
};

// Imports
var child = require('child_process');
var children = [];

var spawn = child.spawn;
var fork = child.fork;
var chalk = require('chalk');

var configs = require('../configs');

// Utils
var log = {
  trace: function(task, message) {
    console.log(chalk.inverse('[' + task + ']') + ' : ' + message);
  },
  error: function(task, message) {
    console.log(chalk.inverse('[' + task + ']') + ' : ' + chalk.red('ERROR ') + chalk.red(message));
  }
};

// Launchers
function test() {
  _launch('test');
}

function serve(engine) {
  if (engine) {
    var config = configs.serve;

    if (configs.engines[engine]) {
      config.args.pop();
      config.args.push('--engine-target=' + configs.engines[engine]);
    }
  }

  _launch('serve');
}

// Abstract launcher
function _launch(app) {
  var config = configs[app];
  var child, appName;

  try {
    child = spawn(config.executable, config.args, config.opts);
  } catch (e) {
    log.error('LAUNCHER', e);
    return e;
  }

  appName = app.toUpperCase();

  child.stdout.on('data', function (data) {
    log.trace(appName, data);
  });

  child.stderr.on('data', function (err) {
    log.error(appName, err);
  });

  child.on('close', function (code) {
    if (code !== 0) {
      log.trace(appName, 'Finished with code ' + chalk.blue(code));
    }
  });

  children.push(child);
}