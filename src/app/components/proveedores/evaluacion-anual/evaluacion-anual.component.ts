import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import {ProducersService} from '../../../services/producers.service';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
=======
import {ProveedoresService} from '../../../services/proveedores.service';
import {ActivatedRoute} from '@angular/router';
>>>>>>> 228a3b17f7da2ae6ecc01bb44172ca8b2394e9f4

@Component({
  selector: 'app-evaluacion-anual',
  templateUrl: './evaluacion-anual.component.html',
  styleUrls: ['./evaluacion-anual.component.scss']
})
export class EvaluacionAnualComponent implements OnInit 
{

<<<<<<< HEAD
  nota:number;
  min_val:number;
  max_val:number;
  porcentajeAprob:number;
  total:number;
  

  calificacionFinal:number;

  constructor(private servicio:ProducersService) 
  {

  }

  ngOnInit(): void 
  {
    this.servicio.ObtenerEscalaAnualVigente(UserCompanyService.userCompanyID).subscribe(res=>
      {
        let data:any[]=res as any[];
        this.min_val = data[0].rango_inicial;
        this.max_val = data[0].rango_final;
        this.porcentajeAprob = data[0].rango_aprob;
        this.total = this.max_val-this.min_val;
      });
  }

  Calificar()
  {
    let aprob = (this.total*this.porcentajeAprob)/100;
    let puntaje = this.nota //el criterio siempre tiene un peso de 100% por tanto no hay que sacar cuentas
    if(puntaje>= aprob)
    {
      alert('Proveedor es apto para renovar contrato');
    }
    else
    {
      alert('Proveedor no es apto para renovar');
    }
=======
  id:number;
  nombre:string;

  constructor(private route:ActivatedRoute, private servicio:ProveedoresService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(paramas=>
      {
        this.id = +paramas.get('id');
      });    
    this.servicio.ObtenerNombre(this.id).subscribe(res=>
      {
        let data:any[] = res as any[];
        this.nombre = data[0].nombre_prov;
      });



>>>>>>> 228a3b17f7da2ae6ecc01bb44172ca8b2394e9f4
  }

}
