'use strict';

var fs = require('fs');

function parseCss(css) {
  var data = {};
  css = css.replace(/\n/g,'').replace(/\r/g, '').replace(/ /g,'');
  var classRegex = /\.([\w\d\.-]+)[^{}]*{[^}]*}/gim;
  var idRegex = /#([\w\d\.-]+)[^{}]*{[^}]*}/gim;
  var classes = classRegex.exec(css);
  var ids = idRegex.exec(css);
  console.log('classes: ', classes, '\nids: ', ids);
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



