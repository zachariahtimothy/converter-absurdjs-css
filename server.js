'use strict';

var fs = require('fs');

function parseCss(css) {
  var data = {};
  css = css.replace(/\n/g,'').replace(/\r/g, '').replace(/ /g,'');
  var statements = css.split('{}');
  console.log('statements: ', statements);
  return data;
}

function writeAbsurdJS(json) {

}

var Server =  function (options) {

  var _public = {
    init: function () {
      console.log('SERVER FUNCTION, ', options);
      var directory = options.directory;

      console.log('Walking directory ', directory);

      fs.readdir(directory, function(err, files) {
        files.filter(function(file) { return file.substr(-4) === '.css'; })
          .forEach(function(file) { 
            var fileAndDir = directory + '/' + file;
            fs.readFile(fileAndDir, 'utf-8', function(err, contents) { 
            console.log('parsing file: ', fileAndDir);
            var statements = parseCss(contents);
          }); 
        });
      });
    }
  };
  _public.init(options);
  return _public;
};

module.exports = Server;



