import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProveedoresService} from '../../../../services/proveedores.service';
import {ProducersService} from '../../../../services/producers.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  productosContratados:any[];
  metodoPagoContratados:any[];
  metodoEnvioContratados:any[];
  id_proveedor:number;
  numero_contrato:number;

  constructor(private productor:ProducersService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>
      {
        this.id_proveedor=+params.get('id');
        this.numero_contrato=+params.get('contrato');
      });

  }

}
