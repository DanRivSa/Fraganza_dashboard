import { Component, OnInit } from '@angular/core';
import { ProducersService } from '../../../services/producers.service';
import { UserCompanyService } from 'src/app/services/global/user-company.service';

@Component({
  selector: 'app-initial-test',
  templateUrl: './initial-test.component.html',
  styleUrls: ['./initial-test.component.scss']
})
export class InitialTestComponent implements OnInit {

  proveedores:any[];

  id_usuario:number = UserCompanyService.userCompanyID; //id de usuario 

  constructor(private producersService:ProducersService)
  {
    
  }

  ngOnInit(): void
  {
    this.producersService.FiltrarProveedoresIniciales(this.id_usuario).subscribe(res=>
      {
        this.proveedores = res as any[];
      });
  }

}
