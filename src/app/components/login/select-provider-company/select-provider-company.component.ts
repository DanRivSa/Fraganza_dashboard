import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import { LoginService } from 'src/app/services/global/login.service';

@Component({
  selector: 'app-select-provider-company',
  templateUrl: './select-provider-company.component.html',
  styleUrls: ['./select-provider-company.component.scss']
})
export class SelectProviderCompanyComponent implements OnInit {

  //attributes
  ID:number;
  providers:any[];

  //constructor
  constructor(private loginService:LoginService) {}

  ngOnInit(): void
  {
    this.loginService.GetProviders().subscribe(res=>
      {
        this.providers = res as any [];
        this.ID = 1;
      });
  }

  //methods
  SetUser(event:any)
  {
    this.ID = event.target.value;
  }

  Login()
  {
    if(this.ID != null)
    {
      //asign user Company Type
      UserCompanyService.userCompanyType = 2;
      UserCompanyService.userCompanyID = this.ID;
      UserCompanyService.Username = this.GetUsername();
      alert('user has been identified, please return to home screen');
    }
    else alert('please, select a company');
  }

  GetUsername():string
  {
    for (let i = 0; i < this.providers.length; i++)
    {
      if(this.providers[i].id_prov == this.ID)
      {
        return this.providers[i].nombre_prov;
      }
    }
    return null;
  }

}
