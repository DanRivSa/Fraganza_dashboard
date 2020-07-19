import { Component, OnInit } from '@angular/core';
import {ProveedoresService} from '../../../services/proveedores.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-detalle-provedor',
  templateUrl: './detalle-provedor.component.html',
  styleUrls: ['./detalle-provedor.component.scss']
})
export class DetalleProvedorComponent implements OnInit {

  id:number;
  nombre:string;

  constructor(private route:ActivatedRoute, private servicio:ProveedoresService) 
  {

  }

  ngOnInit(): void
  {
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
