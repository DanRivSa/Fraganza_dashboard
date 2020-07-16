import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginService} from '../../services/global/login.service';
import {SelectCompanyTypeComponent} from '../../components/login/select-company-type/select-company-type.component';
import {SelectProducerCompanyComponent} from '../../components/login/select-producer-company/select-producer-company.component';
import {SelectProviderCompanyComponent} from '../../components/login/select-provider-company/select-provider-company.component';
import {AppRoutingModule} from '../../app-routing.module';

@NgModule({
  providers:[LoginService],
  declarations: 
  [
    SelectCompanyTypeComponent,
    SelectProducerCompanyComponent,
    SelectProviderCompanyComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:
  [
    SelectCompanyTypeComponent,
    SelectProducerCompanyComponent,
    SelectProviderCompanyComponent,
  ]
})
export class LoginModule { }
