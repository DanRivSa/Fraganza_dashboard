import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EscalaModel} from '../models/EscalaModel';
import {CriterioModel} from '../models/CriterioModel';
import {PedidoModel} from '../models/PedidoModel';
import {QuejaModel} from '../models/QuejaModel';
import {RenovacionContratoModel} from '../models/RenovacionContratoModel';
import {DetPresentacionModel} from '../models/DetPresentacionModel';
import {ResultadoModel} from '../models/Resultado';

@Injectable({
  providedIn: 'root'
})
export class ProducersService
{
  base_URL = 'http://localhost:3000'

  constructor(private httpClient:HttpClient){}

  //methods
  FiltrarProveedoresIniciales(id_usuario_productor:number)
  {
    //prueba
    return this.httpClient.get(`${this.base_URL}/producers/initial_test/${id_usuario_productor}`);
  }

  ObtenerEscalaInicialVigente(id_usuario_productor:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/escala_inicial/${id_usuario_productor}`);
  }

  ObtenerEscalaAnualVigente(id_usuario_productor:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/escala_anual/${id_usuario_productor}`);
  }
  ObtenerCriteriosEvaluacionInicial(id_usuario_productor:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/criterios_iniciales/${id_usuario_productor}`);
  }

  ObtenerUbicacionGeoVigente (id_usuario_productor:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/escala_anual/renovacion/ubicacion/${id_usuario_productor}`);
  }
  ObtenerPagoGeoVigente (id_usuario_productor:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/escala_anual/renovacion/pagos/${id_usuario_productor}`);
  }
  ObtenerAltEnvioVigente (id_usuario_productor:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/escala_anual/renovacion/envios/${id_usuario_productor}`);
  }

  PostEscalaInicial (escala:EscalaModel)
  {
    return this.httpClient.post(`${this.base_URL}/producers/escala_inicial`,escala);
  }

  PostEscalaAnual (escala:EscalaModel)
  {
    return this.httpClient.post(`${this.base_URL}/producers/escala_anual`,escala);
  }

  PostUbicacion (criterio:CriterioModel)
  {
    return this.httpClient.post(`${this.base_URL}/producers/met_ubicacion`,criterio);
  }

  PostEnvio (criterio:CriterioModel)
  {
    return this.httpClient.post(`${this.base_URL}/producers/met_envio`,criterio);
  }

  PostPago (criterio: CriterioModel)
  {
    return this.httpClient.post(`${this.base_URL}/producers/met_pago`,criterio);
  }

  PostCriteriosAnual (criterio: CriterioModel)
  {
    return this.httpClient.post(`${this.base_URL}/producers/renovacion`,criterio);
  }

  //peticiones daniel
  CerrarEscalaAnual(id:number,modelo:EscalaModel)
  {
    return this.httpClient.put(`${this.base_URL}/cerrar/escala_anual/${id}`,modelo);
  }

  CerrarCriterioAnual(id:number,modelo:CriterioModel)
  {
    return this.httpClient.put(`${this.base_URL}/cerrar/criterio_anual/${id}`,modelo);
  }


  PutCerrarEscalaInicial (id_productor:number,escala:EscalaModel)
  {
    return this.httpClient.put(`${this.base_URL}/producers/escala_inicial/${id_productor}`,escala);
  }
  PutCerrarEscalaAnual (id_productor:number,escala:EscalaModel)
  {
    return this.httpClient.put(`${this.base_URL}/producers/escala_anual/${id_productor}`,escala);
  }
  PutCerrarCriteriosInicial (id_productor:number,criterio:CriterioModel)
  {
    return this.httpClient.put(`${this.base_URL}/producers/inicial/${id_productor}`,criterio);
  }

  PutCerrarCriteriosAnual (id_productor:number,criterio:CriterioModel)
  {
    return this.httpClient.put(`${this.base_URL}/producers/anual/${id_productor}`,criterio);
  }

  GetContratosPorVencer (id_productor:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/renovar_contratos/${id_productor}`);
  }

  ObtenerCriterioSucces(numero_contrato:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/contratos/renovacion/${numero_contrato}`)
  }

  //Modulo Compras
  GetContratosVigentes (id_productor:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/contratos/${id_productor}`);
  }
  //Pedidos
  GetEsenciasContratadas (id_proveedor:number, numero_contrato:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/contratos/detalle_contrato/${id_proveedor}/esencias/${numero_contrato}`);
  }

  GetIngredientesContratados (id_proveedor:number, numero_contrato:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/contratos/detalle_contrato/${id_proveedor}/ingredientes/${numero_contrato}`);
  }

  metodoPagoContratados (id_proveedor:number, numero_contrato:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/contratos/detalle_contrato/${id_proveedor}/pagos/${numero_contrato}`);
  }

  metodoEnvioContratados (id_proveedor:number, numero_contrato:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/contratos/detalle_contrato/${id_proveedor}/envios/${numero_contrato}`);
  }

  generarPedido(Pedido:PedidoModel)
  {
    return this.httpClient.post(`${this.base_URL}/producers/compras/contratos/detalle_contrato/pedido/generar_pedido`,Pedido);
  }

  PresentacionesEsenciaPedido(numero_contrato:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/compras/contratos/detalle_contrato/pedido/generar_pedido/p_esencias/${numero_contrato}`);
  }

  PresentacionesIgredientesPedido(numero_contrato:number)
  {
    return this.httpClient.get(`${this.base_URL}producers/compras/contratos/detalle_contrato/pedido/generar_pedido/p_ingredientes/${numero_contrato}`);
  }

  ObtenerPedidos(id:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/pedidos/${id}`);
  }

  //RESULTADO DE EVALUACIONES
  GuardarResultadoInicial(id_prod:number,id_prov:number,resultado:number)
  {
    return this.httpClient.post(`${this.base_URL}/guardar_resultado/inicial/${id_prod}`,{id_prov,resultado});
  }

  GuardarResultado(id_prod:number,resultado:ResultadoModel)
  {
    return this.httpClient.post(`${this.base_URL}/guardar_resultado/${id_prod}`,resultado);
  }

  CancelarContrato(numero_contrato:number,descripcion:QuejaModel)
  {
    return this.httpClient.put(`${this.base_URL}/producers/contratos/detalle_contrato/cancelar/${numero_contrato}`,descripcion);
  }

  //PRUEBA


  CerrarAnual(id:number,escala:EscalaModel)
  {
    return this.httpClient.put(`${this.base_URL}/producers/cerrar_anual/${id}`,escala);
  }

  CerrarInicial(id:number,escala:EscalaModel)
  {
    return this.httpClient.put(`${this.base_URL}/producers/cerrar_inicial/${id}`,escala);
  }

  PostDetPedido (DetPedido:DetPresentacionModel)
  {
    return this.httpClient.post(`${this.base_URL}/producers/compras/contratos/detalle_contrato/pedido/generar_pedido/det_pedido`,DetPedido);
  }

  DescuentoContrato (numero_contrato:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/compras/contratos/detalle_contrato/${numero_contrato}`);
  }

  PresentacionesIngredientesAdquiridasPedido(id_pedido:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/compras/pedidos/ingredientes/${id_pedido}`);
  }

  PresentacionesEsenciasAdquiridasPedido (id_pedido:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/compras/pedidos/esencias/${id_pedido}`);
  }

  DetEnvioPedido (id_pedido:number)
  {
    return this.httpClient.get(`${this,this.base_URL}/producers/compras/pedidos/detalle_envio/${id_pedido}`);
  }

  RenovarContrato(id_prod:number,contrato:RenovacionContratoModel)
 {
   return this.httpClient.post(`${this.base_URL}/renovar/contrato/${id_prod}`,contrato);
}

  FechaParaRenovacion(num_c:number)
  {
    return this.httpClient.get(`${this.base_URL}/fecha_renovacion/${num_c}`);
  }

  DetPagoPedido (id_pedido:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/compras/pedidos/detalle_pago/${id_pedido}`);
  }

  GetEstatusPedido(id_pedido:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/compras/pedidos/estatus/${id_pedido}`);
  }
}
