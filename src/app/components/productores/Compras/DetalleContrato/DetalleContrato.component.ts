import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProveedoresService} from '../../../../services/proveedores.service';
import {ProducersService} from '../../../../services/producers.service';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import {NgForm,NgModel} from '@angular/forms';
import {CancelacionModel} from '../../../../models/CancelacionModel';

@Component({
  selector: 'app-detalle-contrato',
  templateUrl: './DetalleContrato.component.html',
  styleUrls: ['./DetalleContrato.component.scss']
})
export class DetalleContratoComponent implements OnInit {

  EsenciasContratadas:any[];
  IngredientesContratados:any[];
  metodoPagoContratados:any[];
  metodoEnvioContratados:any[];
  id_proveedor:number;
  numero_contrato:number;
  id_productor:number = UserCompanyService.userCompanyID;
  PresentacionesContratadas: any[];

  //motivo de cancelacion
  motivo:string;

  constructor(private productor:ProducersService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>
      {
        this.id_proveedor=+params.get('id');
        this.numero_contrato=+params.get('contrato');
      });

    this.productor.GetEsenciasContratadas(this.id_proveedor,this.numero_contrato).subscribe(res=>{

      this.EsenciasContratadas = res as any[];
    });


    this.productor.GetIngredientesContratados(this.id_proveedor,this.numero_contrato).subscribe(res=>{

      this.IngredientesContratados = res as any[];
    });

    this.productor.metodoPagoContratados(this.id_proveedor,this.numero_contrato).subscribe(res=>{

      this.metodoPagoContratados = res as any[];
    });

    this.productor.metodoEnvioContratados(this.id_proveedor,this.numero_contrato).subscribe(res=>{

      this.metodoEnvioContratados = res as any[];
    })


  }

  CancelarContrato()
  {

  }

  CrearMotivo():CancelacionModel
  {
    let can = new CancelacionModel();
    can.motivo = this.motivo;
    return can;
  }

}
