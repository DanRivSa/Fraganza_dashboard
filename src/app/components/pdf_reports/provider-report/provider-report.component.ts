import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ReportsService } from 'src/app/services/reports.service';
import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-provider-report',
  templateUrl: './provider-report.component.html',
  styleUrls: ['./provider-report.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ProviderReportComponent implements OnInit {

  id_proveedor:number;
  datos:any [];
  nombre_proveedor:string;
  email:string;
  telefono:number;
  codigo_postal:number;
  asociacion:string;
  direccion_fiscal:string;
  pais:string;

  constructor(private route:ActivatedRoute,private reportsService:ReportsService) { }

  ngOnInit(): void 
  {
    //obtener parametros de ruta
    this.route.paramMap.subscribe(params=>
      {
        //obtener id del proveedor
        this.id_proveedor = +params.get('id');
      });

    this.reportsService.getProviderReport(this.id_proveedor).subscribe(res=>
      {
        //transferir datos
        this.datos = res as any [];
        let obj = this.datos[0];
        this.nombre_proveedor = obj.nombre_prov;
        this.asociacion = obj.nombre_asoc;
        this.email = obj.email;
        this.telefono = obj.telefono;
        this.pais = obj.nombre_pais;
        this.codigo_postal = obj.cod_postal;
        this.direccion_fiscal = obj.direccion_fiscal;
      });
  }

  DescargarPDF()
  {
    //configurar ficha a descargar
    let options = 
    {
      filename: `proveedor_${this.nombre_proveedor}.pdf`,
      image: {type:'png'},
      html2canvas:{},
      jsPDF:{orientation:'landscape'}
    }

    //obtener ficha html a descargar
    let elemento = document.getElementById('ficha');

    //genera y descarga pdf
    html2pdf()
      .from(elemento)
      .set(options)
      .save()
  }

}
