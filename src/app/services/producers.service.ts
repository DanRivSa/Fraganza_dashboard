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

  PostEscalaInicial (escala:EscalaModel)
  {
    return this.httpClient.post(`${this.base_URL}/producers/escala_inicial`,escala);
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
}
