import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import {SelectCompanyTypeComponent} from './components/login/select-company-type/select-company-type.component';
import {SelectProducerCompanyComponent} from './components/login/select-producer-company/select-producer-company.component';
import {SelectProviderCompanyComponent} from './components/login/select-provider-company/select-provider-company.component';
import {InitialTestComponent} from './components/productores/initial-test/initial-test.component';
import {DetalleProvedorComponent} from './components/proveedores/detalle-provedor/detalle-provedor.component';
import { FormulaInicialComponent } from './components/productores/formula-inicial/formula-inicial.component';
import { ContratosProvComponent } from './components/proveedores/contratos-prov/contratos-prov.component';
import { EvAnualProvComponent } from './components/proveedores/ev-anual-prov/ev-anual-prov.component';
import { EvaluacionAnualComponent } from './components/proveedores/evaluacion-anual/evaluacion-anual.component';


import {ContratoComponent} from './components/productores/Compras/contrato/contrato.component';
import {DetalleContratoComponent} from './components/productores/Compras/DetalleContrato/DetalleContrato.component';
import { CrearPedidoComponent } from './components/productores/Compras/crear-pedido/crear-pedido.component';
import { DetallePedidoComponent } from './components/productores/Compras/detalle-pedido/detalle-pedido.component';
import { ContratoProduComponent } from './components/productores/contrato-produ/contrato-produ.component';
import {CrearContratoComponent} from './components/productores/crear-contrato/crear-contrato.component';
import { PedidosComponent } from './components/productores/pedidos/pedidos.component';
import { ListaPedidosPagarComponent } from './components/productores/lista-pedidos-pagar/lista-pedidos-pagar.component';
import { RealizarPagosComponent } from './components/productores/realizar-pagos/realizar-pagos.component';
import { ContratoPendComponent } from './components/proveedores/contrato-pend/contrato-pend.component';
import { ContratoProvDetalleComponent } from './components/proveedores/contrato-prov-detalle/contrato-prov-detalle.component';

const routes: Routes =
[
  {path:'',component:HomeComponent},
  {path:'select_type',component:SelectCompanyTypeComponent},
  {path:'select_type/producer', component:SelectProducerCompanyComponent},
  {path:'select_type/provider',component:SelectProviderCompanyComponent},
  {path:'i_test_provider/detalle/:id',component:DetalleProvedorComponent},
  {path:'i_test_provider',component:InitialTestComponent},
  {path:'formula_inicial', component:FormulaInicialComponent},
  {path: 'contrato/provider',component:ContratosProvComponent},
  {path: 'e_anual_prov',component:EvAnualProvComponent},
  {path: 'evaluar_Anual/:id/:num/:id_prod', component:EvaluacionAnualComponent},
  {path:'compras',component:ContratoComponent},
  {path:'compras/contratos/detalle/:contrato/generar_pedido/:id_proveedor', component: CrearPedidoComponent},
  {path:'compras/generar_pedido/:id/contrato/:contrato', component:CrearPedidoComponent},
  {path:'compras/contratos/:id/detalle/:contrato', component:DetalleContratoComponent},
  {path:'compras/contratos/detalle/generar_pedido/:id/:contrato', component: CrearPedidoComponent},
  {path:'compras/detalle_pedido/:id/:id_pedido/:contrato',component:DetallePedidoComponent},
  {path: 'contrato/producer', component:ContratoProduComponent},
  {path:'crear/contrato/con_proveedor/:id', component:CrearContratoComponent},

  {path:'compras/contratos/detalle/:id/:contrato', component:DetalleContratoComponent},
  {path:'compras/contratos/:id/detalle/:contrato/generar_pedido', component: CrearPedidoComponent},
  {path: 'contrato/producer', component:ContratoProduComponent},
  {path: 'compras/pedidos', component:PedidosComponent},
  {path: 'pagos',component: ListaPedidosPagarComponent},
  {path: 'pagos/:id_pedido/:numero_contrato',component: RealizarPagosComponent}

  {path: 'contratos/pendientes', component:ContratoPendComponent},
  {path: 'compras/contratos/detalle/prov/:id/:contrato', component:ContratoProvDetalleComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
