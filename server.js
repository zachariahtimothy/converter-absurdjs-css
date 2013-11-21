var fs = require('fs');

var usage = "Usage: node server ./mydir\n";

if (process.argv.length < 3) {
  console.log('Directory required as first argument', usage);
  process.exit();
}

var directory = process.argv[2];

console.log('Walking directory ', directory);

function parseCss(css) {
  var data = {};
  css = css.replace(/\n/g,'').replace(/ /g,'');
  var statements = css.split('{');
  console.log('statements: ', statements);
  return data;
}

function writeAbsurdJS(json) {

}

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

