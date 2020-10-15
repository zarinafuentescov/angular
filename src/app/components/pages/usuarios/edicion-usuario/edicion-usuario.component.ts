import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { UsuarioService } from '../../../../_service/usuario.service'
import { Usuario } from './../../../../_model/usuario';

import { TipoUsuario } from './../../../../_model/tipoUsuario';
import { TipoUsuarioService } from './../../../../_service/tipo-usuario.service';

@Component({
  selector: 'app-edicion-usuario',
  templateUrl: './edicion-usuario.component.html',
  styleUrls: ['./edicion-usuario.component.css']
})
export class EdicionUsuarioComponent implements OnInit {

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

    this.usuario = new Usuario();

    this.listarTipoUsuario();

    this.form = new FormGroup({
      'id':  new FormControl(''),
      'username':  new FormControl(''),
      'password':  new FormControl(''),
      'userActivo':  new FormControl(''),
      'userEmail':  new FormControl(''),
      'tipoUsuario':  new FormControl('')
      
    });

    this.route.params.subscribe((params: Params) =>{
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });

    
  }

  listarTipoUsuario(){
    this.tipoUsuarioService.listar().subscribe(data => {
      this.tipoUsuario = data;
    });
  }

  initForm(){
    if(this.edicion){
      this.usuarioService.listarPorId(this.id).subscribe(data=>{
        let id = data.idUsuario;
        let username = data.username;
        let password = data.password;
        let userActivo = data.userActivo;
        let userEmail = data.userEmail;
        let tipoUsuario = data.tipoUsuario;
    

      this.form = new FormGroup({
        'id' : new FormControl(id),
        'username' : new FormControl(username),
        'password' : new FormControl(password),
        'userActivo': new FormControl(userActivo),
        'userEmail': new FormControl(userEmail),
        'tipoUsuario': new FormControl(tipoUsuario)

      });
    });
  }
   
  }

  operar(){
    console.warn(this.form.value);
  //  alert('ingreso');
    this.usuario = this.form.value;

   // if (this.usuario != null && this.usuario.idUsuario > 0) {
      //alert('registro');
      /*this.usuarioService.modificar(this.usuario).pipe(switchMap(() => {
        return this.usuarioService.listar();
      })).subscribe(data => {
        this.usuarioService.usuariosCambio.next(data);
        this.usuarioService.mensajeCambio.next("Se ha modificado el usuario");
      });*/

      this.usuarioService.modificar(this.usuario).subscribe(data => {
        this.usuarioService.listar().subscribe(usuario =>{
          this.usuarioService.usuariosCambio.next(usuario);
          this.usuarioService.mensajeCambio.next('Se ha modificado el usuario');
        });
      });
    //}
    this.router.navigate(['usuarios']);
  }

  actualizar(){
    alert ("llamar");
  }

}
