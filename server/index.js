var Hapi = require('hapi');
var path = require('path');
var config = require('./config');

// port: 22955
// Create a server with a host, port, and options
var server = new Hapi.Server(config.hostName, config.hostPort);

// Add the route
server.route({
    method : 'POST',
    path : '/upload',
    config : {
        handler: function (request) {
            var payload = request.payload;
            console.log(payload + '\n');
            
            request.reply(payload.uploadFile);
        },
        payload : {
            multipart: {
                mode: 'file',
                uploadDir: '.tmp/styles' 
            }
        } 
    }
});

server.route({
    method: 'POST',
    path: '/parse',
    config: {
        handler: function (request) {
            var payload = request.payload;
            console.log('Payload: ' + payload + '\n');
            var result = {};
            var css = JSON.parse(payload.css);
            Object.keys(css).forEach(function(key) {
                var rule = css[key];
                console.log('\nkey: ', key, rule);
                result[key] = rule;
            });
            request.reply(result);
        },
        payload: 'parse'
    }
});

//No need to start Hapi, grunt-hapi will do it for us.
module.exports = server;
