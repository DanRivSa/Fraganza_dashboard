import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import { SelectCompanyTypeComponent } from './components/select-company-type/select-company-type.component';
import { SelectProducerCompanyComponent } from './components/select-producer-company/select-producer-company.component';
import { SelectProviderCompanyComponent } from './components/select-provider-company/select-provider-company.component';

const routes: Routes =
[
  {path:'',component:HomeComponent},
  {path:'select_type',component:SelectCompanyTypeComponent},
  {path:'select_type/producer', component:SelectProducerCompanyComponent},
  {path:'select_type/provider',component:SelectProviderCompanyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
