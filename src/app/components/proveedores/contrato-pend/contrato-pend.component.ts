import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import {ProveedoresService} from '../../../services/proveedores.service';
import { ProducersService } from '../../../services/producers.service';

@Component({
  selector: 'app-contrato-pend',
  templateUrl: './contrato-pend.component.html',
  styleUrls: ['./contrato-pend.component.scss']
})
export class ContratoPendComponent implements OnInit {

  constructor(private servicio:ProveedoresService) { }
  productores:any[];

  id_usuario:number = UserCompanyService.userCompanyID; //id de usuario 

  ngOnInit(): void {


  

    this.servicio.GetContratosVigentes(this.id_usuario).subscribe(res=>{

      this.productores = res as any[];

    });
  



}
}
