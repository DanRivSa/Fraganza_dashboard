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
  usuario:number 
  id_proveedor:number= UserCompanyService.userCompanyID;
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
  resultado:number;

  //DetallePrecioTotal
  subtotal:number;
  precio_envio:number;
  descuento:number;
  RecargoEnvio:number;
  porcenvio:number;


  constructor(private route:ActivatedRoute, private productores:ProducersService, private proveedores:ProveedoresService) { }
  ngOnInit(): void {

      this.route.paramMap.subscribe(params=>
        {
          this.id_pedido =+params.get('id_pedido');
          this.numero_contrato=+params.get('contrato');
          console.log('contrato',this.numero_contrato);
          console.log('pedido',this.id_pedido);
        });

      this.productores.PresentacionesIngredientesAdquiridasPedido(this.id_pedido).subscribe(res=>{
        this.DetPresentacionIngredientes = res as any[];
        console.log('ingredientes',this.DetPresentacionIngredientes);
      });

      this.productores.DescuentoContrato(this.numero_contrato).subscribe(res=>
        {
          let descuento:any[] = res as any[];
          this.PorcDescuento = descuento[0].descuento;
          console.log('porc',this.PorcDescuento);
        })


      this.productores.PresentacionesEsenciasAdquiridasPedido(this.id_pedido).subscribe(res=>{
        this.DetPresentacionEsencias = res as any[];
        console.log('esencias',this.DetPresentacionEsencias);
      });

      this.productores.DetEnvioPedido(this.id_pedido).subscribe(res=>{
        this.metodo_envio = res as any[];
        console.log('idprov',this.metodo_envio);
      });

      this.productores.DetPagoPedido(this.id_pedido).subscribe(res=>{
        let pago:any[] = res as any[];
        this.metodo_pago=pago[0].metodo_pago;
        if (this.metodo_pago = 'Pago por cuotas'){
        }
         this.productores.CaracteristicasCuotaPedido(this.numero_contrato,this.id_pedido).subscribe(res=>{
           this.DetCuota = res as any[];
           console.log('porc2',this.DetCuota);
         })
      })

      this.productores.GetEstatusPedido(this.id_pedido).subscribe(res=>{
        let estatus:any[] = res as any[];
        this.estatus = estatus[0].estatus;
        console.log('estatus',estatus);
      })
    };

    //Cuando se le da click al precio total, se refleja en pantalla los detalles del mismo, es decir,
    //un modal (como el que se usa con los CAS) El precio del pedido base es: {{subtotal}}, el precio % 
    //de recargo de envio es {{Porcdescuento}}% es: {{descuento}} y el descuento del contrato es del 
    //{{metodo_envio.porc_contratado}}% y el precio es: {{precio_envio}}


    DetallePrecio(){
        if(this.DetPresentacionIngredientes.length > 0){
          console.log('i1',this.DetPresentacionIngredientes[1].cantidad);
          for (let i = 0; i < this.DetPresentacionIngredientes.length; i++){
                this.resultado = (this.DetPresentacionIngredientes[i].cantidad * this.DetPresentacionIngredientes[i].precio);

                
               }

          }
         if(this.DetPresentacionEsencias.length > 0){
          for (let i = 0; i < this.DetPresentacionEsencias.length; i++){
            this.resultado = (this.DetPresentacionEsencias[i].cantidad*this.DetPresentacionEsencias[i].precio);
              }
              
          }
              this.descuento = ((this.resultado*this.PorcDescuento)/100);
              this.RecargoEnvio = ((this.resultado*this.metodo_envio[0].porc_contratado)/100);
              this. porcenvio=this.metodo_envio[0].porc_contratado
              this.total=(this.resultado-this.descuento+this.RecargoEnvio);
              console.log('envio',this.metodo_envio[0].porc_contratado);
              console.log('descuen',this.PorcDescuento);

        }



}
