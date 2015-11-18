#!/usr/bin/env node

var package = require('../package.json');
var launcher = require('../lib/launcher');

var program = require('commander');

program.version(package.version);

program
  .command('test')
  .alias('t')
  .description('Launch continious karma run, retriggered on files change')
  .action(function () {
    launcher.test();
  });

program
  .command('serve')
  .alias('s')
  .description('Launches default serve task')
  .action(function() {
    launcher.serve();
  });

program
  .command('combine')
  .alias('c')
  .description('Launches serve and test commands')
  .action(function() {
    launcher.test();
    launcher.serve();
  });


program.parse(process.argv);

