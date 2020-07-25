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
router.get('/providers/alt_pago/:id',providersController.ObtenerAlternativasPago);
router.get('/providers/cuotas/:id',providersController.ObtenerInfoPagoCuotas);

//presentaciones
router.get('/providers/esencia/:id',providersController.ObtenerPresentacionesEsencia);
router.get('/providers/ingrediente/:id',providersController.ObtenerPresentacionesIngrediente);

//ConratosVigentes
router.get('/providers/contratos/:id',providersController.GetContratosVigentes);

//http request for producers
router.get('/producers',producersController.GetProducers);
router.get('/producers/initial_test/:id',producersController.ProveedoresEvIni); //se pasa id de usuario productor

//Escalas

router.get('/producers/escala_inicial/:id',producersController.ObtenerEscalaInicialVigente);

router.get('/producers/escala_anual/renovacion/ubicacion/:id',producersController.ObtenerUbicacionGeoVigente);

router.get('/producers/escala_anual/renovacion/pagos/:id',producersController.ObtenerPagoGeoVigente);

router.get('/producers/escala_anual/renovacion/envios/:id',producersController.ObtenerAltEnvioVigente);

router.get('/producers/escala_anual/:id',producersController.ObtenerEscalaAnualVigente);

router.get('/producers/criterios_iniciales/:id',producersController.ObtenerCriteriosEvaluacionInicial);

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
router.put('/producers/cerrar_anual/:id',producersController.CerrarAnual);
router.put('/producers/cerrar_inicial/:id',producersController.CerrarInicial);
router.get('/producers/renovar_contratos/:id',producersController.GetContratosPorVencer);

//rutas Daniel
router.put('/cerrar/escala_anual/:id',producersController.CerrarEscalaAnual);
router.put('/cerrar/criterio_anual/:id',producersController.CerrarCriterioAnual);

router.get('/producers/contratos/renovacion/:contrato',producersController.ObtenerCriterioSucces);
//RutasModuloCompras
//Obtener contratos vigentes
router.get('/producers/contratos/:id',producersController.GetContratosVigentes);
module.exports = router;

//Pedidos
router.get('/producers/contratos/detalle_contrato/:id/esencias/:contrato',producersController.GetEsenciasContratadas);

router.get('/producers/contratos/detalle_contrato/:id/ingredientes/:contrato',producersController.GetIngredientesContratados);

router.get('/producers/contratos/detalle_contrato/:id/pagos/:contrato',producersController.metodoPagoContratados);

router.get('/producers/contratos/detalle_contrato/:id/envios/:contrato',producersController.metodoEnvioContratados);

//generarPedido
router.post('/producers/compras/contratos/detalle_contrato/pedido/generar_pedido',producersController.generarPedido);
router.get('producers/compras/contratos/detalle_contrato/pedido/generar_pedido/p_esencias/:numero_contrato',producersController.PresentacionesEsenciaPedido);

router.get('producers/compras/contratos/detalle_contrato/pedido/generar_pedido/p_ingredientes/:numero_contrato',producersController.PresentacionesIgredientesPedido);

router.post('/producers/compras/contratos/detalle_contrato/pedido/generar_pedido/det_pedido',producersController.PostDetPedido);

router.get('/producers/compras/contratos/detalle_contrato/pedido/generar_pedido/det_pedido/:numero_contrato',producersController.DescuentoContrato);

