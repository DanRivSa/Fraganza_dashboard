import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from 'src/app/services/global/user-company.service';

@Component({
  selector: 'app-select-provider-company',
  templateUrl: './select-provider-company.component.html',
  styleUrls: ['./select-provider-company.component.scss']
})
export class SelectProviderCompanyComponent implements OnInit {

  ID:number;

  constructor() {}

  ngOnInit(): void {}

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
      alert('user has been identified, please return to home screen');
    }
    else alert('please, select a company');
  }

}
