const express = require('express');
const router = express.Router(); //initializing instance of node router

// app controllers

//controller for providers
const providersController = require('../controllers/providers.controller');

//controller for producers
const producersController = require('../controllers/producers.controller');

// app http routes

//http request for providers
router.get('/providers',providersController.GetProviders);
router.get('/providers/nombre/:id',providersController.ObtenerNombre);
router.get('/providers/esencias/:id',providersController.ObtenerEsenciasDeProveedor);
router.get('/providers/ingredientes/:id',providersController.ObtenerIngredientesDeProveedor);
router.get('/providers/alt_envio/:id',providersController.ObtenerAlternativasEnvio);
router.get('/providers/alt_pago/',providersController.ObtenerAlternativasPago);

//presentaciones
router.get('/providers/esencia/:id',providersController.ObtenerPresentacionesEsencia);
router.get('/providers/ingrediente/:id',providersController.ObtenerPresentacionesIngrediente);

//http request for producers
router.get('/producers',producersController.GetProducers);
router.get('/producers/initial_test/:id',producersController.ProveedoresEvIni); //se pasa id de usuario productor

//Escalas

router.get('/producers/escala_inicial/:id',producersController.ObtenerEscalaInicialVigente);

router.get('/producers/escala_anual/:id',producersController.ObtenerEscalaAnualVigente);

router.post('/producers/escala_anual',producersController.PostEscalaInicial);
//Criterios de tipo Inicial

router.post('/producers/met_ubicacion',producersController.PostUbicacion);
router.post('/producers/met_envio',producersController.PostEnvio);
router.post('/producers/met_pago',producersController.PostPago);

module.exports = router;
