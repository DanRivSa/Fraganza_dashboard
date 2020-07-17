import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import {SelectCompanyTypeComponent} from './components/login/select-company-type/select-company-type.component';
import {SelectProducerCompanyComponent} from './components/login/select-producer-company/select-producer-company.component';
import {SelectProviderCompanyComponent} from './components/login/select-provider-company/select-provider-company.component';
import {InitialTestComponent} from './components/productores/initial-test/initial-test.component';


const routes: Routes =
[
  {path:'',component:HomeComponent},
  {path:'select_type',component:SelectCompanyTypeComponent},
  {path:'select_type/producer', component:SelectProducerCompanyComponent},
  {path:'select_type/provider',component:SelectProviderCompanyComponent},
  {path:'test_provider',component:InitialTestComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
