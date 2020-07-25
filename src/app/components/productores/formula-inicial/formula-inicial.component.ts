import { Component, OnInit } from '@angular/core';
import {ProducersService} from '../../../services/producers.service';
import {NgForm} from '@angular/forms';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import { EscalaModel } from 'src/app/models/EscalaModel';
import { CriterioModel } from 'src/app/models/CriterioModel';

@Component({
  selector: 'app-formula-inicial',
  templateUrl: './formula-inicial.component.html',
  styleUrls: ['./formula-inicial.component.scss']
})
export class FormulaInicialComponent implements OnInit {

  //formula ev inicial
  escala_v_min:number;
  escala_v_max:number;
  escala_rango_porcentual:number;
  peso_c1:number;
  peso_c2:number;
  peso_c3:number;

  //formula ev anual
  escala_a_min:number;
  escala_a_max:number;
  escala_a_rango:number;
  peso_anual:number = 100;

  constructor(private servicio:ProducersService) { }

  ngOnInit(): void {}

  CrearFormulaInicial()
  {
    if(this.ValidarPesos(this.peso_c1,this.peso_c2,this.peso_c3) && this.ValidarEscala(this.escala_v_min,this.escala_v_max,this.escala_rango_porcentual))
    {

      this.CerrarEscalaYCriteriosIniciales();
      this.GuardarNuevaEscalaInicial(this.escala_v_max,this.escala_v_min,this.escala_rango_porcentual);
      this.GuardarNuevoCriterioGeografico(this.peso_c1);
      this.GuardarNuevoCriterioAlternativaEnvio(this.peso_c2);
      this.GuardarNuevoCriterioAlternativaPago(this.peso_c3);
      confirm('formula de evaluacion inicial creada exitosamente');
    }
    else
      alert('ERROR procure que la suma de los pesos de los criterios sea 100% y llenar los campos solicitados con valores coherentes');
  }

  ValidarPesos(x:number,y:number,z:number):boolean
  {
    let sum = x+y+z;
    console.log(sum);
    if(sum == 100)
      return true;
    else
      return false;
  }

  ValidarEscala(rango_min:number,rango_max:number,porcentaje_aprobacion:number):boolean
  {
    console.log(rango_min,rango_max,porcentaje_aprobacion);
    if((rango_min >= 0 && rango_max> 0 && porcentaje_aprobacion> 0) && (rango_max>rango_min))
      return true;
    else
      return false;
  }

//FORMULA DE EVALUACION INICIAL

  GuardarNuevaEscalaInicial(max,min,rango)
  {
    this.servicio.PostEscalaInicial(this.CrearEscala(max,min,rango)).subscribe(res=>
      {
        console.log('nueva escala creada');
      })
  }

  GuardarNuevoCriterioGeografico(peso)
  {
    this.servicio.PostUbicacion(this.CrearCriterio(peso,1)).subscribe(res=>
      {
        console.log('Ubicacion Geografica')
      });
  }

  GuardarNuevoCriterioAlternativaPago(peso)
  {
    this.servicio.PostPago(this.CrearCriterio(peso,3)).subscribe(res=>
      {
        console.log('alt_pago')
      })
  }

  GuardarNuevoCriterioAlternativaEnvio(peso)
  {
    this.servicio.PostEnvio(this.CrearCriterio(peso,2)).subscribe(res=>
      {
        console.log('alt_envio')
      });
  }

  CerrarEscalaYCriteriosIniciales()
  {
    this.servicio.CerrarInicial(UserCompanyService.userCompanyID,new EscalaModel()).subscribe(res=>
      {
        console.log('Cerrado con exito inicial');
      });
  }

  //EVALUACION ANUAL

  CrearFormulaAnual()
  {
    if(this.ValidarEscala(this.escala_a_min,this.escala_a_max,this.escala_a_rango))
    {
      this.CerrarEscalaYCriteriosAnuales();
      this.GuardarNuevaEscalaAnual(this.escala_a_max,this.escala_a_min,this.escala_a_rango);
      this.GuardarCriterioAnualDeExito(this.peso_anual);
      alert('Formula Anual Creada Exitosamente');
    }
    else
      alert('ERROR procure llenar la informacion solicitada con valores coherentes');
  }

  CerrarEscalaYCriteriosAnuales()
  {
    this.servicio.CerrarAnual(UserCompanyService.userCompanyID,new EscalaModel()).subscribe(res=>
      {
        console.log('cerrado con exito anual');
      });
  }

  GuardarNuevaEscalaAnual(max,min,rango)
  {
    this.servicio.PostEscalaAnual(this.CrearEscala(max,min,rango)).subscribe(res=>
      {
        console.log('escala anual creada');
      })
  }

  GuardarCriterioAnualDeExito(peso)
  {
    this.servicio.PostCriteriosAnual(this.CrearCriterio(peso,4)).subscribe(res=>
      {
        console.log('criterio anual creado exitosamente');
      });
  }

  //EXTRAS
  CrearEscala(rangoMax:number,rangoMin:number,Aprob:number):EscalaModel
  {
    let e = new EscalaModel();
    e.id = UserCompanyService.userCompanyID;
    e.rango_aprob = Aprob;
    e.rango_min = rangoMin;
    e.rango_max = rangoMax;
    return e;
  }

  CrearCriterio(peso:number,id_criterio):CriterioModel
  {
    let c = new CriterioModel();
    c.peso = peso;
    c.id_criterio = id_criterio;
    c.id = UserCompanyService.userCompanyID;
    return c;
  }

}
