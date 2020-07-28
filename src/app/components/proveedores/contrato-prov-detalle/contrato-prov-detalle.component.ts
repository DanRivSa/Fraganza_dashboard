import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ProducersService } from 'src/app/services/producers.service';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import { CancelacionModel } from '../../../models/CancelacionModel';
import {ProveedoresService} from '../../../services/proveedores.service';
import {NgForm,NgModel} from '@angular/forms';

@Component({
  selector: 'app-contrato-prov-detalle',
  templateUrl: './contrato-prov-detalle.component.html',
  styleUrls: ['./contrato-prov-detalle.component.scss']
})
export class ContratoProvDetalleComponent implements OnInit {


  EsenciasContratadas:any[];
  IngredientesContratados:any[];
  metodoPagoContratados:any[];
  metodoEnvioContratados:any[];
  id_proveedor:number;
  numero_contrato:number;
  id_productor:number = UserCompanyService.userCompanyID;
  PresentacionesContratadas: any[];
  motivo:string;

  constructor(private productor:ProducersService, private route: ActivatedRoute,private proveedor:ProveedoresService) { }

  ngOnInit(): void {



    this.route.paramMap.subscribe(params=>
      {
        this.id_proveedor=+params.get('id');
        this.numero_contrato=+params.get('contrato');
        
        console.log(this.id_proveedor);
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
    this.productor.CancelarContratoDef(this.numero_contrato,this.CrearMotivo()).subscribe(res=>
      {
        console.log('motivo guardado');
        alert('contrato cancelado');
      });
  }

  CrearMotivo():CancelacionModel
  {
    let can = new CancelacionModel();
    can.motivo_cancelacion = this.motivo;
    return can;
  }


  ObtenerPresentaciones(codigo:number,opcion:number)
  {
    switch (opcion) {
      case 1: //esencias
        this.proveedor.ObtenerPresentacionesEsencia(codigo).subscribe(res=>
          {
            this.PresentacionesContratadas = res as any[];
          });
      break;
      case 2: //ingredientes
        this.proveedor.ObtenerPresentacionesingrediente(codigo).subscribe(res=>
          {
            this.PresentacionesContratadas = res as any[];
          });
       break;

      default:
        break;
    }
  }




}
