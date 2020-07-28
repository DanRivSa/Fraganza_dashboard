//import model
const model = require('../models/providers.model');
const { async } = require('rxjs/internal/scheduler/async');

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
      //  let id_prov = req.params.id_prov;
        let db_res = await model.ObtenerAlternativasEnvio(id);
        res.json(db_res.rows);
    }

    ObtenerAlternativasPago = async (req,res)=>
    {
        let id = req.params.id;
      //  let id_prov = req.params.id_prov;
        let db_res = await model.ObtenerAlternativasPago(id);
        res.json(db_res.rows);
    }
    ObtenerInfoPagoCuotas = async (req,res)=>
    {
        let id = req.params.id;
      //  let id_prov = req.params.id_prov;
        let db_res = await model.ObtenerInfoPagoCuotas(id);
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

    GetContratosVigentes = async (req,res)=>
    {
        let id_proveedor = req.params.id;
        let db_res = await model.GetContratosVigentes(id_proveedor);
        res.json(db_res.rows);
    }

    ObtenerAltEnvioParaContrato = async (req,res)=>
    {
      let id_prod = req.params.id_prod;
      let id_prov = req.params.id_prov;
      const db_res = await model.ObtenerAltEnvioParaContrato(id_prod,id_prov);
      res.json(db_res.rows);
    }

    CancelarContrato = async (req,res)=>
    {
        let numero = req.params.num;
        let motivo = req.body.motivo;
        const db_res = await model.CancelarContrato(numero,motivo);
        res.json(db_res.rows);
    }

    AceptarContrato = async (req,res)=>
    {
        let numero = req.params.num;
        const db_res = await model.AceptarContrato(numero);
        res.json(db_res.rows);
    }

    RechazarContrato = async (req,res)=>
    {
        let numero = req.params.num;
        const db_res = await model.RechazarContrato(numero);
        res.json(db_res.rows);
    }

    ObtenerContratosPendientes = async (req,res)=>
    {
        let id = req.params.id;
        const db_res = await model.ObtenerContratosPendientes(id);
        res.json(db_res.rows);
    }
    ConfirmarPedido = async (req,res)=>
    {
      const {detalle} = req.body;
      let id_pedido = req.params.id_pedido;
      let db_res = await model.ConfirmarPedido(id_pedido,detalle);
      res.json(db_res.rows);
    }

    RechazarPedido = async (req,res)=>
    {
      const {detalle} = req.body;
      let id_pedido = req.params.id_pedido;
      let db_res = await model.RechazarPedido(id_pedido,detalle);
      res.json(db_res.rows);
    }


}

const controller = new ProvidersController(); //create instance of class
module.exports = controller; //export instance
