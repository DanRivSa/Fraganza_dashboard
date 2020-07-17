import { Component, OnInit } from '@angular/core';
import { ProducersService } from '../../../services/producers.service';

@Component({
  selector: 'app-initial-test',
  templateUrl: './initial-test.component.html',
  styleUrls: ['./initial-test.component.scss']
})
export class InitialTestComponent implements OnInit {

  proveedores:any[];

  constructor(private producersService:ProducersService) { }

  ngOnInit(): void
  {
    this.producersService.getProveedoresEvIni().subscribe(res=>
      {
        this.proveedores = res as any[];
      });
  }

}
