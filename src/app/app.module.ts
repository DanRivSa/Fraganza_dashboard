import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
<<<<<<< HEAD
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
=======
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
>>>>>>> 6a9b5c1151914ac4715a544a7673b61b2d256316

//modules
import {LoginModule} from './modules/login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//services
import {UserCompanyService} from './services/global/user-company.service';
import {ProducersService} from './services/producers.service';
import {ProveedoresService} from './services/proveedores.service';

//custom components
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

//reports
import { InitialTestComponent } from './components/productores/initial-test/initial-test.component';
import { CatalogoComponent } from './components/proveedores/catalogo/catalogo.component';
import { DetalleProvedorComponent } from './components/proveedores/detalle-provedor/detalle-provedor.component';
import { AlternativasEnviosComponent } from './components/proveedores/alternativas-envios/alternativas-envios.component';
import { FormulaInicialComponent } from './components/productores/formula-inicial/formula-inicial.component';
import { AlternativasPagoComponent } from './components/proveedores/alternativas-pago/alternativas-pago.component';
import { ContratoComponent } from './components/productores/Compras/contrato/contrato.component';
import { DetalleContratoComponent } from './components/productores/Compras/DetalleContrato/DetalleContrato.component';
import { EvaluacionAnualComponent } from './components/proveedores/evaluacion-anual/evaluacion-anual.component';
import { ContratosProvComponent } from './components/proveedores/contratos-prov/contratos-prov.component';
import { EvAnualProvComponent } from './components/proveedores/ev-anual-prov/ev-anual-prov.component';
import { CrearPedidoComponent } from './components/productores/Compras/crear-pedido/crear-pedido.component';
import { ContratoProduComponent } from './components/productores/contrato-produ/contrato-produ.component';
import { CrearContratoComponent } from './components/productores/crear-contrato/crear-contrato.component';
import { PedidosComponent } from './components/productores/pedidos/pedidos.component';
import { ContratoProvDetalleComponent } from './components/proveedores/contrato-prov-detalle/contrato-prov-detalle.component';
import { DetallePedidoComponent } from './components/productores/Compras/detalle-pedido/detalle-pedido.component';
import { DetallePedidoProveedorComponent } from './components/proveedores/detalle-pedido-proveedor/detalle-pedido-proveedor.component';
import { ListaPedidosPagarComponent } from './components/productores/lista-pedidos-pagar/lista-pedidos-pagar.component';
import { RealizarPagosComponent } from './components/productores/realizar-pagos/realizar-pagos.component';
import { ContratoPendComponent } from './components/proveedores/contrato-pend/contrato-pend.component';
import { DetalleContratoEnProvComponent } from './components/proveedores/detalle-contrato-en-prov/detalle-contrato-en-prov.component';




@NgModule({
  declarations: [
    //componentes de la aplicacion
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CatalogoComponent,

    //componentes de productores
    InitialTestComponent,

    //componentes de proveedores

    DetalleProvedorComponent,

    AlternativasEnviosComponent,

    FormulaInicialComponent,

    AlternativasPagoComponent,

    EvaluacionAnualComponent,

    ContratosProvComponent,

    EvAnualProvComponent,
    ContratoComponent,
    CrearPedidoComponent,
    ContratoProduComponent,
    CrearContratoComponent,
    PedidosComponent,
    ContratoProvDetalleComponent,
    DetalleContratoComponent,
    DetallePedidoComponent,
    DetallePedidoProveedorComponent,
    ListaPedidosPagarComponent,
<<<<<<< HEAD
    RealizarPagosComponent,


=======
    ContratoPendComponent,
    DetalleContratoEnProvComponent,
>>>>>>> 6a9b5c1151914ac4715a544a7673b61b2d256316



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    FormsModule,
<<<<<<< HEAD
    ReactiveFormsModule
=======
    ReactiveFormsModule,
    FormsModule
>>>>>>> 6a9b5c1151914ac4715a544a7673b61b2d256316
  ],
  providers: [UserCompanyService,ProducersService,ProveedoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
