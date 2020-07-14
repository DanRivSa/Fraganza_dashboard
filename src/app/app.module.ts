import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//singletones
import {UserCompanyService} from './services/global/user-company.service';

@NgModule({


  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [UserCompanyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
