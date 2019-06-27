var express  = require('express');
var routes = require("./App/routes/routes");
var sockets = require("./App/socket/socket");
var app      = express();
var session = require('express-session');
var server = require('http').createServer(app);
var socketio = require('socket.io');
var io = socketio().listen(server)
var bodyParser = require("body-parser");
var cors = require('cors');
var logger = require('morgan');
var mongoose = require('mongoose');

// CONNECT TO DB
var databaseConfig = require('./App/configuration/database');

mongoose.connect(databaseConfig.url,{useNewUrlParser: true});

const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || '127.0.0.1'

app.use(cors());

app.use(function(req,res,next){   
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    console.log(req.headers.origin)
    return next();
    
    // return next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

var clients = {};

require('./App/socket/socket')(io,clients)

server.listen(PORT,()=>console.log(`Live on ${PORT}`))
routes(app);