import { Component, OnInit } from '@angular/core';
import {ProveedoresService} from '../../../services/proveedores.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ProducersService } from '../../../services/producers.service';
import { UserCompanyService } from 'src/app/services/global/user-company.service';
import { ResultadoModel } from 'src/app/models/Resultado';

@Component({
  selector: 'app-detalle-provedor',
  templateUrl: './detalle-provedor.component.html',
  styleUrls: ['./detalle-provedor.component.scss']
})
export class DetalleProvedorComponent implements OnInit {

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
  holderDeEscala:any[]; //se usara para saber si hay una formula inicial, si no hay escala, no hay formula vigente

  constructor(private route:ActivatedRoute, private servicio:ProveedoresService,private servicioProductores:ProducersService) 
  {
    
  }

  ngOnInit(): void
  {
    this.aprobado = false;
    this.route.paramMap.subscribe(paramas=>
      {
        this.id = +paramas.get('id');//id proveedor
      });    
    this.servicio.ObtenerNombre(this.id).subscribe(res=>
      {
        let data:any[] = res as any[];
        this.nombre = data[0].nombre_prov;
      });
    this.servicioProductores.ObtenerEscalaInicialVigente(UserCompanyService.userCompanyID).subscribe(res=>
      {
        this.holderDeEscala = res as any[];
        this.porcentaje_aprob = this.holderDeEscala[0].rango_aprob;
        this.valor_min = this.holderDeEscala[0].rango_inicial;
        this.valor_Max = this.holderDeEscala[0].rango_final;
        this.total = this.valor_Max-this.valor_min; //--> 100%
        console.log('Total: ',this.total);
      });

    this.servicioProductores.ObtenerUbicacionGeoVigente(UserCompanyService.userCompanyID).subscribe(res=>
      {
        let data:any[] = res as any[];
        this.peso_c1 = data[0].peso;
        console.log(this.peso_c1);
      });
    this.servicioProductores.ObtenerPagoGeoVigente(UserCompanyService.userCompanyID).subscribe(res=>
      {
        let data:any[] = res as any[];
        this.peso_c2 = data[0].peso;
        console.log(this.peso_c2);
      });
    this.servicioProductores.ObtenerAltEnvioVigente(UserCompanyService.userCompanyID).subscribe(res=>
      {
        let data:any[] = res as any[];
        this.peso_c3 = data[0].peso;
        console.log(this.peso_c3);
      });
  }

  ValidarNotas(x,y,z):boolean
  {
    if(x>=0 && y>=y && z>=0)
      return true;
    else 
      return false;
  }

  Calificar()
  {
    if(this.ValidarNotas(this.nota1,this.nota2,this.nota3) == false)
      return;
      console.log('entra en eva');
    let puntaje1 = this.nota1*(this.peso_c1/100);
    let puntaje2 = this.nota2*(this.peso_c2/100);
    let puntaje3= this.nota3*(this.peso_c3/100);
    let aprob = (this.total*this.porcentaje_aprob)/100; //valor minimo para pasar
    this.CalificacionFinal=puntaje1+puntaje2+puntaje3; //suma total
    console.log(puntaje1,puntaje2,puntaje3,aprob);
    console.log('calificacion final: ',this.CalificacionFinal);
    if(this.CalificacionFinal>=aprob)
    {
      this.aprobado = true;
      //guardar calificacion en la bd
    }
    this.servicioProductores.GuardarResultado(UserCompanyService.userCompanyID,this.CrearResultado()).subscribe(res=>
      {
        console.log('resultado guardado');
      });
  }

  CrearResultado():ResultadoModel
  {
    let r= new ResultadoModel();
    r.id_prov = this.id;
    r.resultado = Math.round(this.CalificacionFinal);
    r.tipo_eval = 'i';
    return r;
  }

}
