//import model
const model = require('../models/producers.model');
const { async } = require('@angular/core/testing');

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

    ObtenerUbicacionGeoVigente = async ()=>
    {
      let id_productor = req.params.id;
      let db_res = await model.ObtenerUbicacionGeoVigente(id_productor);
      res.json(db_res.rows);
    }

    ObtenerAltEnvioVigente = async ()=>
    {
      let id_productor = req.params.id;
      let db_res = await model.ObtenerAltEnvioVigente(id_productor);
      res.json(db_res.rows);
    }

    ObtenerPagoGeoVigente = async ()=>
    {
      let id_productor = req.params.id;
      let db_res = await model.ObtenerPagoGeoVigente(id_productor);
      res.json(db_res.rows);
    }

    //Metodos Post

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

    GetContratosPorVencer = async (req,res)=>
    {
      let id_productor = req.params.id;
      let db_res = await model.GetContratosPorVencer(id_productor);
      return res.json(db_res.rows);
    }

    //Métodos modulo de compras
    GetContratosVigentes = async (req,res)=>
    {
      let id_proveedor = req.params.id;
      let db_res = await model.GetContratosVigentes(id_proveedor);
      res.json(db_res.rows)
    }

    GetEsenciasContratadas = async (req,res)=>
    {
      let id_proveedor = req.params.id;
      let numero_contrato = req.params.contrato;
      let db_res = await model.GetEsenciasContratadas(id_proveedor,numero_contrato);
      res.json(db_res.rows);
    }


    GetIngredientesContratados = async (req,res)=>
    {
      let id_proveedor = req.params.id;
      let numero_contrato = req.params.contrato;
      let db_res = await model.GetIngredientesContratados(id_proveedor,numero_contrato);
      res.json(db_res.rows);
    }

    metodoPagoContratados = async (req,res)=>
    {
      let id_proveedor = req.params.id;
      let numero_contrato = req.params.contrato;
      let db_res = await model.metodoPagoContratados(id_proveedor,numero_contrato);
      res.json(db_res.rows);
    }

    metodoEnvioContratados = async (req,res)=>
    {
      let id_proveedor = req.params.id;
      let numero_contrato = req.params.contrato;
      let db_res = await model.metodoEnvioContratados(id_proveedor,numero_contrato);
      res.json(db_res.rows);
    }

}

const controller = new ProducersController(); //create instance
module.exports = controller; //export instance
