import { Component, OnInit } from '@angular/core';
import { ProducersService } from '../../../services/producers.service';
import { UserCompanyService } from 'src/app/services/global/user-company.service';

@Component({
  selector: 'app-ev-anual-prov',
  templateUrl: './ev-anual-prov.component.html',
  styleUrls: ['./ev-anual-prov.component.scss']
})
export class EvAnualProvComponent implements OnInit {

  proveedores:any[];

  id_usuario:number = UserCompanyService.userCompanyID; //id de usuario 

  constructor(private producersService:ProducersService) { }

  ngOnInit(): void {
    this.producersService.FiltrarProveedoresIniciales(this.id_usuario).subscribe(res=>
      {
        this.proveedores = res as any[];
      });
  }

}
