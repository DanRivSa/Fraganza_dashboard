import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProducersService
{
  base_URL = 'http://localhost:3000'

  constructor(private httpClient:HttpClient){}
  
  //methods
  getProveedoresEvIni()
  {
    //prueba
    return this.httpClient.get(`${this.base_URL}/providers`);
  }

}
