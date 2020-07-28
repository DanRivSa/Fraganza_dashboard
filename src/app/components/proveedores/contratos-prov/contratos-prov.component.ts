import { Component, OnInit } from '@angular/core';
import { ProducersService } from '../../../services/producers.service';
import { UserCompanyService } from 'src/app/services/global/user-company.service';

@Component({
  selector: 'app-contratos-prov',
  templateUrl: './contratos-prov.component.html',
  styleUrls: ['./contratos-prov.component.scss']
})
export class ContratosProvComponent implements OnInit {

  constructor(private producersService:ProducersService) { }
  proveedores:any[];

  id_usuario:number = UserCompanyService.userCompanyID; //id de usuario 

  ngOnInit(): void {


  

      this.producersService.GetContratosVigentes(this.id_usuario).subscribe(res=>
        {
          this.proveedores = res as any[];
        });
    



  }

}
