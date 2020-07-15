import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from 'src/app/services/global/user-company.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit 
{
  userType:number = UserCompanyService.userCompanyType;
  userID:number = UserCompanyService.userCompanyID;
  
  constructor() { }

  ngOnInit(): void {}

  Logout()
  {
    if(confirm('are you sure you want to quit?'))
        location.reload();
  }
}
