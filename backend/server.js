const express = require('express');
const server = express(); //initialize server
const cors = require('cors');

//server configuration
server.set('name','Fraganza');
server.set('port',process.env.PORT || 3000); //local url-> http://localhost:3000

//middlewares
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(cors({origin:'http://localhost:4200'})) //enable local communication with angular

//app routes
server.use(require('./routes/main.routes.js'));

//start server on port
server.listen(server.get('port'),(req,res)=>
{
    console.log('name: ',server.get('name'));
    console.log('running on port: ',server.get('port'));
});