import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { QuejaModel } from '../models/QuejaModel';
import { DescripcionModel } from '../models/Descripciones';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService
{

  //atributos
  url_base:string = 'http://localhost:3000';

  constructor(private cliente:HttpClient)
  {
  }

  //metodos
  ObtenerNombre(id:number)
  {
    return this.cliente.get(`${this.url_base}/providers/nombre/${id}`);
  }

  ObtenerEsencias(id:number)
  {
    return this.cliente.get(`${this.url_base}/providers/esencias/${id}`);
  }

  ObtenerIngredietes(id:number)
  {
    return this.cliente.get(`${this.url_base}/providers/ingredientes/${id}`);
  }

  ObtenerAlternativasDeEnvio(id:number)
  {
    return this.cliente.get(`${this.url_base}/providers/alt_envio/${id}`);
  }

  ObtenerAlternativasdePago(id:number)
  {
    return this.cliente.get(`${this.url_base}/providers/alt_pago/${id}`);
  }

  ObtenerInfoPagoCuotas(id:number)
  {
    return this.cliente.get(`${this.url_base}/providers/cuotas/${id}`);
  }

  ObtenerPresentacionesEsencia(cas:number)
  {
    return this.cliente.get(`${this.url_base}/providers/esencia/${cas}`);
  }

  ObtenerPresentacionesingrediente(cas_oi:number)
  {
    return this.cliente.get(`${this.url_base}/providers/ingrediente/${cas_oi}`);
  }

  GetContratosVigentes(id_proveedor:number)
  {
    return this.cliente.get(`${this.url_base}/providers/contratos/${id_proveedor}`);
  }

  ObtenerAtEnvioParaContrato(id_prod:number,id_prov:number)
  {
    return this.cliente.get(`${this.url_base}/alt_envio/contrato/${id_prod}/${id_prov}`);
  }

  ObtenerContratosPendientes(id_proveedor:number)
  {
    return this.cliente.get(`${this.url_base}/providers/contratos_pendientes/${id_proveedor}`);
  }

  CancelarContrato(numero:number)
  {
    return this.cliente.put(`${this.url_base}/providers/cancelar/contrato/${numero}`,{});

  }

  AceptarContrato(numero:number)
  {
    return this.cliente.put(`${this.url_base}providers/aceptar/contrato/${numero}`,{});
  }

  RechazarContrato(numero:number)
  {
    return this.cliente.put(`${this.url_base}/providers/rechazar/contrato/${numero}`,{});
  }
  ConfirmarPedido(id_pedido:number, detalle:DescripcionModel)
  {
    return this.cliente.put(`${this.url_base}/providers/pedidos/detalle_pedido/confirmar_pedido/${id_pedido}`,detalle);
  }

  RechazarPedido(id_pedido:number, detalle:DescripcionModel)
  {
    return this.cliente.put(`${this.url_base}/providers/pedidos/detalle_pedido/rechazar_pedido/${id_pedido}`,detalle);
  }

}
