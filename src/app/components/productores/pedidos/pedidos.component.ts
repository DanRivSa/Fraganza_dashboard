import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProducersService } from 'src/app/services/producers.service';
import { UserCompanyService } from 'src/app/services/global/user-company.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  id_pedido:number;
  id_productor:number;
  
  metodo_envio:[any];
  metodo_pago:[any];
  id_pais:number;
  total:number;
  estatus:string;
  DetPresentacion: any[];
  InformacionPago:any[];
  numero_contrato:number;
  pedido:any[];
  id_usuario:number = UserCompanyService.userCompanyID; //id de usuario 


  constructor( private productores:ProducersService) { }

  ngOnInit(): void {


    this.productores.ObtenerPedidos(this.id_usuario).subscribe(res=>{
      this.pedido = res as any;
    });


  }

}
