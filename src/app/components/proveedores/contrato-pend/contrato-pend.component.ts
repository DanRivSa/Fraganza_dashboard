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
  contratos_pendientes:any[];

  id_usuario:number = UserCompanyService.userCompanyID; //id de usuario 

  ngOnInit(): void {


  

    this.servicio.ObtenerContratosPendientes(this.id_usuario).subscribe(res=>{

      this.contratos_pendientes = res as any[];

    });
  
}

Aceptar(obj:any)
{
  let num:number = obj.numero_contrato;
  this.servicio.AceptarContrato(num).subscribe(res=>
    {
      alert(`contrato ${num} aceptado`);
    });
}

Rechazar(obj:any)
{
  let num:number= obj.numero_contrato;
  this.servicio.RechazarContrato(num).subscribe(res=>
    {
      alert(`contrato ${num} cancelado`);
    })
}

}
