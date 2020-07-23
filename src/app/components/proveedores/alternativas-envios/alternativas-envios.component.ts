import { Component, OnInit } from '@angular/core';
import{ActivatedRoute} from '@angular/router';
import {ProveedoresService} from '../../../services/proveedores.service';
import { UserCompanyService } from 'src/app/services/global/user-company.service';

@Component({
  selector: 'app-alternativas-envios',
  templateUrl: './alternativas-envios.component.html',
  styleUrls: ['./alternativas-envios.component.scss']
})
export class AlternativasEnviosComponent implements OnInit {

  constructor(private servicio:ProveedoresService, private route:ActivatedRoute) { }
  id:number;
  nombre:string;
  alt_envio:any[];
  id_productor:number = UserCompanyService.userCompanyID; //id del productor

  ngOnInit(): void
  {
    this.route.paramMap.subscribe(params=>
      {
        this.id =+params.get('id');
      });

    this.servicio.ObtenerAlternativasDeEnvio(this.id).subscribe(res=>
      {
        this.alt_envio = res as any [];
        this.RedefinirVias();
      });

  }

  RedefinirVias()
  {
    for (let i = 0; i < this.alt_envio.length; i++)
    {
      if(this.alt_envio[i].tipo_envio == 'a')
        this.alt_envio[i].tipo_envio = 'Aerea';
      else if(this.alt_envio[i].tipo_envio == 'm')
        this.alt_envio[i].tipo_envio = 'Maritima';
      else if(this.alt_envio[i].tipo_envio == 't')
        this.alt_envio[i].tipo_envio = 'Terrestre';

    }
  }


}
