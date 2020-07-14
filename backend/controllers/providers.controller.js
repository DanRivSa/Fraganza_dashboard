//import model
const model = require('../models/providers.model')

class ProvidersController
{
    GetProviders = async (req,res)=>
    {
        let db_res = await model.GetProviders();
        res.json(db_res.rows);
    }
}

const controller = new ProvidersController(); //create instance of class
module.exports = controller; //export instance