import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import { ActivatedRoute } from '@angular/router';
import { ProducersService } from 'src/app/services/producers.service';
import {DetPresentacionModel} from '../../../../models/DetPresentacionModel';
import { PedidoModel } from 'src/app/models/PedidoModel';
import { ProveedoresService } from 'src/app/services/proveedores.service';
@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.scss']
})
export class CrearPedidoComponent implements OnInit {

  id_pedido:number;
  id_proveedor:number;
  id_productor:number = UserCompanyService.userCompanyID;
  ListaPresentacionesEsencias:number[];
  ListaPresentacionesIngredientes:number[];
  ListaMetodosEnvio:any[];
  ListaMetodosPago:any[];
  numero_contrato:number;

  //Proceso de agregación al pedido
  EsenciasPedido:any[];
  IngredientesPedido:any[];
  MetodosEnvioPedido:any[];
  MetodosPagoPedido:any[];
  PresentacionesEsencias:number[];
  PresentacionesIngredientes:number[];
   DetPresentacion:DetPresentacionModel[];

  constructor(private route:ActivatedRoute, private productores:ProducersService, private proveedores:ProveedoresService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>{
      this.id_proveedor =+params.get('id_proveedor');
      this.numero_contrato=+params.get('contrato');
    });

    this.productores.PresentacionesEsenciaPedido(this.numero_contrato).subscribe(res=>{
        this.ListaPresentacionesEsencias = res as any[];
    });

    this.productores.PresentacionesIgredientesPedido(this.numero_contrato).subscribe(res=>{
      this.ListaPresentacionesEsencias = res as any[];
    });

    this.productores.metodoEnvioContratados(this.id_proveedor,this.numero_contrato).subscribe(res=>{
      this.ListaMetodosEnvio = res as any[];
    });

    this.productores.metodoPagoContratados(this.id_proveedor,this.numero_contrato).subscribe(res =>{
      this.ListaMetodosPago = res as any[];
    });
  }

  InsertarMetodosEnvio(metodo:any){
    this.MetodosEnvioPedido.push[metodo];
  };

  InsertarPago(pago:any){

    this.MetodosPagoPedido.push[pago];
  };

  ArmarDetPresentacion(sku:number,cantidad:number){
    let det = new DetPresentacionModel();
    det.sku = sku;
    det.cantidad = cantidad;
     this.DetPresentacion.push(det);
  }

  DetallarPedido()
  {
    if(this.DetPresentacion.length > 0){
      for (let i = 0; i < this.DetPresentacion.length; i++){
        this.productores.PostDetPedido(this.DetPresentacion[i]).subscribe(res=>{
          console.log('Detalle añadido satisfactoriamente');
        })
      }
    }
  }
  CrearPedido(Pedido:PedidoModel){

    this.productores.generarPedido(Pedido).subscribe(res=>{
      console.log('Pedido creado de forma satisfactoria');
    });
    this.DetallarPedido();
  }
}

