import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProducersService } from 'src/app/services/producers.service';
import { DetPresentacionModel } from 'src/app/models/DetPresentacionModel';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})
export class DetallePedidoComponent implements OnInit {

  id_pedido:number;
  id_productr:number;
  id_proveedor:number;
  metodo_envio:[any];
  metodo_pago:[any];
  id_pais:number;
  total:number;
  estatus:string;
  DetPresentacion: any[];
  InformacionPago:any[];
  numero_contrato:number;

  constructor(private route:ActivatedRoute, private productores:ProducersService) { }
  ngOnInit(): void {

      this.route.paramMap.subscribe(params=>
        {
          this.id_pedido =+params.get('id_pedido');
          this.numero_contrato=+params.get('contrato');
          this.id_productr=+params.get('id');
        });
      this.productores.PresentacionesEsenciaPedido(this.numero_contrato).subscribe(res=>{
        this.DetPresentacion = res as any;
      });

  }

}
