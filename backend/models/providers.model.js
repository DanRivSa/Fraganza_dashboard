//import open db connection pool
const db = require('../database/database.config');

class ProviderModel
{
    //async methods
    
    async GetProviders()
    {
        const db_res = db.query('SELECT * FROM ada_proveedor');
        return db_res;
    }
}

const model = new ProviderModel() //create instance
module.exports = model; //export instance