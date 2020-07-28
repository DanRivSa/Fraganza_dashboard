
import { ActivatedRoute } from '@angular/router';
import { ProducersService } from 'src/app/services/producers.service';
import { DetPresentacionModel } from 'src/app/models/DetPresentacionModel';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import { DescripcionModel } from 'src/app/models/Descripciones';
import { ProveedoresService } from 'src/app/services/proveedores.service';


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-pedido-proveedor',
  templateUrl: './detalle-pedido-proveedor.component.html',
  styleUrls: ['./detalle-pedido-proveedor.component.scss']
})
export class DetallePedidoProveedorComponent implements OnInit {

  id_pedido:number;
  id_proveedor:number = UserCompanyService.userCompanyID;
  id_productor:number;
  numero_contrato:number;

  metodo_envio:any[];
  metodo_pago:string;

  PorcDescuento:number;
  subtotal:number;
  total:number;

  //DetallePrecioTotal
  precio_envio:number;
  descuento:number;

  estatus:string;
  ModificarEstatus:boolean;

  DetPresentacionEsencias: any[];
  DetPresentacionIngredientes: any[];
  DetCuota:any[];

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
       this.productores.CaracteristicasCuotaPedido(this.numero_contrato,this.id_pedido).subscribe(res=>{
         this.DetCuota = res as any[];
       })
      }
    })

    this.productores.GetEstatusPedido(this.id_pedido).subscribe(res=>{
      let estatus:any[] = res as any[];
      this.metodo_pago = estatus[0].estatus;
      //Si el usuario es el mismo proveedor, y el estatus es pendiente, mostrar en la interfaz lo relacionado a modificar estatus pedido
      if(this.estatus=='PENDIENTE'){
        this.ModificarEstatus = true;
      }
    });
  }


  CambiarEstatusPedido(opcion:number,detalle:string){
    switch (opcion) {
      case 1: //Confirmado
        let det1 = new DescripcionModel();
        det1.descripcion=detalle;
        this.proveedores.ConfirmarPedido(this.id_pedido,det1).subscribe(res=>
          {
              this.estatus='ENVIADO';
              alert('El estatus del pedido se actualizó de forma satisfactoria');
          });
      break;

      case 2: //Rechazado
      let det2 = new DescripcionModel;
      det2.descripcion=detalle;
      this.proveedores.RechazarPedido(this.id_pedido,det2).subscribe(res=>
        {
            this.estatus='RECHAZADO';
            alert('El estatus del pedido se actualizó de forma satisfactoria');
        });
    break;
      default:
        break;
    }

  };
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
