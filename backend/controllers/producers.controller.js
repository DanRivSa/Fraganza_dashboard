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

    ProveedoresEvIni = async (req,res)=>
    {
        let id_productor = req.params.id;
        let db_res = await model.FiltrarProveedoresEvIni(id_productor);
        res.json(db_res.rows);
    }

    ObtenerEscalaInicialVigente = async (req,res)=>
    {
        let id_productor = req.params.id;
        let db_res = await model.ObtenerEscalaInicialVigente(id_productor);
        res.json(db_res.rows);
    }

    ObtenerEscalaAnualVigente = async (req,res)=>{
      let id_productor = req.params.id;
      let db_res = await model.ObtenerEscalaAnualVigente;
      res.json(db_res.rows);
    }

    PostEscalaInicial = async (req,res)=>
    {
      const {id,rango_min,rango_max,rango_aprob,tipo_uso} = req.body;
      let db_res = await model.PostEscalaInicial(id,rango_min,rango_max,rango_aprob,tipo_uso);
      res.json(db_res.rows);
    }

    PostUbicacion = async (req,res)=>
    {
      const {id,id_criterio,peso,tipo_uso} = req.body;
      let db_res = await model.PostUbicacion(id,id_criterio,peso,tipo_uso);
      res.json(db_res.rows);
    }

    PostEnvio = async (req,res)=>
    {
      const {id,id_criterio,peso,tipo_uso} = req.body;
      let db_res = await model.PostPago(id,id_criterio,peso,tipo_uso);
      res.json(db_res.rows);
    }
    PostPago = async (req,res)=>
    {
      const {id,id_criterio,peso,tipo_uso} = req.body;
      let db_res = await model.PostPago(id,id_criterio,peso,tipo_uso);
      res.json(db_res.rows);
    }

}

const controller = new ProducersController(); //create instance
module.exports = controller; //export instance
