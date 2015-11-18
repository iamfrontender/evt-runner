var exec = require('child_process').execSync;
var EOL = require('os').EOL;

module.exports = function(location) {
  return String(exec('which ' + location)).split(EOL);
};