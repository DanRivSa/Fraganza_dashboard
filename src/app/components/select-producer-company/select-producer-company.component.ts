import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from 'src/app/services/global/user-company.service';

@Component({
  selector: 'app-select-producer-company',
  templateUrl: './select-producer-company.component.html',
  styleUrls: ['./select-producer-company.component.scss']
})
export class SelectProducerCompanyComponent implements OnInit {

  ID:number;

  constructor()
  {
    
  }

  ngOnInit(): void {
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
      alert('user has been identified, please return to home screen');
    }
    else alert('please, select a company');
  }

}
