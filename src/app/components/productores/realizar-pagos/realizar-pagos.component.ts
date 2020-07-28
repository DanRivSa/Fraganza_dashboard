import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import { DescripcionModel } from 'src/app/models/Descripciones';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ActivatedRoute } from '@angular/router';
import { ProducersService } from 'src/app/services/producers.service';
import { ThrowStmt } from '@angular/compiler';
import { PagoModel } from 'src/app/models/PagoModel';




@Component({
  selector: 'app-realizar-pagos',
  templateUrl: './realizar-pagos.component.html',
  styleUrls: ['./realizar-pagos.component.scss']
})
export class RealizarPagosComponent implements OnInit {
//Los que tengan // son los que no se muestran
  id_pedido:number; //
  EstatusPedido:string; //
  MetodoPago:string;
  Parcial:boolean; //
  Cuota:boolean; //
  Contador:number;
  numero_contrato:number;
  porc_envio:number;
  precio_envio:number;
  porc_descuento:number;
  precio_descuento:number;
  subtotal:number;
  total:number;

  //Para boton de cuota
  porc_cuota:number;
  precio_cuota:number;


  constructor(private proveedores : ProveedoresService, private route: ActivatedRoute, private productores:ProducersService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>
      {
        this.id_pedido = +params.get('id_pedido');
        this.numero_contrato = +params.get('numero_contrato')
      })

      this.productores.DetEnvioPedido(this.id_pedido).subscribe(res=>{
        let porcentaje:any[] = res as any[];
        this.porc_envio = porcentaje[0].porc_contratado;
        this.total = porcentaje[0].total;
        this.precio_envio = porcentaje[0].porc_contratado/100;
      });

      this.productores.DetPagoPedido(this.id_pedido).subscribe(res=>{
        let pago:any[] = res as any[];
        console.log(pago);
        this.MetodoPago=pago[0].metodo_pago;
        if (this.MetodoPago == 'Pago por cuotas'){
          this.Cuota = true;
         this.productores.GetContadorCuotas(this.id_pedido).subscribe(res=>{
           let nro_cuota:any[] = res as any[];
           this.Contador = nro_cuota[0].cuotas;
           this.porc_cuota = nro_cuota[0].porc_cuota;

           this.precio_cuota=this.total*(nro_cuota[0].porc_cuota/100);

         });
        }
        else this.Parcial=true;
    })
    this.productores.DescuentoContrato(this.numero_contrato).subscribe(res=>{
      let valor:any[] = res as any[];
      console.log(valor);
      this.porc_descuento = valor[0].descuento;
      this.precio_descuento = valor[0].descuento/100;
    })

  }

  Pagar(){
    if(this.Cuota){
      let pago = new PagoModel();
      pago.id_pedido = this.id_pedido;
      pago.monto_total = this.precio_cuota;
      this.productores.Pagar(pago).subscribe(res=>{
        alert('Pago exitoso');
      })

    }
    else (this.Parcial)
      let pago = new PagoModel();
      pago.id_pedido = this.id_pedido;
      pago.monto_total = this.total;
      this.productores.Pagar(pago).subscribe(res=>{
        alert('Pago exitoso');
      })
  }


}
