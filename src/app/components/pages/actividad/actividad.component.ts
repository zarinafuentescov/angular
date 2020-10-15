import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { ActividadService }  from './../../../_service/actividad.service';
import { Actividad } from './../../../_model/actividad';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {
  
  displayedColumns = ['idActividad', 'codigoActividad' , 'glosaActividad'];
  dataSource : MatTableDataSource<Actividad>;

  constructor(private http:HttpClient, private actividadService:ActividadService ) { }

  ngOnInit() {
    this.actividadService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    }, 
    error => {
      console.log('problemas')
    });
  }

}
