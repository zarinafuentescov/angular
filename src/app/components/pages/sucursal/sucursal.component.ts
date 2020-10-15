import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { SucursalService } from './../../../_service/sucursal.service';
import { Sucursal } from './../../../_model/sucursal';
import { Region } from './../../../_model/region';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {

  displayedColumns = ['idSucursal', 'glosaSucursal', 'region'];
  dataSource : MatTableDataSource<Sucursal>;

  constructor(private http:HttpClient, private sucursalService: SucursalService) { }

  ngOnInit() {

    this.sucursalService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    },
    error => {
      console.log('problemas')
    });
    

  }

}
