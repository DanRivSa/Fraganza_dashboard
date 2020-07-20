import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule
  ],
  providers: [UserCompanyService,ProducersService,ProveedoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
