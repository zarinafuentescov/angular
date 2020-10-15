import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';

import { RegionService } from 'src/app/_service/region.service';
import { Region } from 'src/app/_model/region';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  displayedColumns = ['idRegion', 'nombre'];
  dataSource : MatTableDataSource<Region>;
  regiones = null;
  listado = null;

  constructor(private http:HttpClient, private regionService: RegionService) { }

  ngOnInit() {
    this.regionService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    }, 
    error => {
      console.log('problemas')
    });
    
 /*   this.http.get('http://scratchya.com.ar/vue/datos.php')
      .subscribe(result => {this.listado = result},
        error => {
          console.log('problemas');
        }
        );
    
   this.regionService.listar2().subscribe(data=>{
    this.regiones = data},
    error => {
      console.log('problemas');
    }
    );*/
  }

}
