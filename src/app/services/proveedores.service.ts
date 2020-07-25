import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
}
