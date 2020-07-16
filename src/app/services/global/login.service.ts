import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService
{
  //attributes
  backend_URL:string ='http://localhost:3000';

  //constructor
  constructor(private httpClient:HttpClient){}

  //methods

  //for providers
  GetProviders()
  {
    return this.httpClient.get(`${this.backend_URL}/providers`);
  }

  //for producers
  GetProducers()
  {
    return this.httpClient.get(`${this.backend_URL}/producers`);
  }
}
