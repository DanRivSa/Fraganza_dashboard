import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import { ActivatedRoute } from '@angular/router';
import { ProducersService } from 'src/app/services/producers.service';
import {DetPresentacionModel} from '../../../../models/DetPresentacionModel';
import { PedidoModel } from 'src/app/models/PedidoModel';
import { MetodoEnvio } from 'src/app/models/MetodoEnvio';

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.scss']
})
export class CrearPedidoComponent implements OnInit {

  id_pedido:number;
  id_proveedor:number;
  id_productor:number = UserCompanyService.userCompanyID;
  ListaPresentacionesEsencias:any[];
  ListaPresentacionesIngredientes:any[];
  ListaMetodosEnvio:any[];
  ListaMetodosPago:any[];
  numero_contrato:number;
  precio_pedido:number;
  DescuentoContrato:number;

  //Proceso de agregación al pedido
  EsenciasPedido:any[];
  IngredientesPedido:any[];
  MetodoEnvioPedido:MetodoEnvio;
  MetodoPagoPedido:string;
  PresentacionesEsencias:number[];
  PresentacionesIngredientes:number[];
  DetPresentacion:DetPresentacionModel[];

  constructor(private route:ActivatedRoute, private productores:ProducersService) { }

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
    this.productores.DescuentoContrato(this.numero_contrato).subscribe(res=>{
      this.DescuentoContrato = res as number;
    })
  }

  ListarMetodoEnvio(id_pais:number, porc_contratado:number,tipo_envio:string){
    let envio = new MetodoEnvio();
    envio.id_pais=id_pais;
    envio.tipo_envio=tipo_envio;
    envio.porc_contratado=porc_contratado
    this.MetodoEnvioPedido=envio;
  };

  InsertarPago(tipo_pago:string){

    this.MetodoPagoPedido=tipo_pago;
  };

  ArmarDetPresentacion(sku:number,cantidad:number,precio:number){
    let det = new DetPresentacionModel();
    det.sku = sku;
    det.cantidad = cantidad;
    det.precio = precio;
     this.DetPresentacion.push(det);
  }

  CotizarPedio()
  {

    if(this.DetPresentacion.length > 0){
      for (let i = 0; i < this.DetPresentacion.length; i++){

            let resultado = (this.DetPresentacion[i].cantidad*this.DetPresentacion[i].precio);
            this.precio_pedido=this.precio_pedido+resultado;
           }
          let Descuento = this.precio_pedido*this.DescuentoContrato/100;
          let RecargoEnvio = this.precio_pedido*this.MetodoEnvioPedido.porc_contratado/100;
          this.precio_pedido=this.precio_pedido-Descuento+RecargoEnvio;
      }
      alert('No ha listado presentaciones');
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
  ArmarPedido(){

    let p = new PedidoModel();
    p.id_prov=this.id_proveedor;
    p.id_prod=this.id_productor;
    p.numero_contrato=this.numero_contrato;
    p.metodo_pago=this.MetodoPagoPedido;
    p.tipo_envio=this.MetodoEnvioPedido.tipo_envio;
    p.id_pais=this.MetodoEnvioPedido.id_pais;
    p.total=this.precio_pedido;
    this.productores.generarPedido(p).subscribe(res=>{
      this.id_pedido = res as number;
      console.log('Pedido creado de forma satisfactoria');
    });
    this.DetallarPedido();
  }
}

