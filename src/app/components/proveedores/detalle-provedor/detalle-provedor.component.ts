import { Component, OnInit } from '@angular/core';
import {ProveedoresService} from '../../../services/proveedores.service';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-detalle-provedor',
  templateUrl: './detalle-provedor.component.html',
  styleUrls: ['./detalle-provedor.component.scss']
})
export class DetalleProvedorComponent implements OnInit {


  constructor(private route:ActivatedRoute, private servicio:ProveedoresService) 
  {

  }

  ngOnInit(): void
  {
        
    
  }

}
