import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ProducersService } from 'src/app/services/producers.service';
import { DetPresentacionModel } from 'src/app/models/DetPresentacionModel';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import { DescripcionModel } from 'src/app/models/Descripciones';
import { ProveedoresService } from 'src/app/services/proveedores.service';

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
  metodo_envio:any[];
  metodo_pago:string;
  total:number;
  estatus:string;
  DetPresentacionEsencias: any[];
  DetPresentacionIngredientes: any[];
  InformacionPago:boolean;
  numero_contrato:number;
  DetCuota:any[];
  PorcDescuento:number;

  //DetallePrecioTotal
  subtotal:number;
  precio_envio:number;
  descuento:number;


  constructor(private route:ActivatedRoute, private productores:ProducersService, private proveedores:ProveedoresService) { }
  ngOnInit(): void {

      this.route.paramMap.subscribe(params=>
        {
          this.id_pedido =+params.get('id_pedido');
          this.numero_contrato=+params.get('contrato');
          this.id_proveedor=+params.get('id');
        });

      this.productores.PresentacionesIngredientesAdquiridasPedido(this.numero_contrato).subscribe(res=>{
        this.DetPresentacionIngredientes = res as any[];
      });

      this.productores.DescuentoContrato(this.numero_contrato).subscribe(res=>
        {
          let descuento:any[] = res as any[];
          this.PorcDescuento = descuento[0];
        })


      this.productores.PresentacionesEsenciasAdquiridasPedido(this.numero_contrato).subscribe(res=>{
        this.DetPresentacionEsencias = res as any[];
      });

      this.productores.DetEnvioPedido(this.id_pedido).subscribe(res=>{
        this.metodo_envio = res as any[];
      });

      this.productores.DetPagoPedido(this.id_pedido).subscribe(res=>{
        let pago:any[] = res as any[];
        this.metodo_pago=pago[0].metodo_pago;
        if (this.metodo_pago = 'Pago por cuotas'){
        }
         this.productores.CaracteristicasCuotaPedido(this.numero_contrato,this.id_pedido).subscribe(res=>{
           this.DetCuota = res as any[];
         })
      })

      this.productores.GetEstatusPedido(this.id_pedido).subscribe(res=>{
        let estatus:any[] = res as any[];
        this.metodo_pago = estatus[0].estatus;
      })
    };

    //Cuando se le da click al precio total, se refleja en pantalla los detalles del mismo, es decir, un modal (como el que se usa con los CAS) El precio del pedido base es: {{subtotal}}, el precio % de recargo de envio es {{Porcdescuento}}% es: {{descuento}} y el descuento del contrato es del {{metodo_envio.porc_contratado}}% y el precio es: {{precio_envio}}
    DetallePrecio(){
        if(this.DetPresentacionIngredientes.length > 0){
          for (let i = 0; i < this.DetPresentacionIngredientes.length; i++){
                let resultado = (this.DetPresentacionIngredientes[i].cantidad*this.DetPresentacionIngredientes[i].precio);
                this.subtotal=this.subtotal+resultado;
               }
          }
         if(this.DetPresentacionEsencias.length > 0){
          for (let i = 0; i < this.DetPresentacionEsencias.length; i++){
                let resultado = (this.DetPresentacionEsencias[i].cantidad*this.DetPresentacionEsencias[i].precio);
                this.subtotal=this.subtotal+resultado;
              }
              this.descuento = this.subtotal*this.PorcDescuento/100;
              let RecargoEnvio = this.subtotal*this.metodo_envio[0].porc_contratado/100;
              this.total=this.subtotal-this.descuento+RecargoEnvio;
          }
        }



}
