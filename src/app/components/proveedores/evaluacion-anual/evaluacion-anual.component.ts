import { Component, OnInit } from '@angular/core';
import {ProducersService} from '../../../services/producers.service';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import {ActivatedRoute} from '@angular/router';
import { RenovacionContratoModel } from 'src/app/models/RenovacionContratoModel';
import { ResultadoModel } from 'src/app/models/Resultado';


@Component({
  selector: 'app-evaluacion-anual',
  templateUrl: './evaluacion-anual.component.html',
  styleUrls: ['./evaluacion-anual.component.scss']
})
export class EvaluacionAnualComponent implements OnInit 
{
  id_prov:number;
  num_contrato:number;
  nombre:string;
  nota:number;
  min_val:number;
  max_val:number;
  porcentajeAprob:number;
  total:number;
  fecha_renov:string;
  
  escalaAnualHolder:any[];
  calificacionFinal:number;
  aprobado:boolean = false;

  constructor(private servicio:ProducersService, private route:ActivatedRoute) 
  {

  }

  ngOnInit(): void 
  {

    this.route.paramMap.subscribe(params=>
      {
        this.id_prov = +params.get('id');
        this.num_contrato = +params.get('num');
      });

      this.servicio.FechaParaRenovacion(this.num_contrato).subscribe(res=>
        {
          let data:any[] = res as any[];
          this.fecha_renov = data[0].fecha_emision;
        });

      this.servicio.ObtenerCriterioSucces(this.num_contrato).subscribe(res=>
        {
          let data:any[] = res as any[];
          console.log(data);
          let porcentaje_nota = data[0].resultado;
          console.log(porcentaje_nota);
          this.nota = (this.total*porcentaje_nota)/100;//el criterio siempre tiene un peso de 100% por tanto no hay que sacar mas  cuentas
          console.log('calificacion: ',this.nota);
        }); 

    this.servicio.ObtenerCriterioSucces

    this.servicio.ObtenerEscalaAnualVigente(UserCompanyService.userCompanyID).subscribe(res=>
      {
        this.escalaAnualHolder=res as any[];
        this.min_val = this.escalaAnualHolder[0].rango_inicial;
        this.max_val = this.escalaAnualHolder[0].rango_final;
        this.porcentajeAprob = this.escalaAnualHolder[0].rango_aprob;
        this.total = this.max_val-this.min_val;
        console.log('total: ',this.total);
      });
  }

  Calificar()
  {
    let aprob = (this.total*this.porcentajeAprob)/100;
    if(this.nota>= aprob)
    {
      this.aprobado = true;
    }
    else
    {
      this.aprobado = false;
    }
    this.servicio.GuardarResultado(UserCompanyService.userCompanyID,this.CrearResultado()).subscribe(res=>
      {
        console.log('resultado guardado');
      })
  }

  RenovarContrato()
  {
    this.servicio.RenovarContrato(UserCompanyService.userCompanyID,this.CrearRenovacion()).subscribe(res=>
      {
        alert(`Se Creo Renovacion del contrato: ${this.num_contrato}`);
     });
  }

  CrearRenovacion():RenovacionContratoModel
  {
    let date = new Date(this.fecha_renov);
    console.log(date);
    let day = date.getDay();
    let month = date.getMonth() +1;
    let Nex_year = date.getFullYear() +1;
    let str = `${day}/${month}/${Nex_year}`;
    console.log('fecha renov:' + str);
    let ren = new RenovacionContratoModel();
    ren.id_prov = this.id_prov;
    ren.numero_contrato = this.num_contrato;
    ren.fecha = str;
    return ren;
  }

  CrearResultado():ResultadoModel
  {
    let r = new ResultadoModel();
    r.id_prov = this.id_prov;
    r.resultado = Math.round(this.nota);
    r.tipo_eval = 'a';
    return r;
  }

}
