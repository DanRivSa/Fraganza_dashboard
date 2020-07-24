import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import { ProducersService } from 'src/app/services/producers.service';

@Component({
  selector: 'app-mostrar-contratos',
  templateUrl: './SeleccionProveedores.component.html',
  styleUrls: ['./SeleccionProveedores.component.scss']
})
export class MostrarContratosComponent implements OnInit {

  proveedores:any[];
  contratos:any[];
  id_productor:number = UserCompanyService.userCompanyID;

  constructor(private servicio:ProducersService) { }
//prueba
  ngOnInit(): void
  {
    this.servicio.GetContratosVigentes(this.id_productor).subscribe(res=>
      {
        let data:any[] = res as any[];
        this.proveedores = data[0].nombre_prov;
        this.contratos = data[0].numero_contrato;
      });
  }
}
