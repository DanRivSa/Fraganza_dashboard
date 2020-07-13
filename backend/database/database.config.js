const {Pool} = require('pg');

const connection_Key = 
{
    user: 'dbuser',
    host: 'server',
    database: 'db name',
    password: 'secretpassword',
    port: 1111,
}

const connection_pool = new Pool(connection_Key); //open a connection with the db
module.exports = connection_pool; //export open connection
