import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

//modules
import {ProducersModule} from './modules/producers/producers.module';
import {ProvidersModule} from './modules/providers/providers.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//singletones
import {UserCompanyService} from './services/global/user-company.service';

//custom components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SelectProducerCompanyComponent } from './components/select-producer-company/select-producer-company.component';
import { SelectProviderCompanyComponent } from './components/select-provider-company/select-provider-company.component';
import { SelectCompanyTypeComponent } from './components/select-company-type/select-company-type.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({


  declarations: [
    AppComponent,
    NavbarComponent,
    SelectProducerCompanyComponent,
    SelectProviderCompanyComponent,
    SelectCompanyTypeComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProvidersModule,
    ProducersModule,
    HttpClientModule
  ],
  providers: [UserCompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
