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

  id_productor:number = UserCompanyService.userCompanyID;

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
