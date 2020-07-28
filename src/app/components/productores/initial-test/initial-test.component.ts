import { Component, OnInit } from '@angular/core';
import { ProducersService } from '../../../services/producers.service';
import { UserCompanyService } from 'src/app/services/global/user-company.service';

@Component({
  selector: 'app-initial-test',
  templateUrl: './initial-test.component.html',
  styleUrls: ['./initial-test.component.scss']
})
export class InitialTestComponent implements OnInit {

  proveedores:any[];

  id_usuario:number = UserCompanyService.userCompanyID; //id de usuario 

  criterios:any[];
  escala:any[];


  constructor(private producersService:ProducersService){}

  ngOnInit(): void
  {
    this.producersService.FiltrarProveedoresIniciales(this.id_usuario).subscribe(res=>
      {
        this.proveedores = res as any[];
      });
      
      this.producersService.ObtenerCriteriosEvaluacionInicial(this.id_usuario).subscribe(res=>
        {
          this.criterios = res as any[];
        });

        this.producersService.ObtenerEscalaInicialVigente(this.id_usuario).subscribe(res=>
          {
            this.escala = res as any[];
          });


  
  
  
    }

}
