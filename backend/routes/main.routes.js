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

//http request for producers
router.get('/producers',producersController.GetProducers);

module.exports = router;
