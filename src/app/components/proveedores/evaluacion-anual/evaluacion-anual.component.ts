import { Component, OnInit } from '@angular/core';
import {ProveedoresService} from '../../../services/proveedores.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-evaluacion-anual',
  templateUrl: './evaluacion-anual.component.html',
  styleUrls: ['./evaluacion-anual.component.scss']
})
export class EvaluacionAnualComponent implements OnInit {

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



  }

}
