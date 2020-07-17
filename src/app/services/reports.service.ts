import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService 
{

  //attributes
  base_URL:string = 'http://localhost:3000';

  constructor(private httpClient:HttpClient) {}

  //metodos

  getProviderReport(id:number)
  {
    return this.httpClient.get(`${this.base_URL}/providers/${id}`);
  }
  
}
