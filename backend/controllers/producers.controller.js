//import model
const model = require('../models/producers.model');

class ProducersController
{
    //http methods

    GetProducers = async (req,res)=>
    {
        let db_res = await model.GetProducers();
        res.json(db_res.rows);
    } 

}

const controller = new ProducersController(); //create instance
module.exports = controller; //export instance