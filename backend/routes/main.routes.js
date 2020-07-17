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
router.get('/providers/:id',providersController.GetPDFInfo);

//http request for producers
router.get('/producers',producersController.GetProducers);
router.get('/producers/initial_test/:id',producersController.ProveedoresEvIni); //se pasa id de usuario productor

module.exports = router;
