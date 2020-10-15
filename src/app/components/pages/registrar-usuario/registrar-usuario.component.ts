import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { UsuarioService } from '../../../_service/usuario.service'
import { Usuario } from './../../../_model/usuario';

import { TipoUsuario } from './../../../_model/tipoUsuario';
import { TipoUsuarioService } from './../../../_service/tipo-usuario.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  id: number;
  usuario : Usuario;
  form: FormGroup;
  edicion: boolean = false;
  
  tipoUsuario: TipoUsuario[];

  idTipoUsuarioSeleccionado: number;

  constructor(private usuarioService: UsuarioService, 
    private tipoUsuarioService:TipoUsuarioService, 
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit() {
   // listarTipoUsuario();
   this.listarTipoUsuario();

   
    this.form = new FormGroup({
   //   'id':  new FormControl(''),
      'username':  new FormControl(''),
      'password':  new FormControl(''),
      'userActivo':  new FormControl(''),
      'userEmail':  new FormControl(''),
      'tipoUsuario':  new FormControl('')
   });

  }

  listarTipoUsuario(){
    this.tipoUsuarioService.listar().subscribe(data => {
      this.tipoUsuario = data;
    });
  }

  submit(){
    console.warn(this.form.value);
    
    this.usuario = this.form.value;

    this.usuarioService.registrar(this.usuario).subscribe(data=>{
      this.usuarioService.listar().subscribe(usuario =>{
        this.usuarioService.usuariosCambio.next(usuario);
        this.usuarioService.mensajeCambio.next('Se ha registrado el usuario');
        
      });
    });
  }

}
