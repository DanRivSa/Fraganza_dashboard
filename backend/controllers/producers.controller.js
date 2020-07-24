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

    ObtenerEscalaAnualVigente = async (req,res)=>
    {
      let id_productor = req.params.id;
      let db_res = await model.ObtenerEscalaAnualVigente(id_productor);
      res.json(db_res.rows);
    }

    PostEscalaInicial = async (req,res)=>
    {
      const {id,rango_min,rango_max,rango_aprob} = req.body;
      let db_res = await model.PostEscalaInicial(id,rango_min,rango_max,rango_aprob);
      res.json(db_res.rows);
    }


    PostEscalaAnual = async (req,res)=>
    {
      const {id,rango_min,rango_max,rango_aprob} = req.body;
      let db_res = await model.PostEscalaAnual(id,rango_min,rango_max,rango_aprob);
      res.json(db_res.rows);
    }

    PostUbicacion = async (req,res)=>
    {
      const {id,id_criterio,peso} = req.body;
      let db_res = await model.PostUbicacion(id,id_criterio,peso);
      res.json(db_res.rows);
    }

    PostEnvio = async (req,res)=>
    {
      const {id,id_criterio,peso} = req.body;
      let db_res = await model.PostEnvio(id,id_criterio,peso);
      res.json(db_res.rows);
    }
    PostPago = async (req,res)=>
    {
      const {id,id_criterio,peso} = req.body;
      let db_res = await model.PostPago(id,id_criterio,peso);
      res.json(db_res.rows);
    }

    PostCriterioAnual = async (req,res)=>
    {
      const {id,id_criterio,peso} = req.body;
      let db_res = await model.PostCriterioAnual(id,id_criterio,peso);
      res.json(db_res.rows);
    }
    //Metodos Put para cerrar historicos
    PutEscalaInicialVigente = async (req,res)=>
    {
      let id_productor = req.params.id;
      let db_res = await model.PutEscalaInicialVigencia(id_productor);
      res.json(db_res.rows);
    }

    PutEscalaAnualVigente = async (req,res)=>
    {
      let id_productor = req.params.id;
      let db_res = await model.PutEscalaAnualVigencia(id_productor);
      res.json(db_res.rows);
    }

    PutCriteriosInicial = async (req,res)=>
    {
      let id_productor = req.params.id;
      let db_res = await model.PutCriteriosInicial(id_productor);
      res.json(db_res.rows);
    }
    PutCriteriosAnual = async (req,res)=>
    {
      let id_productor = req.params.id;
      let db_res = await model.PutCriteriosAnual(id_productor);
      res.json(db_res.rows);
    }

    //Métodos modulo de compras
    GetContratosVigentes = async (req,res)=>
    {
      let id_productor = req.params.id;
      let db_res = await model.GetContratosVigentes(id_productor);
      res.json(db_res.rows)
    }

}

const controller = new ProducersController(); //create instance
module.exports = controller; //export instance
