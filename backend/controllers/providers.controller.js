//import model
const model = require('../models/providers.model')

class ProvidersController
{
    GetProviders = async (req,res)=>
    {
        let db_res = await model.GetProviders();
        res.json(db_res.rows);
    }

    GetPDFInfo = async (req,res)=> //reporte de proveedores
    {
        let id = req.params.id;
        let db_res = await model.GetProviderPDF(id);
        res.json(db_res.rows);
    }
    
    ObtenerEsenciasDeProveedor=async (req,res)=>
    {
        let id = req.params.id;
        let db_res = await model.ObtenerEsencias(id);
        res.json(db_res.rows);
    }

    ObtenerIngredientesDeProveedor=async (req,res)=>
    {
        let id = req.params.id;
        let db_res = await model.ObtenerIngredientes(id);
        res.json(db_res.rows);
    }
}

const controller = new ProvidersController(); //create instance of class
module.exports = controller; //export instance