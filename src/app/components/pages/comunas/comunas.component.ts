import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { ComunaService } from './../../../_service/comuna.service';
import { Comuna } from './../../../_model/comuna';

@Component({
  selector: 'app-comunas',
  templateUrl: './comunas.component.html',
  styleUrls: ['./comunas.component.css']
})
export class ComunasComponent implements OnInit {

  //displayedColumns = ['idComuna', 'Region', 'Nombre'];
  displayedColumns = ['idComuna',  'Nombre'];
  dataSource : MatTableDataSource<Comuna>;

  constructor(private http:HttpClient, private comunaService: ComunaService) { }

  ngOnInit() {
    this.comunaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    }, 
    error => {
      console.log('problemas')
    });
  }

}
