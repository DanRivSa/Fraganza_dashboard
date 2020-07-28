import { Component, OnInit } from '@angular/core';
import { ProducersService } from '../../../services/producers.service';
import {ProveedoresService} from '../../../services/proveedores.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-alternativas-pago',
  templateUrl: './alternativas-pago.component.html',
  styleUrls: ['./alternativas-pago.component.scss']
})
export class AlternativasPagoComponent implements OnInit {

  //atributos
  id_prov:number;
  metodo_pago:any[];
  cuotas:any[];

  

  constructor(private route:ActivatedRoute,private servicio:ProveedoresService) { }

  ngOnInit(): void {

    //obtener id de proveedor
    this.route.paramMap.subscribe(params=>
      {
        this.id_prov = +params.get('id');
      });


      this.servicio.ObtenerInfoPagoCuotas(this.id_prov).subscribe(res=>
        {
          this.cuotas = res as any[];
          console.log(this.cuotas);

        });








  }

}
