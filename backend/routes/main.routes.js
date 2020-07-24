const express = require('express');
const router = express.Router(); //initializing instance of node router

// app controllers

//controller for providers
const providersController = require('../controllers/providers.controller');

//controller for producers
const producersController = require('../controllers/producers.controller');
const { runInContext } = require('vm');

// app http routes

//http request for providers
router.get('/providers',providersController.GetProviders);
router.get('/providers/nombre/:id',providersController.ObtenerNombre);
router.get('/providers/esencias/:id',providersController.ObtenerEsenciasDeProveedor);
router.get('/providers/ingredientes/:id',providersController.ObtenerIngredientesDeProveedor);
router.get('/providers/alt_envio/:id',providersController.ObtenerAlternativasEnvio);
router.get('/providers/alt_pago/',providersController.ObtenerAlternativasPago);
router.get('/providers/cuotas/:id',providersController.ObtenerInfoPagoCuotas);

//presentaciones
router.get('/providers/esencia/:id',providersController.ObtenerPresentacionesEsencia);
router.get('/providers/ingrediente/:id',providersController.ObtenerPresentacionesIngrediente);

//http request for producers
router.get('/producers',producersController.GetProducers);
router.get('/producers/initial_test/:id',producersController.ProveedoresEvIni); //se pasa id de usuario productor

//Escalas

router.get('/producers/escala_inicial/:id',producersController.ObtenerEscalaInicialVigente);

router.get('/producers/escala_anual/:id',producersController.ObtenerEscalaAnualVigente);
//Crear Escala Inicial
router.post('/producers/escala_inicial',producersController.PostEscalaInicial);
//Crear Escala Anual
router.post('/producers/escala_anual',producersController.PostEscalaAnual);
//Crear historicos de criterios de tipo Inicial
router.post('/producers/met_ubicacion',producersController.PostUbicacion);
router.post('/producers/met_envio',producersController.PostEnvio);
router.post('/producers/met_pago',producersController.PostPago);

//Crear historico de criterio tipo anual
router.post('/producers/renovacion',producersController.PostCriterioAnual);
//Cerrar Escala Inicial
router.put('/producers/escala_inicial/:id',producersController.PutEscalaInicialVigente);
//Cerrar Escala Anual
router.put('/producers/escala_anual/:id',producersController.PutEscalaAnualVigente);
//Cerrar Historicos Tipo Inicial
router.put('/producers/inicial/:id',producersController.PutCriteriosInicial);
//Cerrar historicos tipo Anual
router.put('/producers/anual/:id',producersController.PutCriteriosAnual);

//Rutas modulo compras

//Obtener contratos vigentes
router.get('/producers/compras/providers/:id',producersController.GetContratosVigentes);
module.exports = router;
