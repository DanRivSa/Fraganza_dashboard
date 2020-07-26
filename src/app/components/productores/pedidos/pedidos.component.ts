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
  pedido:any[];
  id:number;




  constructor(private route:ActivatedRoute, private productores:ProducersService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>
      {
        this.id_proveedor=+params.get('id');
        this.numero_contrato=+params.get('contrato');
      });


//   this.productores.PresentacionesEsenciaPedido(this.numero_contrato).subscribe(res=>{
//    this.DetPresentacion = res as any;
//  });
    this.productores.ObtenerPedidos(this.id).subscribe(res=>{
      this.DetPresentacion = res as any;
    });


  }

}
