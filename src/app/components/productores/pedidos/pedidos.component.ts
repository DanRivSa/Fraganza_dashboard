import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProducersService } from 'src/app/services/producers.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  id_pedido:number;
  id_productor:number;
  id_proveedor:number;
  metodo_envio:[any];
  metodo_pago:[any];
  id_pais:number;
  total:number;
  estatus:string;
  DetPresentacion: any[];
  InformacionPago:any[];
  numero_contrato:number;
  pedidos:any[];
  id:number;




  constructor(private route:ActivatedRoute, private productores:ProducersService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(paramas=>
      {
        this.id = +paramas.get('id');//id proveedor
      });

    this.productores.PresentacionesEsenciaPedido(this.numero_contrato).subscribe(res=>{
      this.DetPresentacion = res as any;
    });
    this.productores.ObtenerPedidos(this.id_productor).subscribe(res=>{
      this.DetPresentacion = res as any;
    });


  }

}
