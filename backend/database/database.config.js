const {Pool} = require('pg');

const connection_Key = 
{
    user: 'dbuser',
    host: 'database.server.com',
    database: 'mydb',
    password: 'secretpassword',
    port: 3211,
}

const connection_pool = new Pool(connection_Key); //open a connection with the db
module.exports = connection_pool; //export open connection
