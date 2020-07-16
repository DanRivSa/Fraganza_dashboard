import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import {LoginService} from 'src/app/services/global/login.service'

@Component({
  selector: 'app-select-producer-company',
  templateUrl: './select-producer-company.component.html',
  styleUrls: ['./select-producer-company.component.scss']
})
export class SelectProducerCompanyComponent implements OnInit {

  //attributes
  ID:number;
  producers:any[];

  constructor(private loginService:LoginService){}

  ngOnInit(): void
  {
    this.loginService.GetProducers().subscribe(res=>
      {
        //listen server 3000 response
        this.producers = res as any[]; //get db this.producers
        this.ID = 1;
      });
  }

  SetUser(event:any)
  {
    this.ID = event.target.value;
  }

  Login()
  {
    if(this.ID != null)
    {
      //asign user Company Type
      UserCompanyService.userCompanyType = 1;
      UserCompanyService.userCompanyID = this.ID;
      UserCompanyService.Username = this.GetUsername();
      alert('user has been identified, please return to home screen');
    }
    else alert('please, select a company');
  }

  GetUsername():string
  {
    for (let i = 0; i < this.producers.length; i++)
    {
      if(this.producers[i].id_prod == this.ID)
        return this.producers[i].nombre_prod;
    }
    return null;
  } 

}
