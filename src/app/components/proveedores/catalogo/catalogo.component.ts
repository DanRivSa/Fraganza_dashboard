import { Component, OnInit } from '@angular/core';
import {ProveedoresService} from '../../../services/proveedores.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  //atributos
  id_prov:number;
  ingredientes:any[];
  esencias:any[];
  nombre_prov;

  constructor(private route:ActivatedRoute,private servicio:ProveedoresService) { }

  ngOnInit(): void
  {
    //obtener id de proveedor
    this.route.paramMap.subscribe(params=>
      {
        this.id_prov = +params.get('id');
      });

      //obtener esencias del proveedor
      this.servicio.ObtenerEsencias(this.id_prov).subscribe(res=>
        {
          this.esencias = res as any[];
          console.log(this.esencias);
          //obten el nombre del proveedor
          this.nombre_prov = this.esencias[0].nombre_prov;
        });

        //obtener ingredientes del proveedor
      this.servicio.ObtenerIngredietes(this.id_prov).subscribe(res=>
        {
          this.ingredientes = res as any[];
          console.log(this.ingredientes);
          this.nombre_prov = this.ingredientes[0].nombre_prov;
        });
  }

}
