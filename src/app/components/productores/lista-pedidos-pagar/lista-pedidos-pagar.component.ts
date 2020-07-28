import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import { ProducersService } from 'src/app/services/producers.service';


@Component({
  selector: 'app-lista-pedidos-pagar',
  templateUrl: './lista-pedidos-pagar.component.html',
  styleUrls: ['./lista-pedidos-pagar.component.scss']
})
export class ListaPedidosPagarComponent implements OnInit {

  id_productor:number = UserCompanyService.userCompanyID; //id de usuario

  PedidosParcial:any[];
  PedidosCuotas:any[];


  constructor(private productores:ProducersService) { }

  ngOnInit(): void {

      this.productores.GetPedidosPagarParcial(this.id_productor).subscribe(res=>{
        this.PedidosParcial = res as any[];
      });
        this.productores.GetPedidosPagarCuotas(this.id_productor).subscribe(res=>{
        this.PedidosCuotas = res as any[];
        });

  }

}
