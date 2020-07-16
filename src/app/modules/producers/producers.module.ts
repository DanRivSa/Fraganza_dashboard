import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialTestComponent } from '../../components/initial-test/initial-test.component';
import {ProducersService} from '../../services/producers.service';
import {NavbarComponent} from '../../components/navbar/navbar.component'

@NgModule({
  providers:[ProducersService],
  declarations:
  [
    InitialTestComponent,
    NavbarComponent
  ],
  imports:
  [
    CommonModule
  ],
  exports:[InitialTestComponent,NavbarComponent]
})
export class ProducersModule {}
