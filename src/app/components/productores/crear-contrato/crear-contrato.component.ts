import { Component, OnInit } from '@angular/core';
import {ProveedoresService} from  '../../../services/proveedores.service';
import {ProducersService} from  '../../../services/producers.service';
import {ActivatedRoute} from '@angular/router';
import {ContEsenciaModel} from '../../../models/ContEsenciaModel';
import {ContIngredienteMode} from '../../../models/ContIngredienteModel';
import {ContMetdoEnvioModel} from '../../../models/ContMetodoEnvioModel';
import {ContCuotaModel} from '../../../models/ContCuotaModel';
import {ContParcialModel} from '../../../models/ContParcialModel';
import {ContratoModel} from '../../../models/ContratoModel';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import {NgModel,NgForm} from '@angular/forms';

@Component({
  selector: 'app-crear-contrato',
  templateUrl: './crear-contrato.component.html',
  styleUrls: ['./crear-contrato.component.scss']
})
export class CrearContratoComponent implements OnInit
{

  //holders de informacion
  esencias:any[];
  ingredientes:any[];
  alt_pagos:any[];
  alt_envio:any[];
  cuotas:any[];
  exclusivo:boolean = false;
  id_prov:number;
  id_usuario:number = UserCompanyService.userCompanyID;
  numero_contrato:number;
  descuento:number;
  //carritos
  esenciasContratadas:any[] = [];
  ingredientesContratados:any[] = [];
  MetodoEnvioContratados:any[] = [];
  CuotaContratada:any[] = [];
  parcialContrato:boolean = false;

  constructor(private servicioProveedores:ProveedoresService, private servicioProductores:ProducersService, private route:ActivatedRoute){ }

  ngOnInit(): void
  {
    //obtenerId
    this.route.paramMap.subscribe(params=>
      {
        this.id_prov = +params.get('id'); //id proveedor
      });

    //obtener esencias
    this.servicioProveedores.ObtenerEsencias(this.id_prov).subscribe(res=>
    {
      this.esencias = res as any[];
      console.log(this.esencias);
    });

    //obtener inngredientes
    this.servicioProveedores.ObtenerIngredietes(this.id_prov).subscribe(res=>
      {
        this.ingredientes = res as any[];
        console.log(this.ingredientes);
      });

    //obtener alternativas de envio
    this.servicioProveedores.ObtenerAtEnvioParaContrato(UserCompanyService.userCompanyID,this.id_prov).subscribe(res=>
      {
        this.alt_envio = res as any [];
        console.log(this.alt_envio);
      });

      //obtener alternativas de pago
      this.servicioProveedores.ObtenerAlternativasdePago(this.id_prov).subscribe(res=>
        {
          this.alt_pagos = res as any[];
          console.log(this.alt_pagos);
        })
    //obtener detalles de cuota
      this.servicioProveedores.ObtenerInfoPagoCuotas(this.id_prov).subscribe(res=>
        {
          this.cuotas = res as any[];
          console.log(this.cuotas);
        });

    //obtener numero de secuencia del contrato
    this.servicioProductores.NumeroDeSecuenciaDeContrato().subscribe(res=>
      {
        let data:any[] = res as any[];
        this.numero_contrato = data[0].last_value;
        console.log(data);
        console.log('numero de contrato:'+ this.numero_contrato);
      });
    console.log(this.id_usuario);
  }

  //exclusividad
  Exclusivo(event:any)
  {
    this.exclusivo = event.currentTarget.checked;
    console.log(this.exclusivo);
  }

  //agregar a carrito
  ContratarEsencia(obj:any)
  {
    this.esenciasContratadas.push(obj);
    alert('contratado');
  }

  ContratarIngrediente(obj:any)
  {
    this.ingredientesContratados.push(obj);
    alert('contratado');
  }

  ContratarMetodoEnvio(obj:any)
  {
    this.MetodoEnvioContratados.push(obj);
    alert('contratado');
  }

  ContratarParcialPago()
  {
    this.parcialContrato = true;
    alert('contratado');
  }

  ContratarCuota(obj:any)
  {
    this.CuotaContratada.push(obj);
    alert('contratado');
  }

  //creaciones de filas para las tablas en la bd
  CrearEsencia(obj:any):ContEsenciaModel
  {
    let es = new ContEsenciaModel();
    es.cas= obj.cas;
    es.numero_contrato=this.numero_contrato;
    es.id_prov= this.id_prov;
    return es;
  }

  CrearIngrediente(obj:any):ContIngredienteMode
  {
    let ing = new ContIngredienteMode();
    ing.cas_oi = obj.cas_oi;
    ing.numero_contrato = this.numero_contrato;
    ing.id_prov = this.id_prov;
    return ing;
  }

  CrearCuota(obj:any):ContCuotaModel
  {
    let c = new ContCuotaModel();
    c.id_prov = this.id_prov;
    c.id_prov2 = this.id_prov;
    c.numero_contrato = this.numero_contrato;
    c.porc_cuota = obj.porc_cuota;
    c.metodo_pago = 'c';
    return c;
  }

  CrearParcial():ContParcialModel
  {
    let p= new ContParcialModel();
    p.id_prov = this.id_prov;
    p.id_prov2 = this.id_prov;
    p.numero_contrato = this.numero_contrato;
    p.metodo_pago = 'p';
    return p;
  }

  CrearMEnvio(obj:any):ContMetdoEnvioModel
  {
    let me = new ContMetdoEnvioModel();
    me.id_prov = this.id_prov;
    me.id_prov2 = this.id_prov;
    me.numero_contrato = this.numero_contrato;
    me.porc_contratado = obj.porc_base;
    me.id_pais = obj.id_pais;
    me.tipo_envio = obj.tipo_envio;
    return me;
  }

  CrearContrato():ContratoModel
  {
    let cont = new ContratoModel();
    cont.id_prov = this.id_prov;
    cont.exclusivo = this.exclusivo;
    cont.descuento = this.descuento;
    return cont;
  }

  //metodos de insercion
  InsertarEsencias()
  {
    for (let i = 0; i < this.esenciasContratadas.length; i++) 
      this.servicioProductores.ContratarEsencia(this.id_usuario,this.CrearEsencia(this.esenciasContratadas[i])).subscribe(res=>{console.log('esencia contratada');});
  }

  InsertarIngredientes()
  {
    for (let i = 0; i < this.ingredientesContratados.length; i++)
      this.servicioProductores.ContratarIngrediente(this.id_usuario,this.CrearIngrediente(this.ingredientesContratados[i])).subscribe(res=>{console.log('ingrediente contratado');});
  }

  InsertarCuotas()
  {
    for (let i = 0; i < this.CuotaContratada.length; i++)
      this.servicioProductores.ContratarPagoPorCuotas(this.id_usuario,this.CrearCuota(this.CuotaContratada[i])).subscribe(res=>{console.log('cuota contratada');});
  }

  InsertarPagoParcial()
  {
    this.servicioProductores.ContratarPagoParcial(this.id_usuario,this.CrearParcial()).subscribe(res=>
      {
        console.log('parcial insertado');
      });
  }

  InsertarMetodoEnvio()
  {
    for (let i = 0; i < this.MetodoEnvioContratados.length; i++) 
      this.servicioProductores.ContratarMetodoEnvio(this.id_usuario,this.CrearMEnvio(this.MetodoEnvioContratados[i])).subscribe(res=>{console.log('Metodo Contratado');});
  }

  //procesar solicitud
  ProcesarContrato()
  {
    //insertar contrato
    this.servicioProductores.InsertarContrato(UserCompanyService.userCompanyID,this.CrearContrato()).subscribe(res=>
      {
        alert('Solicitud de contratacion enviada');
        console.log('contrato generado');
      });

      this.InsertarEsencias();
      this.InsertarIngredientes();
      if(this.CuotaContratada[0]!= null) this.InsertarCuotas();
      if(this.parcialContrato) this.InsertarPagoParcial();
      this.InsertarMetodoEnvio();
  }

}
