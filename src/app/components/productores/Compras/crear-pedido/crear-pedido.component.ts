import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import { ActivatedRoute } from '@angular/router';
import { ProducersService } from 'src/app/services/producers.service';

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.scss']
})
export class CrearPedidoComponent implements OnInit {

  id_pedido:number;
  id_proveedor:number;
  id_productor:number = UserCompanyService.userCompanyID;
  ListaEsencias:any[];
  LitaIngredientes:any[];
  ListaMetodosEnvio:any[];
  ListaMetodosPago:any[];
  numero_contrato:number;

  //Proceso de agregación al pedido
  EsenciasPedido:any[];
  IngredientesPedido:any[];
  MetodosEnvioPedido:any[];
  MetodosPagoPedido:any[];

  constructor(private route:ActivatedRoute, private productores:ProducersService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>{
      this.id_proveedor =+params.get('id_proveedor');
      this.numero_contrato=+params.get('contrato');
    });

    this.productores.GetEsenciasContratadas(this.id_proveedor,this.numero_contrato).subscribe(res=>{
        this.ListaEsencias = res as any[];
    });

    this.productores.GetIngredientesContratados(this.id_proveedor,this.numero_contrato).subscribe(res=>{
      this.LitaIngredientes = res as any[];
    });

    this.productores.metodoEnvioContratados(this.id_proveedor,this.numero_contrato).subscribe(res=>{
      this.ListaMetodosEnvio = res as any[];
    });

    this.productores.metodoPagoContratados(this.id_proveedor,this.numero_contrato).subscribe(res =>{
      this.ListaMetodosPago = res as any[];
    });


  }

}
