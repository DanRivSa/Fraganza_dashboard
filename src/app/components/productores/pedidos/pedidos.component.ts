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

  Pedidos:any[];
  pedido:any[];
  id_usuario:number = UserCompanyService.userCompanyID; //id de usuario
  constructor( private productores:ProducersService) { }

  ngOnInit(): void {


    this.productores.ObtenerPedidos(this.id_usuario).subscribe(res=>{
      this.pedido = res as any;
      console.log('ped',this.pedido);
    });
  }

}
