//import model
const model = require('../models/providers.model')

class ProvidersController
{
    GetProviders = async (req,res)=>
    {
        let db_res = await model.GetProviders();
        res.json(db_res.rows);
    }


    ObtenerNombre = async (req,res)=>
    {
        let id = req.params.id;
        let db_res = await model.ObtenerNombreProveedor(id);
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

    ObtenerAlternativasEnvio = async (req,res)=>
    {
        let id = req.params.id;
        let db_res = await model.ObtenerAlternativasEnvio(id);
        res.json(db_res.rows);
    }

    ObtenerPresentacionesEsencia = async (req,res)=>
    {
        let cas = req.params.id;
        let db_res = await model.ObtenerPresentacionesEsencia(cas);
        res.json(db_res.rows);
    }

    ObtenerPresentacionesIngrediente = async (req,res)=>
    {
        let cas_oi = req.params.id;
        let db_res = await model.ObtenerPresentacionesIngrediente(cas_oi);
        res.json(db_res.rows);

    }
}

const controller = new ProvidersController(); //create instance of class
module.exports = controller; //export instance