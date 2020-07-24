import { Component, OnInit } from '@angular/core';
import{ActivatedRoute} from '@angular/router';
import {ProveedoresService} from '../../../services/proveedores.service';
import { UserCompanyService } from 'src/app/services/global/user-company.service';

@Component({
  selector: 'app-contrato-prod',
  templateUrl: './contrato-prod.component.html',
  styleUrls: ['./contrato-prod.component.scss']
})
export class ContratoProdComponent implements OnInit {

  proveedores:any[];

  id_usuario:number = UserCompanyService.userCompanyID; //id de usuario 

  constructor(private servicio:ProveedoresService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>
      {
        this.id_usuario =+params.get('id');
      });

    this.servicio.GetContratosVigentes(this.id_usuario).subscribe(res=>
      {
        this.proveedores = res as any[];
      });


  }

}
