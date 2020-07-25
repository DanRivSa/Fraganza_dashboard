import { Component, OnInit } from '@angular/core';
import {ProducersService} from '../../../services/producers.service';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-evaluacion-anual',
  templateUrl: './evaluacion-anual.component.html',
  styleUrls: ['./evaluacion-anual.component.scss']
})
export class EvaluacionAnualComponent implements OnInit 
{
  id:number;
  nombre:string;
  nota:number;
  min_val:number;
  max_val:number;
  porcentajeAprob:number;
  total:number;
  

  calificacionFinal:number;
  aprobado:boolean = false;

  constructor(private servicio:ProducersService) 
  {

  }

  ngOnInit(): void 
  {


    this.servicio.ObtenerCriterioSucces

    this.servicio.ObtenerEscalaAnualVigente(UserCompanyService.userCompanyID).subscribe(res=>
      {
        let data:any[]=res as any[];
        this.min_val = data[0].rango_inicial;
        this.max_val = data[0].rango_final;
        this.porcentajeAprob = data[0].rango_aprob;
        this.total = this.max_val-this.min_val;
        console.log('total: ',this.total);
      });
  }

  Calificar()
  {
    let aprob = (this.total*this.porcentajeAprob)/100;
    let puntaje = this.nota //el criterio siempre tiene un peso de 100% por tanto no hay que sacar cuentas
    if(puntaje>= aprob)
    {
      this.aprobado = true;
    }
    else
    {
      this.aprobado = false;
    }
  }

}
