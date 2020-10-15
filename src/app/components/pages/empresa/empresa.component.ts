import { Component, OnInit  } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Empresa } from './../../../_model/empresa';
import { EmpresaService } from './../../../_service/empresa.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})

export class EmpresaComponent implements OnInit {

  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns = ['idEmpresa', 'rut', 'dv','razonSocial', 'direccion', 'comuna', 'actividad','fechaRegistro','acciones'];
  dataSource: MatTableDataSource<Empresa>;

  

  constructor(private http:HttpClient,private empresaServive: EmpresaService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {
    
    this.empresaServive.empresaCambio.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
    });

    this.empresaServive.mensajeCambio.subscribe(data => {
      this.snackBar.open(data,'Aviso',{
        duration:3000,
      });
    });

    this.empresaServive.listar().subscribe(data=> {
      this.dataSource = new MatTableDataSource(data);
    },
    error => {
      console.log('problemas')
    });
  }

  eliminar(empresa: Empresa){
    console.warn(empresa);
   // alert (empresa);

    this.empresaServive.eliminar(empresa).pipe(switchMap(() =>{
      return this.empresaServive.listar();
    })).subscribe(data => {
      this.empresaServive.empresaCambio.next(data);
      this.empresaServive.mensajeCambio.next('Se elimino Empresa');
    });
  }

}
