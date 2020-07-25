import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import {ProveedoresService} from '../../../services/proveedores.service';
import { ProducersService } from '../../../services/producers.service';

import{ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-contrato-produ',
  templateUrl: './contrato-produ.component.html',
  styleUrls: ['./contrato-produ.component.scss']
})
export class ContratoProduComponent implements OnInit {

  
  productores:any[];
  id_usuario:number = UserCompanyService.userCompanyID; //id de usuario 

  constructor(private servicio:ProveedoresService) { }

  ngOnInit(): void {


    this.servicio.GetContratosVigentes(this.id_usuario).subscribe(res=>{

      this.productores = res as any[];

    });

  }

}
