import { Component, OnInit } from '@angular/core';
import { MatTableDataSource , MatSnackBar} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { UsuarioService } from '../../../_service/usuario.service';
import { Usuario } from './../../../_model/usuario';

import { TipoUsuario } from './../../../_model/tipoUsuario';
import { TipoUsuarioService } from './../../../_service/tipo-usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  displayedColumns = ['idUsuario', 'username','userActivo' , 'userEmail', 'tipoUsuario', 'acciones'];
  dataSource : MatTableDataSource<Usuario>;

  tipoUsuario: TipoUsuario[];

  idTipoUsuarioSeleccionado: number;

  constructor(private http:HttpClient, private usuarioService: UsuarioService, private tipoUsuarioService:TipoUsuarioService, private snackBar: MatSnackBar, public route: ActivatedRoute) { }

  ngOnInit() {

    this.usuarioService.usuariosCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.usuarioService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data,'Aviso',{
        duration:3000,
      });
    });

    this.usuarioService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    },
    error => {
      console.log('problemas')
    });

    //this.listarTipoUsuario();
  }

  listarTipoUsuario(){
    this.tipoUsuarioService.listar().subscribe(data => {
      this.tipoUsuario = data;
    });
  }

  eliminar(usuario: Usuario){
    this.usuarioService.eliminar(usuario).pipe(switchMap(()=> {
      return this.usuarioService.listar();
    })).subscribe(data => {
      this.usuarioService.usuariosCambio.next(data);
      this.usuarioService.mensajeCambio.next('Usuario Eliminado');
    });
  }


}
