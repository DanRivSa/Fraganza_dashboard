import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import { ActivatedRoute } from '@angular/router';
import { ProducersService } from 'src/app/services/producers.service';
import {DetPresentacionModel} from '../../../../models/DetPresentacionModel';
import { PedidoModel } from 'src/app/models/PedidoModel';
import { MetodoEnvio } from 'src/app/models/MetodoEnvio';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.scss']
})
export class CrearPedidoComponent implements OnInit {
  form: FormGroup;

  id_pedido:number;
  id:number;
  id_proveedor:number;
  id_productor:number = UserCompanyService.userCompanyID;
  ListaPresentacionesEsencias:any[];
  ListaPresentacionesIngredientes:any[];
  ListaMetodosEnvio:any[];
  ListaMetodosPago:any[];
  numero_contrato:number;
  precio_pedido:number;
  DescuentoContrato:number;
  proveedor:any[];

  //Proceso de agregación al pedido
  EsenciasPedido:any[];
  IngredientesPedido:any[];
  MetodoEnvioPedido:MetodoEnvio;
  MetodoPagoPedido:string;
  PresentacionesEsencias:number[];
  PresentacionesIngredientes:number[];
  DetPresentacion:DetPresentacionModel[];

  constructor(private route:ActivatedRoute, private productores:ProducersService, private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([],[Validators.required])
    })
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>{
      this.id_proveedor=+params.get('id');
      this.numero_contrato=+params.get('contrato');
      console.log('prov',this.numero_contrato);
      console.log('prov',this.id_proveedor);
    });


    this.productores.PresentacionesEsenciaPedido(this.numero_contrato).subscribe(res=>{
        this.ListaPresentacionesIngredientes = res as any[];
        console.log('ingredientes',this.ListaPresentacionesIngredientes);
    });

    this.productores.PresentacionesIgredientesPedido(this.numero_contrato).subscribe(res=>{
      this.ListaPresentacionesEsencias = res as any[];
      console.log('esencias',this.ListaPresentacionesEsencias);
    });

    this.productores.metodoEnvioContratados(this.id_proveedor,this.numero_contrato).subscribe(res=>{
      this.ListaMetodosEnvio = res as any[];
      console.log('envio',this.ListaMetodosEnvio);
    });

    this.productores.metodoPagoContratados(this.id_proveedor,this.numero_contrato).subscribe(res =>{
      this.ListaMetodosPago = res as any[];
      console.log('pagos',this.ListaMetodosPago);
    });
    this.productores.DescuentoContrato(this.numero_contrato).subscribe(res=>{
      this.DescuentoContrato = res as number;
    })
    this.productores.GetContratosVigentes(this.id_productor).subscribe(res=>
      {
        this.proveedor = res as any[];
        console.log('prov',this.proveedor);
      });

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

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  submitForm() {
    console.log(this.form.value)
  }


}

