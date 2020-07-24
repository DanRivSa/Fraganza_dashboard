import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import{ActivatedRoute} from '@angular/router';
import {ProducersService} from '../../../../services/producers.service';
import {ProveedoresService} from '../../../../services/proveedores.service';



@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit {

  id_contratos_vigentes:number[];
  id_proveedores:number[];
  id_productor:number = UserCompanyService.userCompanyID;
  nombre_productor:string[];

  constructor(private servicio:ProducersService, private route:ActivatedRoute, private proveedorServicio:ProveedoresService) { }

  ngOnInit(): void {


    this.servicio.GetContratosVigentes(this.id_productor).subscribe(res=>{

      let data:any[] = res as any[];
      for (let i = 0; i < data.length; i++)
      {

        this.id_contratos_vigentes[i] = data[i].numero_contrato;
        this.id_proveedores[i] = data[i].id_prov;
        this.nombre_productor[i] = data[i].nombre_prov;
      }

    });

  }
}
