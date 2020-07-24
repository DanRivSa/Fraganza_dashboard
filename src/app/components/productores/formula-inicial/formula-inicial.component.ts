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


  constructor(private servicio:ProducersService) { }

  ngOnInit(): void {}

  AgregarCriterios()
  {
    if(this.ValidarPesos(this.peso_c1,this.peso_c2,this.peso_c3) && this.ValidarEscala(this.escala_v_min,this.escala_v_max,this.escala_rango_porcentual))
    {
      console.log('successful');
      console.log(`pesos: ${this.peso_c1},${this.peso_c2},${this.peso_c3}`);
      
    }
    else  
      alert('ERROR procure que la suma de los pesos de los criterios sea 100% y llenar los campos solicitados con valores coherentes');
  }

  AgregarCriterioExito()
  {
    if(this.ValidarEscala(this.escala_a_min,this.escala_a_max,this.escala_a_rango))
    {
      console.log('creado exitosamente');
    }
    else
      alert('ERROR procure llenar la informacion solicitada con valores coherentes');
  }

  ValidarPesos(x:number,y:number,z:number):boolean
  {
    let sum = x+y+z;
    if(sum == 100)
      return true;
    else 
      return false;
  }

  ValidarEscala(rango_min:number,rango_max:number,porcentaje_aprobacion:number):boolean
  {
    if((rango_min != 0 && rango_max!= 0 && porcentaje_aprobacion!= 0) && (rango_max>rango_min))
      return true;
    else
      return false;
  }

  CerrarEscalaYCriterios()
  {
    let 
    this.servicio.PutCerrarEscalaInicial(UserCompanyService.userCompanyID,)
  }

  CrearEscala():EscalaModel
  {
    let e = new EscalaModel();
    return e;
  }

  CrearCriterio():CriterioModel
  {
    let c = new CriterioModel();
    return c;
  }

}
