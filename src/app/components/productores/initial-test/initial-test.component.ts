import { Component, OnInit } from '@angular/core';
import { ProducersService } from '../../../services/producers.service';
import {ActivatedRoute} from '@angular/router';
import {ProveedoresService} from '../../../services/proveedores.service';
import { UserCompanyService } from 'src/app/services/global/user-company.service';

@Component({
  selector: 'app-initial-test',
  templateUrl: './initial-test.component.html',
  styleUrls: ['./initial-test.component.scss']
})
export class InitialTestComponent implements OnInit {

  id:number;
  nombre:string;
  //datos bd
  porcentaje_aprob:number;
  valor_min:number;
  valor_Max:number;
  peso_c1:number;
  peso_c2:number;
  peso_c3:number;
  total:number;
  nota1:number;
  nota2:number;
  nota3:number
  CalificacionFinal:number;

  aprobado:boolean = false;

  constructor(private route:ActivatedRoute, private servicio:ProveedoresService,private servicioProductores:ProducersService) 
  {
    
  }

  ngOnInit(): void
  {
    this.aprobado = false;
    this.route.paramMap.subscribe(paramas=>
      {
        this.id = +paramas.get('id');
      });    
    this.servicio.ObtenerNombre(this.id).subscribe(res=>
      {
        let data:any[] = res as any[];
        this.nombre = data[0].nombre_prov;
      });
    this.servicioProductores.ObtenerEscalaInicialVigente(UserCompanyService.userCompanyID).subscribe(res=>
      {
        let data:any[] = res as any[];
        this.porcentaje_aprob = data[0].rango_aprob;
        this.valor_min = data[0].rango_inicial;
        this.valor_Max = data[0].rango_final;
        this.total = this.valor_Max-this.valor_min; //--> 100%
      });

    this.servicioProductores.ObtenerUbicacionGeoVigente(UserCompanyService.userCompanyID).subscribe(res=>
      {
        let data:any[] = res as any[];
        this.peso_c1 = data[0].peso;
      });
    this.servicioProductores.ObtenerPagoGeoVigente(UserCompanyService.userCompanyID).subscribe(res=>
      {
        let data:any[] = res as any[];
        this.peso_c2 = data[0].peso;
      });
    this.servicioProductores.ObtenerAltEnvioVigente(UserCompanyService.userCompanyID).subscribe(res=>
      {
        let data:any[] = res as any[];
        this.peso_c3 = data[0].peso;
      });
  }

}
