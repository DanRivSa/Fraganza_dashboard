import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProducersService } from 'src/app/services/producers.service';
import { DetPresentacionModel } from 'src/app/models/DetPresentacionModel';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss']
})
export class DetallePedidoComponent implements OnInit {

  id_pedido:number;
  usuario:number = UserCompanyService.userCompanyID;
  id_proveedor:number;
  id_productor:number;
  metodo_envio:any[]
  metodo_pago:any[];
  total:number;
  ConfirmarPedido:boolean;
  estatus:any[];
  DetPresentacionEsencias: any[];
  DetPresentacionIngredientes: any[];
  InformacionPago:any[];
  numero_contrato:number;

  constructor(private route:ActivatedRoute, private productores:ProducersService) { }
  ngOnInit(): void {

      this.route.paramMap.subscribe(params=>
        {
          this.id_pedido =+params.get('id_pedido');
          this.numero_contrato=+params.get('contrato');
          this.id_proveedor=+params.get('id');
        });

      this.productores.PresentacionesIngredientesAdquiridasPedido(this.numero_contrato).subscribe(res=>{
        this.DetPresentacionIngredientes = res as any[];
      })


      this.productores.PresentacionesEsenciasAdquiridasPedido(this.numero_contrato).subscribe(res=>{
        this.DetPresentacionEsencias = res as any[];
      });

      this.productores.DetEnvioPedido(this.id_pedido).subscribe(res=>{
        this.metodo_envio = res as any[];
      })

      this.productores.DetPagoPedido(this.id_pedido).subscribe(res=>{
        this.metodo_pago=res as any[];
      })
      this.productores.GetEstatusPedido(this.id_pedido).subscribe(res=>{
        this.estatus=res as any[];

        if((this.usuario=this.id_proveedor) && this.estatus[0]=='PENDIENTE'){
          this.ConfirmarPedido = true;
        };
      })
    }

/*
    CambiarEstatusPedido(opcion:number){
      switch (opcion) {
        case 1: //Enviado
          this.servicio.ObtenerPresentacionesEsencia(codigo).subscribe(res=>
            {
              this.presentaciones = res as any[];
            });
        break;

        case 2: //ingredientes
          this.servicio.ObtenerPresentacionesingrediente(codigo).subscribe(res=>
            {
              this.presentaciones = res as any[];
            });
         break;

        default:
          break;
      }
    };

*/

}
