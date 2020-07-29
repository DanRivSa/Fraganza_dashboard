import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import { ActivatedRoute } from '@angular/router';
import { ProducersService } from 'src/app/services/producers.service';
import {DetPresentacionModel} from '../../../../models/DetPresentacionModel';
import { Pedido } from 'src/app/models/Pedido';
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
  ListaPresentacionesEsencias:DetPresentacionModel[]=[];
  ListaPresentacionesIngredientes:DetPresentacionModel[]=[];
  ListaMetodosEnvio:any[];
  ListaMetodosPago:any[];
  numero_contrato:number;
  precio_pedido:number=0;
  porc_descuento:number;

  //Proceso de agregación al pedido
  MetodoEnvioPedido:MetodoEnvio;
  MetodoPagoPedido:string;
  DetPresentacion:DetPresentacionModel[]=[];

  constructor(private route:ActivatedRoute, private productores:ProducersService, private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([],[Validators.required])
    })
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>{
      this.id_proveedor=+params.get('id');
      this.numero_contrato=+params.get('contrato');
      console.log('contrato',this.numero_contrato);
      console.log('prov',this.id_proveedor);
    });


    this.productores.PresentacionesEsenciaPedido(this.numero_contrato).subscribe(res=>{

       let  data:any[] = res as any[];
      for(let i = 0; i < data.length; i++){
        let aux = new DetPresentacionModel();
        aux.sku=data[i].sku;
        console.log('Esencias: '+data[i].sku);

        aux.nombre=data[i].nombre;
        console.log('Esencias: '+data[i].nombre);

        aux.precio=data[i].precio;
        console.log('Esencias: '+data[i].precio);
        aux.cantidad_pack=data[i].cantidad_pack;
        console.log('Esencias: '+data);
        aux.cantidad_pack=data[i].cantidad_perpack;
        aux.nombre_comercial=data[i].nombre_comercial;
        aux.cantidad=0;
        aux.cas=data[i].cas;
        console.log('AUXXXXX: '+aux);

        this.ListaPresentacionesEsencias.push(aux);
      }

    });

    this.productores.PresentacionesIgredientesPedido(this.numero_contrato).subscribe(res=>{
     // this.ListaPresentacionesEsencias = res as any[];
      let data:any[]= res as any[];
      console.log('Esencias: '+data);
      for(let i = 0; i < data.length; i++){
        let aux = new DetPresentacionModel();
        aux.sku=data[i].sku;
        aux.nombre=data[i].nombre;
        aux.precio=data[i].precio;
        console.log('Esencias: '+data[i].precio);
        aux.cantidad_pack=data[i].cantidad_pack;
        console.log('Esencias: '+data);
        aux.cantidad_pack=data[i].cantidad_perpack;
        aux.nombre_comercial=data[i].nombre_comercial;
        aux.cantidad=0;
        aux.cas_oi=data[i].cas_oi;
        console.log('AUXXXXX: '+aux);

        this.ListaPresentacionesIngredientes.push(aux);
      }
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
      let valor:any[] = res as any[];
      console.log(valor);
      this.porc_descuento = valor[0].descuento;
    })

  }


  ContratarPago(tipo:string)
  {
    this.MetodoPagoPedido = tipo;
    console.log(this.MetodoPagoPedido);
    alert('Contratado');
  }


  ListarMetodoEnvio(id_pais:number, porc_contratado:number,tipo_envio:string){
    let envio = new MetodoEnvio();
    envio.id_pais=id_pais;
    envio.tipo_envio=tipo_envio;
    envio.porc_contratado=porc_contratado
    this.MetodoEnvioPedido=(envio);
    console.log('id_pais: '+this.MetodoEnvioPedido.id_pais);
    console.log('id_pais: '+this.MetodoEnvioPedido.tipo_envio);
    console.log('id_pais: '+this.MetodoEnvioPedido.porc_contratado);

    alert('Contratado');
  };

  ContratarPresentacion(sku:number,cantidad:number,precio:number){
    let det = new DetPresentacionModel();
    det.sku = sku;
    det.cantidad = cantidad;
    det.precio = precio;
    console.log('VER:'+det.cantidad)
    console.log('VER 2'+det);
     this.DetPresentacion.push(det);
     console.log('Insertado:'+this.DetPresentacion);
     alert('Contratado');
  }

  CotizarPedido()
  {

      for (let i = 0; i < this.DetPresentacion.length; i++){

            let resultado = (this.DetPresentacion[i].cantidad*this.DetPresentacion[i].precio);
            console.log('Resultado: '+resultado);
            this.precio_pedido=this.precio_pedido+resultado;
           }
           console.log('Descuenco: '+this.porc_descuento);
          let Descuento = this.precio_pedido*this.porc_descuento/100;
          console.log('Descuenco2: '+Descuento);
          let RecargoEnvio = this.precio_pedido*this.MetodoEnvioPedido.porc_contratado/100;
          console.log('Recargo: '+RecargoEnvio);
          this.precio_pedido=this.precio_pedido-Descuento+RecargoEnvio;
          console.log('Cotizar pago: '+this.precio_pedido);
          alert('El precio total es:'+this.precio_pedido);

    }
  DetallarPedido()
  {
      for (let i = 0; i < this.DetPresentacion.length; i++){
        this.productores.PostDetPedido(this.DetPresentacion[i]).subscribe(res=>{
          console.log('Detalle añadido satisfactoriamente');
        })
    }
  }
  ArmarPedido(){

    let p = new Pedido();
    p.id_prov1=this.id_proveedor;
    p.id_prod1=this.id_productor;
    p.numero_contrato1=this.numero_contrato;
    p.id_prov2=this.id_proveedor;
    p.id_prod3=this.id_productor;
    p.id_prov3=this.id_proveedor;
    p.metodo_pago=this.MetodoPagoPedido;
    p.tipo_envio=this.MetodoEnvioPedido.tipo_envio;
    p.numero_contrato2=this.numero_contrato;
    p.id_prov4=this.id_proveedor;
    p.id_pais=this.MetodoEnvioPedido.id_pais;
    p.total =Math.round(this.precio_pedido);
    console.log(p.total);
    this.productores.generarPedido(p).subscribe(res=>{
      console.log(res);

      alert('Pedido creado de manera satisfactoria');
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

