import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserCompanyService
{

  static userCompanyID:number;
  static userCompanyType:number;
  static Username:string;
  //1 if it is a producer, 2 if it is a provider
  constructor() {}

}
