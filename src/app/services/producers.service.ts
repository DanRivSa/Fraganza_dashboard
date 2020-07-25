import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EscalaModel} from '../models/EscalaModel';
import {CriterioModel} from '../models/CriterioModel';

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



  PutCerrarEscalaInicial (id_productor:number,escala:EscalaModel)
  {
    return this.httpClient.put(`${this.base_URL}/producers/escala_inicial/${id_productor}`,escala);
  }
  PutCerrarEscalaAnual (id_productor:number,escala:EscalaModel)
  {
    return this.httpClient.put(`${this.base_URL}/escala_anual/${id_productor}`,escala);
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

  //Modulo Compras
  GetContratosVigentes (id_productor:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/contratos/${id_productor}`);
  }
  //Pedidos
  GetEsenciasContratadas (id_proveedor:number, numero_contrato:number)
  {
    return this.httpClient.get(`${this}/producers/contratos/detalle_contrato/${id_proveedor}/esencias/${numero_contrato}`);
  }

  GetIngredientesContratados (id_proveedor:number, numero_contrato:number)
  {
    return this.httpClient.get(`${this}/producers/contratos/detalle_contrato/${id_proveedor}/ingredientes/${numero_contrato}`);
  }

  metodoPagoContratados (id_proveedor:number, numero_contrato:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/contratos/detalle_contrato/${id_proveedor}/pagos/${numero_contrato}`);
  }

  metodoEnvioContratados (id_proveedor:number, numero_contrato:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/contratos/detalle_contrato/${id_proveedor}/envios/${numero_contrato}`);
  }

  ObtenerCriteriosEvaluacionInicial(id_usuario_productor:number)
  {
    return this.httpClient.get(`${this.base_URL}/producers/Criterios_vigentes/${id_usuario_productor}`);
  }

}
