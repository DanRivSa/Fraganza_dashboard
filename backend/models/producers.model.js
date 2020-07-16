//import open db connection pool
const db = require('../database/database.config');

class ProducersModel
{
    //async methods

    async GetProducers()
    {
        const db_res = db.query('SELECT * FROM ada_productor');
        return db_res;
    }
}

const model = new ProducersModel();//create instance
module.exports = model; //export instance 